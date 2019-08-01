'use strict';

// Модуль отвечает за просмотр пользователем изображения сразу после его загрузки на сайт
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  window.uploadImg = function (inputTag, imgTag, backgroundTags) {
    var file = inputTag.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgTag.src = reader.result;
        backgroundTags.forEach(function (it) {
          it.style.backgroundImage = 'url(' + reader.result + ')';
        });
      });

      reader.readAsDataURL(file);
    }
  };
})();
