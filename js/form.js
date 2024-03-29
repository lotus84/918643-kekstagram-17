'use strict';

(function () {
  // Открытие и закрытие формы загрузки и редактирования изображения
  var form = document.querySelector('.img-upload__form');
  var fileChooser = form.querySelector('#upload-file');
  var formPopup = form.querySelector('.img-upload__overlay');
  var formPopupClose = form.querySelector('#upload-cancel');
  var commentTextarea = formPopup.querySelector('.text__description');
  var hashtagInput = formPopup.querySelector('.text__hashtags');
  var imagePreview = document.querySelector('.img-upload__preview img');
  var zoomButton = document.querySelector('.scale__control--bigger');
  var unzoomButton = document.querySelector('.scale__control--smaller');
  var imagePreviewEffects = Array.from(formPopup.querySelectorAll('.effects__preview'));

  // Функция закрывает форму при нажатии на Esc
  var onFormPopupEscPress = function (evt) {
    if (commentTextarea !== document.activeElement && hashtagInput !== document.activeElement) {
      window.utils.isEscEvent(evt, closeFormPopup);
    }
  };

  // Функция открывает форму загрузки и редактирования изображения
  var openFormPopup = function () {
    formPopup.classList.remove('hidden');
    window.zoom.setInitial();
    window.editImg.setInitialEffect();
    zoomButton.addEventListener('click', window.zoom.onZoomButtonClick);
    unzoomButton.addEventListener('click', window.zoom.onUnzoomButtonClick);
    document.addEventListener('keydown', onFormPopupEscPress);
  };

  // Функция закрывает форму загрузки и редактирования изображения
  var closeFormPopup = function () {
    form.reset();
    window.validity.reset();
    formPopup.classList.add('hidden');
    zoomButton.removeEventListener('click', window.zoom.onZoomButtonClick);
    unzoomButton.removeEventListener('click', window.zoom.onUnzoomButtonClick);
    document.removeEventListener('keydown', onFormPopupEscPress);
  };

  fileChooser.addEventListener('change', function () {
    window.uploadImg(fileChooser, imagePreview, imagePreviewEffects);
    openFormPopup();
  });

  formPopupClose.addEventListener('click', function () {
    closeFormPopup();
  });

  // Отправка данных формы на сервер
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.validity.check();
    if (!window.validity.isStopSubmit) {
      window.backend.upload(new FormData(form), onSuccessMessage, onErrorMessage);
      closeFormPopup();
    }
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

  var mainElement = document.querySelector('main');

  var renderMessage = function (element) {
    mainElement.appendChild(element);
  };

  // Функция callback показывает сообщение об успешной отправке данных формы на сервер
  var onSuccessMessage = function () {
    var successMessageObject = createMessage('success');
    var successMessage = successMessageObject.message;
    var successButton = successMessageObject.button;

    renderMessage(successMessage);

    var onCloseButtonClick = function () {
      successMessage.parentNode.removeChild(successMessage);
      successButton.removeEventListener('click', onCloseButtonClick);
      document.removeEventListener('keydown', onSuccessMessageEscPress);
      document.removeEventListener('click', onCloseButtonClick);
    };

    var onSuccessMessageEscPress = function (evt) {
      window.utils.isEscEvent(evt, onCloseButtonClick);
    };

    successButton.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onSuccessMessageEscPress);
    document.addEventListener('click', onCloseButtonClick);
  };

  // Функция callback показывает сообщение о неуспешной отправке данных формы на сервер
  var onErrorMessage = function () {
    var errorMessageObject = createMessage('error');
    var errorMessage = errorMessageObject.message;
    var errorButton = errorMessageObject.button;

    renderMessage(errorMessage);

    var onCloseButtonClick = function () {
      errorMessage.parentNode.removeChild(errorMessage);
      errorButton.removeEventListener('click', onCloseButtonClick);
      document.removeEventListener('keydown', onErrorMessageEscPress);
      document.removeEventListener('click', onCloseButtonClick);
    };

    var onErrorMessageEscPress = function (evt) {
      window.utils.isEscEvent(evt, onCloseButtonClick);
    };

    errorButton.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onErrorMessageEscPress);
    document.addEventListener('click', onCloseButtonClick);
  };
})();
