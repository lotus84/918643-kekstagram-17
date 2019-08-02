'use strict';

// Модуль для отрисовки увеличенного изображения
(function () {
  var STEP = 5;
  var INITIAL_COUNT_COMMENTS = 5;
  var currentCountComments = INITIAL_COUNT_COMMENTS;
  var body = document.querySelector('body');
  var imageBig = document.querySelector('.big-picture');
  var commentLoader = imageBig.querySelector('.social__comments-loader');
  var commentsList = imageBig.querySelector('.social__comments');
  var firstComment = commentsList.querySelector('.social__comment');

  // Функция отрисовывает комментарий и возвращает его
  var renderComment = function (comment) {
    var commentElement = firstComment.cloneNode(true);
    var commentAvatar = commentElement.querySelector('.social__picture');
    var commentText = commentElement.querySelector('.social__text');

    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentText.textContent = comment.message;
    commentElement.classList.add('visually-hidden');

    return commentElement;
  };

  // Функция добавляет все комментарии к изображению
  var addComments = function (comments) {
    var fragment = document.createDocumentFragment();

    // Удаляем все старые комментарии из разметки
    while (commentsList.firstChild) {
      commentsList.removeChild(commentsList.firstChild);
    }

    // Добавляем новые комментарии
    comments.forEach(function (element) {
      fragment.appendChild(renderComment(element));
    });

    commentsList.appendChild(fragment);
  };

  // Функция показывает комментарии
  var showComments = function () {
    var usersComments = Array.from(commentsList.querySelectorAll('.social__comment'));

    if (currentCountComments < usersComments.length) {
      for (var i = 0; i < currentCountComments; i++) {
        usersComments[i].classList.remove('visually-hidden');
      }
      currentCountComments = currentCountComments + STEP;
    } else {
      for (var k = 0; k < usersComments.length; k++) {
        usersComments[k].classList.remove('visually-hidden');
      }
      commentLoader.classList.add('hidden');
    }
  };

  // Обработчик события клик по кнопке загрузки комментариев
  commentLoader.addEventListener('click', showComments);

  var onCloseButtonClick = function () {
    imageBig.classList.add('hidden');
    commentLoader.classList.remove('hidden');
    currentCountComments = INITIAL_COUNT_COMMENTS;
    body.classList.remove('modal-open');
  };

  var onImageEscPress = function (evt) {
    window.utils.isEscEvent(evt, onCloseButtonClick);
  };

  // Функция заполняет увеличенное изображение данными с сервера
  window.preview = function (bigPicture) {
    var urlImg = imageBig.querySelector('.big-picture__img img');
    var likesImg = imageBig.querySelector('.likes-count');
    var commentsImg = imageBig.querySelector('.comments-count');
    var descriptionImg = imageBig.querySelector('.social__caption');
    var closeButton = document.querySelector('.big-picture__cancel');

    urlImg.src = bigPicture.url;
    likesImg.textContent = bigPicture.likes;
    commentsImg.textContent = bigPicture.comments.length;
    descriptionImg.textContent = bigPicture.description;

    addComments(bigPicture.comments);

    if (bigPicture.comments.length < currentCountComments) {
      commentLoader.classList.add('hidden');
    }

    showComments();

    // Показываем увеличенное изображение
    imageBig.classList.remove('hidden');
    body.classList.add('modal-open');

    // Закрываем увеличенное изображение
    closeButton.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onImageEscPress);
  };
})();
