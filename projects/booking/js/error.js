'use strict';

(function () {
  window.error = {
    errorHandler: function (message) {
      var errorMessage = document.createElement('div');
      errorMessage.style.zIndex = '5';
      errorMessage.style.margin = '0 auto';
      errorMessage.style.padding = '15px 0';
      errorMessage.style.fontSize = '25px';
      errorMessage.style.color = 'red';
      errorMessage.style.textAlign = 'center';
      errorMessage.style.width = '100%';
      errorMessage.style.position = 'absolute';
      errorMessage.style.top = 0;
      errorMessage.style.left = 0;
      errorMessage.style.backgroundColor = '#ccc';
      errorMessage.textContent = message;
      document.body.insertAdjacentElement('afterbegin', errorMessage);
    }
  };
})();
