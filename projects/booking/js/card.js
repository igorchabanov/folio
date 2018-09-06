'use strict';

(function () {

  var TYPE_LABELS = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var UNKNOWN_TYPE_LABEL = 'Неизвестный тип жилья';

  var template = document.querySelector('template');
  var shownCard;

  var cardClickHandler = function (evt) {
    var target = evt.target;
    if (target.classList.contains('popup__close')) {
      var popup = document.querySelector('.popup');
      popup.classList.add('hidden');
    }
  };

  var keyDownCardHandler = function (evt) {
    var openedCard = window.card.map.querySelector('.map__card');
    if (evt.keyCode === window.util.KEY_CODES.ESC) {
      openedCard.classList.add('hidden');
    }
    document.removeEventListener('keydown', keyDownCardHandler);
  };

  var getTypeName = function (type) {
    return TYPE_LABELS[type] || UNKNOWN_TYPE_LABEL;
  };

  var getFeatures = function (features) {
    var fragment = document.createDocumentFragment();

    features.forEach(function (feature) {
      var element = document.createElement('li');
      element.className = 'popup__feature popup__feature--' + feature;
      fragment.appendChild(element);
    });

    return fragment;
  };

  var showImages = function (photos) {
    var fragment = document.createDocumentFragment();
    var pictureTemplate = template.content
        .querySelector('.popup__photo');

    photos.forEach(function (photo) {
      var picture = pictureTemplate.cloneNode();
      picture.src = photo;
      fragment.appendChild(picture);
    });
    return fragment;
  };

  window.card = {
    map: document.querySelector('.map'),
    createElement: function (elem) {
      var mapCard = template.content
          .querySelector('.map__card');
      var card = mapCard.cloneNode(true);

      card.querySelector('img').src = elem.author.avatar;
      card.querySelector('.popup__title').textContent = elem.offer.title;
      card.querySelector('.popup__text--address').textContent = elem.offer.address;
      card.querySelector('.popup__text--price').textContent = elem.offer.price + '\u20bd/ночь';
      card.querySelector('.popup__type').textContent = getTypeName(elem.offer.type);
      card.querySelector('.popup__text--capacity').textContent = elem.offer.rooms + ' комнаты для ' + elem.offer.guests + ' гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + elem.offer.checkin + ', выезд до ' + elem.offer.checkout;
      card.querySelector('.popup__features').textContent = '';
      card.querySelector('.popup__features').appendChild(getFeatures(elem.offer.features));
      card.querySelector('.popup__description').textContent = elem.offer.description;
      card.querySelector('.popup__photos').textContent = '';
      card.querySelector('.popup__photos').appendChild(showImages(elem.offer.photos));

      card.addEventListener('click', cardClickHandler);

      return card;
    },
    writeCardOnMap: function (cardElement) {
      var container = document.querySelector('.map__filters-container');

      var newCard = this.createElement(cardElement);
      if (shownCard) {
        this.map.replaceChild(newCard, shownCard);
      } else {
        this.map.insertBefore(newCard, container);
      }
      shownCard = newCard;

      document.addEventListener('keydown', keyDownCardHandler);
    },
    hideCard: function () {
      var openedCard = window.card.map.querySelector('.map__card');
      if (openedCard) {
        openedCard.classList.add('hidden');
      }
    }
  };
})();
