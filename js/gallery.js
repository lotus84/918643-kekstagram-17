'use strict';

// Модуль, который работает с галереей изображений
(function () {
  var FIRST_INDEX = 0;
  var MIDDLE_INDEX = 14;
  var POPULAR_PHOTO_COUNT = 10;
  var firstRandomIndex = window.utils.getRandomNumber(FIRST_INDEX, MIDDLE_INDEX);
  var endRandomIndex = firstRandomIndex + POPULAR_PHOTO_COUNT;
  var imgFiltersBlock = document.querySelector('.img-filters');
  var imgFiltersForm = imgFiltersBlock.querySelector('.img-filters__form');
  var popularFilterButton = imgFiltersBlock.querySelector('#filter-popular');
  var newFilterButton = imgFiltersBlock.querySelector('#filter-new');
  var discussedFilterButton = imgFiltersBlock.querySelector('#filter-discussed');

  // При завершении загрузки изображений с сервера показываем блок с кнопками-фильтрами
  var showFiltersBlock = function () {
    imgFiltersBlock.classList.remove('img-filters--inactive');
  };

  // Функция меняет класс active у нажатой кнопки
  var changeButtonClass = function (activeButton) {
    var buttons = Array.from(imgFiltersForm.querySelectorAll('.img-filters__button'));

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('img-filters__button--active');
    }

    activeButton.classList.add('img-filters__button--active');
  };

  // Функция очищает контейнер с загруженными фотографиями перед сортировкой
  var clearOldPictures = function () {
    var similarListElement = document.querySelector('.pictures');
    var usersPictures = Array.from(similarListElement.querySelectorAll('a'));

    for (var i = 0; i < usersPictures.length; i++) {
      similarListElement.removeChild(usersPictures[i]);
    }
  };

  // Функция сравнивает urls загруженных фотографий
  var urlsComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  // Функция сортирует и отрисовывает фотографии в соответствии с заданным критерием
  var updatePictures = function (begin, end) {
    window.picture(pictures
      .slice(begin, end)
      .sort(function (left, right) {
        var commentsDiff = commentsDiff === 0 ? urlsComparator(left.url, right.url) : right.comments.length - left.comments.length;

        return commentsDiff;
      }));
  };

  popularFilterButton.addEventListener('click', function () {
    changeButtonClass(popularFilterButton);
    clearOldPictures();
    window.debounce(window.picture(pictures));
  });

  newFilterButton.addEventListener('click', function () {
    changeButtonClass(newFilterButton);
    clearOldPictures();
    window.debounce(updatePictures(firstRandomIndex, endRandomIndex));
  });

  discussedFilterButton.addEventListener('click', function () {
    changeButtonClass(discussedFilterButton);
    clearOldPictures();
    window.debounce(updatePictures(FIRST_INDEX));
  });

  // Массив будет заполняться загруженными данными (фотографиями) с сервера
  var pictures = [];

  // Функция отрисовывает данные (фотографии), полученные с сервера
  var onSuccessLoad = function (data) {
    pictures = data;
    window.picture(pictures);
    showFiltersBlock();
    window.gallery();
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

  // Вызываем функцию загрузки данных с сервера
  window.backend.load(onSuccessLoad, onErrorLoad);

  // Функция заполняет массив фотографиями пользователей
  var addUsersPicture = function () {
    var usersPictures = Array.from(document.querySelectorAll('.picture__img'));

    return usersPictures;
  };

  // Обработчик события клика по изображению для показа изображения в полноэкранном режиме
  var onUsersPictureClick = function (index, array) {
    var closeButton = document.querySelector('.big-picture__cancel');
    array[index].addEventListener('click', function () {
      window.preview(pictures[index]);
    });

    var onCloseButtonClick = function () {
      var imageBig = document.querySelector('.big-picture');
      imageBig.classList.add('hidden');
    };

    var onImageEscPress = function (evt) {
      window.utils.isEscEvent(evt, onCloseButtonClick);
    };

    closeButton.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onImageEscPress);
  };

  window.gallery = function () {
    var images = addUsersPicture();
    for (var i = 0; i < images.length; i++) {
      onUsersPictureClick(i, images);
    }
  };
})();
