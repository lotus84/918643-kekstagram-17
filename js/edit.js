'use strict';

// Модуль, который отвечает за редактирование изображения
(function () {
  // Наложение эффекта на изображение
  var PIN_VALUE_INITIAL = 100;
  var PIN_INITIAL_X = '453px';
  var currentEffect;
  var effectsList = document.querySelector('.effects__list');
  var effects = Array.from(effectsList.querySelectorAll('.effects__radio'));
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
