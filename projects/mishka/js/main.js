// Меню
var headerNoJs = document.querySelector('.main-header--nojs');
var headerContainer = document.querySelector('.main-header__container');
var navToggle = document.querySelector('.main-header__toggle');

headerNoJs.classList.remove('main-header--nojs');

navToggle.addEventListener('click', function () {

  if (headerContainer.classList.contains('main-header__container--closed')) {

    headerContainer.classList.remove('main-header__container--closed');
    headerContainer.classList.add('main-header__container--opened');

  } else {

    headerContainer.classList.remove('main-header__container--opened');
    headerContainer.classList.add('main-header__container--closed');

  }

});

// Модальное окно
var orderBtn = document.querySelectorAll('.btn--order');
var modal = document.querySelector('.modal');

for (var i = 0; i < orderBtn.length; i++) {
  orderBtn[i].addEventListener('click', function (event) {
    event.preventDefault();

    modal.classList.add('modal--opened');

  });
}

window.addEventListener('keydown', function (event) {
  if (event.keyCode === 27) {
    if (modal.classList.contains('modal--opened')) {
      modal.classList.remove('modal--opened');
    }
  }
});

// Карта
var yandexMap = document.querySelector(".yandex-map");

if(yandexMap !== null) {
  ymaps.ready(function () {
    var myMap = new ymaps.Map('yandex-map', {
      center: [59.938631, 30.323055],
      zoom: 17
    }, {
      searchControlProvider: 'yandex#search'
    }),

    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      hintContent: 'Собственный значок метки',
      balloonContent: 'Это красивая метка'
    }, {
        iconLayout: 'default#image',
        iconImageHref: './img/icon-map-pin.svg',
        iconImageSize: [66, 100],
        iconImageOffset: [-35, -100]
      });

    myMap.geoObjects
      .add(myPlacemark);
  });
}
// Вспомогательная окно для навигации
var pageNavigationBtn = document.querySelector('.page-navigation__close');
var pagePopup = document.querySelector('.page-navigation');
pageNavigationBtn.addEventListener('click', function () {
  pagePopup.classList.add('close-js');
});
