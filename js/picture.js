'use strict';

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

  var urlsComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updatePictures = function (begin, end) {
    window.render(pictures
      .slice(begin, end)
      .sort(function (left, right) {
        var commentsDiff = right.comments.length - left.comments.length;
        if (commentsDiff === 0) {
          commentsDiff = urlsComparator(left.url, right.url);
        }
        return commentsDiff;
      }));
  };

  popularFilterButton.addEventListener('click', function () {
    changeButtonClass(popularFilterButton);
    clearOldPictures();
    window.debounce(window.render(pictures));
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

  var clearOldPictures = function () {
    var similarListElement = document.querySelector('.pictures');
    var usersPictures = Array.from(similarListElement.querySelectorAll('a'));

    for (var i = 0; i < usersPictures.length; i++) {
      similarListElement.removeChild(usersPictures[i]);
    }
  };

  var changeButtonClass = function (activeButton) {
    var buttons = Array.from(imgFiltersForm.querySelectorAll('.img-filters__button'));

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('img-filters__button--active');
    }

    activeButton.classList.add('img-filters__button--active');
  };

  var pictures = [];

  // Функция отрисовывает данные, полученные с сервера
  var onSuccessLoad = function (data) {
    pictures = data;
    window.render(pictures);
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

  window.backend.load(onSuccessLoad, onErrorLoad);

  window.picture = imgFiltersBlock;
})();
