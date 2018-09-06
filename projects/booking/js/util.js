'use strict';

window.util = (function () {
  return {
    KEY_CODES: {
      ESC: 27,
      ENTER: 13
    },
    MAX_ADVERTS_COUNT: 5,
    contains: function (value, array) {
      return array.indexOf(value) !== -1;
    },
    debounce: function (fun, interval) {
      var lastTimeout = null;
      return function () {
        var args = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          fun.apply(null, args);
        }, interval);
      };
    }
  };
})();
