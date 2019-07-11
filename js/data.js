'use strict';

(function () {
  var COMMENTS_AVATAR = [
    'img/avatar-1.svg',
    'img/avatar-2.svg',
    'img/avatar-3.svg',
    'img/avatar-4.svg',
    'img/avatar-5.svg',
    'img/avatar-6.svg',
  ];
  var COMMENTS_MESSAGE = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var COMMENTS_NAME = ['Изольда', 'Марк', 'Луиза', 'Лев', 'Джана', 'Эрик'];
  var PHOTO_COUNT = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MIN_COMMENTS = 1;
  var MAX_COMMENTS = 10;

  var generatePhotoObject = function (index) {
    return {
      url: 'photos/' + index + '.jpg',
      likes: window.utils.getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: getCommentsArray()
    };
  };

  var getCommentsArray = function () {
    var commentsCount = window.utils.getRandomNumber(MIN_COMMENTS, MAX_COMMENTS);
    var commentsArray = [];
    for (var i = 0; i < commentsCount; i++) {
      commentsArray.push(generateCommentObject());
    }
    return commentsArray;
  };

  var generateCommentObject = function () {
    return {
      avatar: window.utils.getRandomItemFromArray(COMMENTS_AVATAR),
      message: window.utils.getRandomItemFromArray(COMMENTS_MESSAGE) + ' ' + window.utils.getRandomItemFromArray(COMMENTS_MESSAGE),
      name: window.utils.getRandomItemFromArray(COMMENTS_NAME)
    };
  };

  var photosArray = [];
  for (var k = 0; k < PHOTO_COUNT; k++) {
    photosArray.push(generatePhotoObject(k + 1));
  }

  window.data = {
    photosArray: photosArray
  };
})();
