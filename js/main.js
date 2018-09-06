'use strict';

(function () {
  var mainBtn = document.querySelector('.intro__btn--js');
  var anchor = document.querySelector('.portfolio');
  var animationTime = 300;

  var onBtnClick = function () {
    var coordY = anchor.getBoundingClientRect().top;

    var scroller = setInterval(function () {
      window.scrollBy({
        top: coordY,
        behavior: 'smooth'
      });
      clearInterval(scroller);
    }, animationTime);
  };
  mainBtn.addEventListener('click', onBtnClick);

  // Форма обратной связи
  var orderForm = document.querySelector('.order');
  var mailUrl = '../mail.php';
  var HTTP_STATUS = {
    OK: 200
  };
  var RESET_INTERVAL = 500;
  var MESSAGES_TEXT = {
    error_title: 'Произошла ошибка',
    success_title: 'Благодарю за заявку',
    success_message: 'Я свяжусь в Вами через 15 минут'
  };

  orderForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    uploadFormData(new FormData(orderForm), modalHandler);
  });

  var uploadFormData = function (data, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === HTTP_STATUS.OK) {
        setTimeout(function () {
          orderForm.reset();
          modalHandler(MESSAGES_TEXT.success_title, MESSAGES_TEXT.success_message);
        }, RESET_INTERVAL);
      } else {
        onError(MESSAGES_TEXT.error_title, 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText );
      }
    });

    xhr.addEventListener('error', function () {
      onError(MESSAGES_TEXT.error_title, 'Что-то пошло не так');
    });

    xhr.open('POST', mailUrl);
    xhr.send(data);
  };

  var modalHandler = function (title, message) {
    var errorMessage = document.createElement('section');
    var modalTitle = document.createElement('h2');
    var text = document.createElement('p');

    errorMessage.classList.add('modal');
    modalTitle.textContent = title;
    text.textContent = message;
    errorMessage.appendChild(modalTitle);
    errorMessage.appendChild(text);

    document.body.insertAdjacentElement('beforeend', errorMessage);

    setTimeout(function () {
      document.body.removeChild(errorMessage);
      orderForm.reset();
    }, 1500);
  };
})();
