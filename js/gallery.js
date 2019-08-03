'use strict';

// Модуль, который работает с галереей изображений
(function () {
  var PHOTO_COUNT = 10;
  var imgFiltersBlock = document.querySelector('.img-filters');
  var imgFiltersForm = imgFiltersBlock.querySelector('.img-filters__form');

  // При завершении загрузки изображений с сервера показываем блок с кнопками-фильтрами
  var showFiltersBlock = function () {
    imgFiltersBlock.classList.remove('img-filters--inactive');
  };

  // Находим все кнопки-фильтры
  var allFilterButtons = imgFiltersForm.querySelectorAll('button');

  // Обработчик события клик, который отвечает за изменение сортировки изображений
  var onFilterButtonsClick = function (evt) {
    changeButtonClass(evt.target);
    clearOldPictures();
    setCurrentFilter(evt);
  };

  for (var i = 0; i < allFilterButtons.length; i++) {
    allFilterButtons[i].addEventListener('click', onFilterButtonsClick);
  }

  var filterListMap = {
    'popular': function () {
      window.debounce(window.picture.create(pictures));
    },
    'new': function () {
      window.debounce(window.picture.create(getNewRandomPictures()));
    },
    'discussed': function () {
      window.debounce(window.picture.create(getDiscussedPictures()));
    }
  };

  // Функция отвечает за применение сортировки фотографий соответствующей нажатой кнопке
  var setCurrentFilter = function (evt) {
    var currentFilter = evt.target.id.split('-')[1];
    filterListMap[currentFilter]();
  };

  // Функция меняет класс active у нажатой кнопки
  var changeButtonClass = function (activeButton) {
    imgFiltersForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    activeButton.classList.add('img-filters__button--active');
  };

  // Функция очищает контейнер с загруженными фотографиями перед сортировкой
  var clearOldPictures = function () {
    var similarListElement = document.querySelector('.pictures');
    var usersPictures = Array.from(similarListElement.querySelectorAll('a'));

    for (var j = 0; j < usersPictures.length; j++) {
      similarListElement.removeChild(usersPictures[j]);
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

  // Функция сортирует фотографии в порядке уменьшения количества комментариев
  var getDiscussedPictures = function () {
    var discussedPictures = pictures
    .slice()
    .sort(function (left, right) {
      var commentsDiff = commentsDiff === 0 ? urlsComparator(left.url, right.url) : right.comments.length - left.comments.length;

      return commentsDiff;
    });

    return discussedPictures;
  };

  // Функция возвращает 10 новых неповторяющихся фотографий
  var getNewRandomPictures = function () {
    var newPictures = [];
    var uniqueIndexesArray = [];

    while (newPictures.length < PHOTO_COUNT) {
      var newPicture = window.utils.getRandomItemFromArray(pictures);
      var indexArray = pictures.indexOf(newPicture);
      if (uniqueIndexesArray.indexOf(indexArray) === -1) {
        uniqueIndexesArray.push(indexArray);
        newPictures.push(newPicture);
      }
    }

    return newPictures;
  };

  // Массив будет заполняться загруженными данными (фотографиями) с сервера
  var pictures = [];

  // Функция отрисовывает данные (фотографии), полученные с сервера
  var onSuccessLoad = function (data) {
    pictures = data;
    window.picture.create(pictures);
    showFiltersBlock();
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
})();
