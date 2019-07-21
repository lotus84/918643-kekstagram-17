'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomItemFromArray: function (arr) {
      return arr[window.utils.getRandomNumber(0, arr.length - 1)];
    }
  };
})();
