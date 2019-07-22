'use strict';

// Модуль для отрисовки увеличенного изображения
(function () {
  var COUNT_COMMENTS = 5;
  var STEP = 5;
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

    if (COUNT_COMMENTS < usersComments.length) {
      for (var i = 0; i < COUNT_COMMENTS; i++) {
        usersComments[i].classList.remove('visually-hidden');
      }
      COUNT_COMMENTS = COUNT_COMMENTS + STEP;
    } else {
      for (var k = 0; k < usersComments.length; k++) {
        usersComments[k].classList.remove('visually-hidden');
      }
      commentLoader.classList.add('hidden');
    }
  };

  // Обработчик события клик по кнопке загрузки комментариев
  commentLoader.addEventListener('click', showComments);

  window.preview = {
    // Функция заполняет увеличенное изображение данными с сервера
    createBigImg: function (bigPicture) {
      var urlImg = imageBig.querySelector('.big-picture__img img');
      var likesImg = imageBig.querySelector('.likes-count');
      var commentsImg = imageBig.querySelector('.comments-count');
      var descriptionImg = imageBig.querySelector('.social__caption');

      urlImg.src = bigPicture.url;
      likesImg.textContent = bigPicture.likes;
      commentsImg.textContent = bigPicture.comments.length;
      descriptionImg.textContent = bigPicture.description;

      addComments(bigPicture.comments);

      if (bigPicture.comments.length < COUNT_COMMENTS) {
        commentLoader.classList.add('hidden');
      }

      showComments();

      // Показываем увеличенное изображение
      imageBig.classList.remove('hidden');
      body.classList.add('modal-open');
    },
    // Функция закрывает увеличенное изображение
    closeBigImg: function () {
      imageBig.classList.add('hidden');
      commentLoader.classList.remove('hidden');
      COUNT_COMMENTS = 5;
      body.classList.remove('modal-open');
    }
  };
})();
