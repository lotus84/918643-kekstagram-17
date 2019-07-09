'use strict';

(function () {
  window.utils = {
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomItemFromArray: function (arr) {
      return arr[window.utils.getRandomNumber(0, arr.length - 1)];
    }
  };
})();
