'use strict';

(function () {
  var START_POSITION = {
    top: '375px',
    left: '570px'
  };
  var pinsTemplate = document.querySelector('template')
      .content
      .querySelector('.map__pin');
  var pinsList = document.querySelector('.map__pins');

  var deletePins = function () {
    var buttons = pinsList.querySelectorAll('.map__pin');
    buttons.forEach(function (button) {
      if (!button.classList.contains('map__pin--main')) {
        pinsList.removeChild(button);
      }
    });
  };

  var resetPositions = function () {
    window.pins.mainMapPin.style.top = START_POSITION.top;
    window.pins.mainMapPin.style.left = START_POSITION.left;
  };

  window.pins = {
    mainMapPin: document.querySelector('.map__pin--main'),
    pinsList: pinsList,
    getMainPinCoords: function () {
      var x = Math.floor(this.mainMapPin.offsetLeft + (this.mainMapPin.offsetWidth / 2));
      var y = Math.floor(this.mainMapPin.offsetTop + this.mainMapPin.offsetHeight);
      window.form.addressInput.value = x + ', ' + y;
    },
    renderPins: function (item) {
      var pin = pinsTemplate.cloneNode(true);

      pin.style.left = item.location.x + 'px';
      pin.style.top = item.location.y + 'px';
      pin.querySelector('img').src = item.author.avatar;
      pin.querySelector('img').alt = item.offer.title;

      pin.addEventListener('click', function () {
        window.card.writeCardOnMap(item);
      });

      return pin;
    },
    deletePins: deletePins,
    resetPositions: resetPositions
  };
})();
