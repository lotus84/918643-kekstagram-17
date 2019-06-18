'use strict';

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
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: getCommentsArray()
  };
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getCommentsArray = function () {
  var commentsCount = getRandomNumber(MIN_COMMENTS, MAX_COMMENTS);
  var commentsArray = [];
  for (var i = 0; i < commentsCount; i++) {
    commentsArray.push(generateCommentObject());
  }
  return commentsArray;
};

var generateCommentObject = function () {
  return {
    avatar: getRandomItemFromArray(COMMENTS_AVATAR),
    message: getRandomItemFromArray(COMMENTS_MESSAGE) + ' ' + getRandomItemFromArray(COMMENTS_MESSAGE),
    name: getRandomItemFromArray(COMMENTS_NAME)
  };
};

var getRandomItemFromArray = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};

var photosArray = [];
for (var k = 0; k < PHOTO_COUNT; k++) {
  photosArray.push(generatePhotoObject(k + 1));
}

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

fillBlockWithPictures(photosArray);
