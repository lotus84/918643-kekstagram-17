'use strict';

// Модуль для отрисовки увеличенного изображения
(function () {
  var imageBig = document.querySelector('.big-picture');
  var commentCount = imageBig.querySelector('.social__comment-count');
  var commentLoader = imageBig.querySelector('.social__comments-loader');
  var commentsList = imageBig.querySelector('.social__comments');
  var firstComment = commentsList.querySelector('.social__comment');

  // Удаляем все дефолтные комментарии из разметки
  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }

  // Прячем блоки счётчика комментариев и загрузки новых комментариев
  commentCount.classList.add('visually-hidden');
  commentLoader.classList.add('visually-hidden');

  // Функция отрисовывает комментарий и возвращает его
  var renderComment = function (comment) {
    var commentElement = firstComment.cloneNode(true);
    var commentAvatar = commentElement.querySelector('.social__picture');
    var commentText = commentElement.querySelector('.social__text');

    commentAvatar.src = comment.avatar;
    commentText.textContent = comment.message;

    return commentElement;
  };

  // Функция добавляет все комментарии к изображению
  var addComments = function (comments) {
    var fragment = document.createDocumentFragment();

    comments.forEach(function (element) {
      fragment.appendChild(renderComment(element));
    });

    commentsList.appendChild(fragment);
  };

  // Функция заполняет увеличенное изображение данными с сервера
  window.preview = function (bigPicture) {
    var urlImg = imageBig.querySelector('.big-picture__img img');
    var likesImg = imageBig.querySelector('.likes-count');
    var commentsImg = imageBig.querySelector('.comments-count');
    var descriptionImg = imageBig.querySelector('.social__caption');

    urlImg.src = bigPicture.url;
    likesImg.textContent = bigPicture.likes;
    commentsImg.textContent = bigPicture.comments.length;
    descriptionImg.textContent = bigPicture.description;

    addComments(bigPicture.comments);

    // Показываем увеличенное изображение
    imageBig.classList.remove('hidden');
  };
})();
