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
    },
    // Функция проверяет массив на уникальность элементов.
    // Если все элементы массива уникальны (неповторяются), то функция вернет true,
    // в противном случае вернет false
    checkUniqueArray: function (array) {
      var n = array.length;
      for (var i = 0; i < n - 1; i++) {
        for (var j = i + 1; j < n; j++) {
          if (array[i] === array[j]) {
            return false;
          }
        }
      }
      return true;
    }
  };
})();
