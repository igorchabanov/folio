'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var INITIAL_VALUE = 'any';
  var PRICE_RANGE = {
    min: 10000,
    max: 50000
  };
  var PRICE_FILTERS = {
    any: function () {
      return true;
    },
    low: function (price) {
      return price < PRICE_RANGE.min;
    },
    middle: function (price) {
      return price >= PRICE_RANGE.min && price <= PRICE_RANGE.max;
    },
    high: function (price) {
      return price > PRICE_RANGE.max;
    }
  };
  var mapFilters = document.querySelector('.map__filters');
  var fields = mapFilters.querySelectorAll('select');
  var features = mapFilters.querySelector('.map__features');

  var disableCompareFilter = function () {
    fields.forEach(function (field) {
      field.disabled = true;
    });
    features.disabled = true;
  };

  var activateCompareFilter = function () {
    fields.forEach(function (field) {
      field.disabled = false;
    });
    features.disabled = false;
  };

  var filterByEstate = function (item) {
    var houseType = mapFilters.elements['housing-type'].value;
    return houseType === INITIAL_VALUE ? true : item.offer.type === houseType;
  };

  var filterByPrice = function (item) {
    var housePrice = mapFilters.elements['housing-price'].value;
    var actualFilter = PRICE_FILTERS[housePrice];
    return actualFilter(item.offer.price);
  };

  var filterByRooms = function (item) {
    var houseRooms = mapFilters.elements['housing-rooms'].value;
    return houseRooms === INITIAL_VALUE ? true : item.offer.rooms === parseInt(houseRooms, 10);
  };

  var filterByGuests = function (item) {
    var houseGuests = mapFilters.elements['housing-guests'].value;
    return houseGuests === INITIAL_VALUE ? true : item.offer.guests === parseInt(houseGuests, 10);
  };

  var filterByCheckboxes = function (item) {
    var selectedCheckboxes = mapFilters.querySelectorAll('input[name=features]:checked');
    var selectedFeatures = [].map.call(selectedCheckboxes, function (checkbox) {
      return checkbox.value;
    });

    return selectedFeatures.every(function (feature) {
      return window.util.contains(feature, item.offer.features);
    });

  };

  var filters = [
    filterByEstate,
    filterByPrice,
    filterByRooms,
    filterByGuests,
    filterByCheckboxes
  ];

  var filterAdverts = function () {
    var compareAdverts = function (advert) {
      return filters.every(function (filter) {
        return filter(advert);
      });
    };
    var newAdverts = window.map.adverts.filter(function (item) {
      return compareAdverts(item);
    });

    var adverts = newAdverts.slice(0, window.util.MAX_ADVERTS_COUNT);

    window.util.debounce(window.map.updateMap(adverts), DEBOUNCE_INTERVAL);
  };

  mapFilters.addEventListener('change', function () {
    window.pins.deletePins();
    window.card.hideCard();
    filterAdverts();
  });

  window.filter = {
    activateCompareFilter: activateCompareFilter,
    disableCompareFilter: disableCompareFilter
  };
})();
