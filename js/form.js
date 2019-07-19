'use strict';

(function () {
  var ESC_KEYCODE = 27;

  // Открытие и закрытие формы загрузки и редактирования изображения
  var form = document.querySelector('.img-upload__form');
  var formPopupOpen = form.querySelector('#upload-file');
  var formPopup = form.querySelector('.img-upload__overlay');
  var formPopupClose = form.querySelector('#upload-cancel');
  var commentTextarea = formPopup.querySelector('.text__description');
  var hashtagInput = formPopup.querySelector('.text__hashtags');
  var imagePreview = document.querySelector('.img-upload__preview img');
  var effectLevel = document.querySelector('.img-upload__effect-level');

  // Функция закрывает форму при нажатии на Esc
  var onFormPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (commentTextarea !== document.activeElement && hashtagInput !== document.activeElement) {
        closeFormPopup();
      }
    }
  };

  // Функция открывает форму загрузки и редактирования изображения
  var openFormPopup = function () {
    formPopup.classList.remove('hidden');
    effectLevel.classList.add('hidden');
    document.addEventListener('keydown', onFormPopupEscPress);
  };

  // Функция закрывает форму загрузки и редактирования изображения
  var closeFormPopup = function () {
    formPopup.classList.add('hidden');
    imagePreview.setAttribute('style', 'filter: initial');
    document.removeEventListener('keydown', onFormPopupEscPress);
    form.reset();
  };

  formPopupOpen.addEventListener('change', function () {
    openFormPopup();
  });

  formPopupClose.addEventListener('click', function () {
    closeFormPopup();
  });

  // Отправка данных формы на сервер
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), onSuccessMessage, onErrorMessage);
    closeFormPopup();
  });

  // Создание сообщения об успешной/неуспешной загрузке изображения
  var createMessage = function (name) {
    var similarMessageTemplate = document.querySelector('#' + name)
    .content
    .querySelector('.' + name);
    var message = similarMessageTemplate.cloneNode(true);
    var button = message.querySelector('.' + name + '__button');

    return {
      message: message,
      button: button
    };
  };

  var renderMessage = function (element) {
    var mainElement = document.querySelector('main');
    mainElement.appendChild(element);
  };

  // Функция callback показывает сообщение об успешной отправке данных формы на сервер
  var onSuccessMessage = function () {
    var successMessage = createMessage('success').message;
    renderMessage(successMessage);
    var successButton = createMessage('success').button;

    var onSuccessButtonClick = function () {
      successMessage.parentNode.removeChild(successMessage);
      successButton.removeEventListener('click', onSuccessButtonClick);
      document.removeEventListener('keydown', onSuccessMessageEscPress);
      document.removeEventListener('click', onSuccessButtonClick);
    };
    var onSuccessMessageEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        onSuccessButtonClick();
      }
    };

    successButton.addEventListener('click', onSuccessButtonClick);
    document.addEventListener('keydown', onSuccessMessageEscPress);
    document.addEventListener('click', onSuccessButtonClick);
  };

  // Функция callback показывает сообщение о неуспешной отправке данных формы на сервер
  var onErrorMessage = function () {
    var errorMessage = createMessage('error').message;
    renderMessage(errorMessage);
    var errorButton = createMessage('error').button;

    var onErrorButtonClick = function () {
      errorMessage.parentNode.removeChild(errorMessage);
      errorButton.removeEventListener('click', onErrorButtonClick);
      document.removeEventListener('keydown', onErrorMessageEscPress);
      document.removeEventListener('click', onErrorButtonClick);
    };
    var onErrorMessageEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        onErrorButtonClick();
      }
    };

    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onErrorMessageEscPress);
    document.addEventListener('click', onErrorButtonClick);
  };
})();
