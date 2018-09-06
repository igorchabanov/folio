// Вспомогательная окно для навигации
var pageNavigationBtn = document.querySelector('.page-navigation__close');
var pagePopup = document.querySelector('.page-navigation');
pageNavigationBtn.addEventListener('click', function () {
  pagePopup.classList.add('close-js');
});
