'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var PIN_VALUE_INITIAL = 100;
  var PIN_INITIAL_X = '453px';

  // Открытие и закрытие формы загрузки и редактирования изображения
  var form = document.querySelector('.img-upload__form');
  var formPopupOpen = form.querySelector('#upload-file');
  var formPopup = form.querySelector('.img-upload__overlay');
  var formPopupClose = form.querySelector('#upload-cancel');
  var commentTextarea = formPopup.querySelector('.text__description');
  var hashtagInput = formPopup.querySelector('.text__hashtags');
  var onFormPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (commentTextarea !== document.activeElement && hashtagInput !== document.activeElement) {
        closeFormPopup();
      }
    }
  };
  var openFormPopup = function () {
    formPopup.classList.remove('hidden');
    effectLevel.classList.add('hidden');
    document.addEventListener('keydown', onFormPopupEscPress);
  };
  var closeFormPopup = function () {
    formPopup.classList.add('hidden');
    imagePreview.setAttribute('style', 'filter: initial');
    document.removeEventListener('keydown', onFormPopupEscPress);
    form.reset();
    // clearFormFields();
  };
  /* var clearFormFields = function () {
    formPopupOpen.value = '';
    commentTextarea.value = '';
    hashtagInput.value = '';
  };*/

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

  // Наложение эффекта на изображение
  var currentEffect;
  var effectsList = document.querySelector('.effects__list');
  var effects = effectsList.querySelectorAll('.effects__radio');
  var imagePreview = document.querySelector('.img-upload__preview img');
  var effectLevel = document.querySelector('.img-upload__effect-level');
  var addOnEffectClick = function (effect) {
    effect.addEventListener('click', function () {
      addEffect(effect);
      toggleEffectLevel(effect);
    });
  };
  var clearEffects = function () {
    if (currentEffect) {
      imagePreview.classList.remove('effects__preview--' + currentEffect);
    }
  };
  var setInitialState = function () {
    if (currentEffect === 'none') {
      imagePreview.setAttribute('style', 'filter: initial');
    } else {
      pinValue = PIN_VALUE_INITIAL;
      valueInput.setAttribute('value', pinValue);
      imagePreview.setAttribute('style', effectFilters[currentEffect]());
      pinElem.style.left = PIN_INITIAL_X;
      fillSliderElem.style.width = PIN_INITIAL_X;
    }
  };
  var addEffect = function (effect) {
    clearEffects();
    currentEffect = effect.value;
    imagePreview.classList.add('effects__preview--' + currentEffect);
    setInitialState();
  };
  var toggleEffectLevel = function (effect) {
    if (effect.value === 'none') {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
    }
  };

  for (var l = 0; l < effects.length; l++) {
    addOnEffectClick(effects[l]);
  }

  // Регулирование интенсивности эффекта
  var pinValue;
  var effectFilters = {
    chrome: function () {
      var level = pinValue / 100;
      return 'filter: grayscale(' + level + ')';
    },
    sepia: function () {
      var level = pinValue / 100;
      return 'filter: sepia(' + level + ')';
    },
    marvin: function () {
      return 'filter: invert(' + pinValue + '%)';
    },
    phobos: function () {
      var level = (pinValue * 3) / 100;
      return 'filter: blur(' + level + 'px)';
    },
    heat: function () {
      var level = (pinValue * 2) / 100 + 1;
      return 'filter: brightness(' + level + ')';
    }
  };
  var effectLevelFieldset = document.querySelector('.effect-level');
  var pinElem = effectLevelFieldset.querySelector('.effect-level__pin');
  var fillSliderElem = effectLevelFieldset.querySelector('.effect-level__depth');
  var sliderElem = effectLevelFieldset.querySelector('.effect-level__line');
  var valueInput = effectLevelFieldset.querySelector('.effect-level__value');
  var getCoords = function (elem) {
    var elemPosition = elem.getBoundingClientRect();
    return {
      left: elemPosition.left,
      right: elemPosition.right,
      width: elemPosition.right - elemPosition.left
    };
  };
  var getPinValue = function () {
    pinValue = Math.round((getCoords(fillSliderElem).width / getCoords(sliderElem).width) * 100);
    valueInput.setAttribute('value', pinValue);
  };
  var setFilterValue = function () {
    imagePreview.setAttribute('style', effectFilters[currentEffect]());
  };

  pinElem.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordX = evt.clientX;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var newCoordX = moveEvt.clientX;

      if (newCoordX < getCoords(sliderElem).left) {
        newCoordX = getCoords(sliderElem).left;
      }

      if (newCoordX > getCoords(sliderElem).right) {
        newCoordX = getCoords(sliderElem).right;
      }

      var shiftX = startCoordX - newCoordX;

      startCoordX = newCoordX;

      pinElem.style.left = (pinElem.offsetLeft - shiftX) + 'px';
      var depthWidth = Math.round(getCoords(pinElem).left + getCoords(pinElem).width / 2 - getCoords(sliderElem).left);
      fillSliderElem.style.width = depthWidth + 'px';

      getPinValue();
      setFilterValue();
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      getPinValue();
      setFilterValue();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
