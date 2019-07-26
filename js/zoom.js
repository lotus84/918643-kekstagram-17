'use strict';

// Модуль отвечает за масштабирование загруженного изображения
(function () {
  var VALUE_STEP = 25;
  var VALUE_MAX = 100;
  var VALUE_MIN = 25;
  var VALUE_INITIAL = 100;
  var zoomButton = document.querySelector('.scale__control--bigger');
  var unzoomButton = document.querySelector('.scale__control--smaller');
  var zoomValueInput = document.querySelector('.scale__control--value');
  var imagePreview = document.querySelector('.img-upload__preview img');

  var setZoomValue = function () {
    var currentZoomValue = Number.parseInt(zoomValueInput.value, 10);
    var newZoomValue = currentZoomValue + VALUE_STEP;

    if (newZoomValue > VALUE_MAX) {
      newZoomValue = VALUE_MAX;
    }

    zoomValueInput.setAttribute('value', newZoomValue + '%');
    imagePreview.style.transform = 'scale(' + (newZoomValue / 100) + ')';
  };

  var setUnzoomValue = function () {
    var currentZoomValue = Number.parseInt(zoomValueInput.value, 10);
    var newZoomValue = currentZoomValue - VALUE_STEP;

    if (newZoomValue < VALUE_MIN) {
      newZoomValue = VALUE_MIN;
    }

    zoomValueInput.setAttribute('value', newZoomValue + '%');
    imagePreview.style.transform = 'scale(' + (newZoomValue / 100) + ')';
  };

  zoomButton.addEventListener('click', function () {
    setZoomValue();
  });

  unzoomButton.addEventListener('click', function () {
    setUnzoomValue();
  });

  window.zoom = function () {
    zoomValueInput.setAttribute('value', VALUE_INITIAL + '%');
    imagePreview.style.transform = 'scale(' + (VALUE_INITIAL / 100) + ')';
  };
})();
