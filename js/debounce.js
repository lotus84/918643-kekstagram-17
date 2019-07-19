'use strict';

// Модуль, который "устраняет дребезг" при частом вызове переданной функции
(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  window.debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };
})();
