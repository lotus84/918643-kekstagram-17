'use strict';

(function () {
  var similarListElement = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

  // Функция создает DOM-элемент на основе JS-объекта
  var renderPicture = function (picture) {
    var pictureElement = similarPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };

  // Функция заполняет блок DOM-элементами из массива
  var fillBlockWithPictures = function (pictures) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }

    similarListElement.appendChild(fragment);
  };

  fillBlockWithPictures(window.data.photosArray);
})();
