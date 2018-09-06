'use strict';

(function () {
  var MAP_BOUNDS = {
    MIN: {
      X: 0,
      Y: 150
    },
    MAX: {
      X: 1140,
      Y: 500
    }
  };

  var enclose = function (number, min, max) {
    return Math.max(min, Math.min(number, max));
  };

  window.form.addDisable();
  window.filter.disableCompareFilter();
  window.pins.getMainPinCoords();

  var formSubmitHandler = function () {
    deactivatePage();
    window.pins.mainMapPin.addEventListener('mouseup', mainPinMouseUpHandler);
    window.pins.mainMapPin.addEventListener('keydown', keyDownEnterHandler);
  };

  var mainPinMouseUpHandler = function (evt) {
    activatePage(evt);
    window.pins.mainMapPin.removeEventListener('mouseup', mainPinMouseUpHandler);
    window.pins.mainMapPin.removeEventListener('keydown', keyDownEnterHandler);

    window.form.advertForm.addEventListener('submit', formSubmitHandler);
  };

  var keyDownEnterHandler = function (evt) {
    if (evt.keyCode === window.util.KEY_CODES.ENTER) {
      activatePage(evt);
      window.pins.getMainPinCoords();
      window.pins.mainMapPin.removeEventListener('keydown', keyDownEnterHandler);
    }
  };

  window.pins.mainMapPin.addEventListener('keydown', keyDownEnterHandler);
  window.pins.mainMapPin.addEventListener('mouseup', mainPinMouseUpHandler);

  var loadHandler = function (loadedAdverts) {
    window.map.adverts = loadedAdverts;
    window.map.updateMap(loadedAdverts.slice(0, window.util.MAX_ADVERTS_COUNT));
  };

  var updateMap = function (array) {
    var fragment = document.createDocumentFragment();

    array.forEach(function (item) {
      fragment.appendChild(window.pins.renderPins(item));
    });

    window.pins.mainMapPin.removeEventListener('mouseup', window.pins.writePinMap);
    return window.pins.pinsList.appendChild(fragment);
  };

  var activatePage = function () {
    window.card.map.classList.remove('map--faded');
    window.form.advertForm.classList.remove('ad-form--disabled');
    window.form.addressInput.readOnly = true;
    window.backend.load(loadHandler, window.error.errorHandler);
    window.form.removeDisable();
    window.filter.activateCompareFilter();
  };

  var deactivatePage = function () {
    window.card.map.classList.add('map--faded');
    window.form.advertForm.classList.add('ad-form--disabled');
    window.form.addDisable();
    window.filter.disableCompareFilter();
    window.pins.deletePins();
    window.card.hideCard();
  };

  window.pins.mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var buttonMouseMoveHandler = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var differenceY = window.pins.mainMapPin.offsetTop - shift.y;
      var differenceX = window.pins.mainMapPin.offsetLeft - shift.x;

      window.pins.mainMapPin.style.top = enclose(differenceY, MAP_BOUNDS.MIN.Y, MAP_BOUNDS.MAX.Y) + 'px';
      window.pins.mainMapPin.style.left = enclose(differenceX, MAP_BOUNDS.MIN.X, MAP_BOUNDS.MAX.X) + 'px';
      window.pins.getMainPinCoords();
    };

    var buttonMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      window.card.map.removeEventListener('mousemove', buttonMouseMoveHandler);
      document.removeEventListener('mouseup', buttonMouseUpHandler);
    };

    window.card.map.addEventListener('mousemove', buttonMouseMoveHandler);
    document.addEventListener('mouseup', buttonMouseUpHandler);

    window.map = {
      formSubmitHandler: formSubmitHandler,
      updateMap: updateMap
    };
  });

})();
