'use strict';

// Модуль, который работает с сервером
(function () {
  var URL_DATA = 'https://js.dump.academy/kekstagram/data';
  var URL_FORM = 'https://js.dump.academy/kekstagram';
  var TIMEOUT_VALUE = 10000;
  var SUCCESS_CODE = 200;

  window.backend = {
    // Функция отправляет запрос на сервер для загрузки данных
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_CODE) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения ' + xhr.status);
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_VALUE;

      xhr.open('GET', URL_DATA);
      xhr.send();
    },

    // Функция отправляет данные формы на сервер
    upload: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_CODE) {
          onSuccess(xhr.response);
        } else {
          onError();
        }
      });

      xhr.addEventListener('error', function () {
        onError();
      });

      xhr.open('POST', URL_FORM);
      xhr.send(data);
    }
  };
})();
