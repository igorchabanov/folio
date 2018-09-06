'use strict';

(function () {
  var FORM_TITLE_LENGTH = {
    min: 30,
    max: 100
  };
  var MAX_PRICE_ADVERTS = 1000000;
  var MIN_PRICES_ADVERTS = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };
  var POPUP_TIMEOUT = 1200;

  var advertForm = document.querySelector('.ad-form');
  var submitBtn = document.querySelector('.ad-form__submit');
  var resetBtn = document.querySelector('.ad-form__reset');
  var successPopup = document.querySelector('.success');
  var fieldsetList = advertForm.querySelectorAll('fieldset');
  var priceAdvert = advertForm.elements.price;
  var titleAdvert = advertForm.elements.title;
  var addressInput = advertForm.elements.address;
  var typeAdvert = advertForm.elements.type;
  var timeIn = advertForm.elements.timein;
  var timeOut = advertForm.elements.timeout;
  var roomsList = advertForm.elements.rooms;
  var guestsList = advertForm.elements.capacity;
  var options = [
    [2],
    [1, 2],
    [0, 1, 2],
    [3]
  ];

  var inputClickHandler = function () {
    if (titleAdvert.value.length < FORM_TITLE_LENGTH.min) {
      titleAdvert.setCustomValidity('Значение меньше 30');
    } else if (titleAdvert.value.length > FORM_TITLE_LENGTH.max) {
      titleAdvert.setCustomValidity('Значение должно быть меньше 100');
    } else {
      titleAdvert.setCustomValidity('');
    }
  };

  var inputChangePriceHandler = function (minPrice) {
    if (priceAdvert.value < minPrice) {
      priceAdvert.setCustomValidity('Минимальнная сумма ' + minPrice);
    } else if (priceAdvert.value > MAX_PRICE_ADVERTS) {
      priceAdvert.setCustomValidity('Сумма не может быть больше ' + MAX_PRICE_ADVERTS);
    } else {
      priceAdvert.setCustomValidity('');
    }
  };

  var selectChangeHandler = function () {
    var selectedType = typeAdvert.options[typeAdvert.selectedIndex].value;
    var minPrice = MIN_PRICES_ADVERTS[selectedType] || 0;
    priceAdvert.placeholder = minPrice;
    priceAdvert.min = minPrice;

    inputChangePriceHandler(minPrice);
  };
  selectChangeHandler();
  typeAdvert.addEventListener('change', selectChangeHandler);
  priceAdvert.addEventListener('change', selectChangeHandler);

  var selectTimeInHandler = function () {
    timeOut.value = timeIn.value;
  };
  var selectTimeOutHandler = function () {
    timeIn.value = timeOut.value;
  };
  timeIn.addEventListener('change', selectTimeInHandler);
  timeOut.addEventListener('change', selectTimeOutHandler);

  var selectChangeRoomsHandler = function () {
    var allowedOptions = options[roomsList.selectedIndex];
    var defaultOption = allowedOptions[0];
    guestsList[defaultOption].selected = true;

    [].forEach.call(guestsList.options, function (option, index) {
      option.disabled = !window.util.contains(index, allowedOptions);
    });
  };
  selectChangeRoomsHandler();

  roomsList.addEventListener('change', function () {
    selectChangeRoomsHandler();
  });
  guestsList.addEventListener('change', function () {
    selectChangeRoomsHandler();
  });

  submitBtn.addEventListener('click', inputClickHandler);

  var successHandler = function () {
    if (successPopup.classList.contains('hidden')) {
      successPopup.classList.remove('hidden');
      setTimeout(function () {
        successPopup.classList.add('hidden');
      }, POPUP_TIMEOUT);
    }
  };

  var resetPage = function () {
    advertForm.reset();
    selectChangeRoomsHandler();
    selectChangeHandler();
    window.pins.resetPositions();
    window.pins.getMainPinCoords();
    window.image.clearInputImages();
  };

  advertForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.upload(new FormData(advertForm), function (response) {
      if (response) {
        resetPage();
        successHandler();
      }
    }, window.error.errorHandler);
  });

  resetBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetPage();
    window.map.formSubmitHandler();
  });

  window.form = {
    advertForm: advertForm,
    submitBtn: submitBtn,
    addressInput: addressInput,
    removeDisable: function () {
      fieldsetList.forEach(function (fieldset) {
        fieldset.disabled = false;
      });
    },
    addDisable: function () {
      fieldsetList.forEach(function (fieldset) {
        fieldset.disabled = true;
      });
    }
  };
})();
