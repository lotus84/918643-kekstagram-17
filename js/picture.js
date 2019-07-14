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

  // Функция выводит сообщение об ошибке при загрузке данных с сервера
  var onErrorLoad = function (errorMessage) {
    var div = document.createElement('div');
    div.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    div.style.position = 'absolute';
    div.style.left = 0;
    div.style.right = 0;
    div.style.fontSize = '30px';
    div.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', div);
  };

  window.backend.load(fillBlockWithPictures, onErrorLoad);
})();
