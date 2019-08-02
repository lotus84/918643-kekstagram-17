'use strict';

// Модуль отвечает за проверку хэш-тегов на валидность
(function () {

  var MAX_COUNT = 5;
  var MAX_LENGTH_HASHTAG = 20;
  var MIN_LENGTH_HASHTAG = 2;
  var RED_BORDER = '2px solid red';
  var NONE_BORDER = 'none';
  var inputHashtag = document.querySelector('.text__hashtags');

  // Добавляем обработчик события input для поля ввода хэштегов
  inputHashtag.addEventListener('input', function () {
    window.validity.check();
  });

  var addValidityMessage = function (input) {
    input.style.border = RED_BORDER;
    window.validity.isStopSubmit = true;
  };

  var removeValidityMessage = function (input) {
    input.setCustomValidity('');
    input.style.border = NONE_BORDER;
    window.validity.isStopSubmit = false;
  };

  window.validity = {
    isStopSubmit: false,
    reset: function () {
      removeValidityMessage(inputHashtag);
    },
    check: function () {
      // Проверяем, что поле input не пустое
      if (inputHashtag.value.trim() !== '') {

        var hashtags = inputHashtag.value.split(' ');

        // Приводим все элементы к нижниму регистру, т.о. теги нечувствительны к регистру
        var copyHashtags = [];

        hashtags.forEach(function (elem) {
          copyHashtags.push(elem.toLowerCase());
        });

        // Проверяем хэш-теги на соответствие заданным условиям
        for (var i = 0; i < copyHashtags.length; i++) {
          var hashtag = copyHashtags[i];

          if (hashtag[0] !== '#') {
            inputHashtag.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
            addValidityMessage(inputHashtag);
          } else if (hashtag.indexOf('#', 2) !== -1) {
            inputHashtag.setCustomValidity('Хэш-теги должны разделяться пробелами');
            addValidityMessage(inputHashtag);
          } else if (hashtags.length > MAX_COUNT) {
            inputHashtag.setCustomValidity('Нельзя указывать больше пяти хэш-тегов');
            addValidityMessage(inputHashtag);
          } else if (hashtag.length < MIN_LENGTH_HASHTAG) {
            inputHashtag.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
            addValidityMessage(inputHashtag);
          } else if (hashtag.length > MAX_LENGTH_HASHTAG) {
            inputHashtag.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
            addValidityMessage(inputHashtag);
          } else if (!window.utils.checkUniqueArray(copyHashtags)) {
            inputHashtag.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды (теги нечувствительны к регистру)');
            addValidityMessage(inputHashtag);
          } else {
            removeValidityMessage(inputHashtag);
          }
        }
      } else {
        removeValidityMessage(inputHashtag);
      }
    }
  };
})();
