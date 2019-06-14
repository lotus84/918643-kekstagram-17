'use strict';

// Функция генерирует числа от min до max и возвращает массив сгенерированных чисел
var getNumbers = function (min, max, arr) {
  var number = min;
  for (var i = 0; i <= (max - min); i++) {
    arr.push(number);
    number = number + 1;
  }

  return arr;
};

var NUMBERS_PHOTO = [];

getNumbers(1, 25, NUMBERS_PHOTO);

console.log(NUMBERS_PHOTO);

// Функция перемешивает переданный массив
var shuffleNumbers = function (arr) {
  var j;
  var temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

shuffleNumbers(NUMBERS_PHOTO);

console.log(NUMBERS_PHOTO);

// Функция формирует массив адресов картинок из переданного массива чисел
var getUrls = function (arrNumbers, arrUrls, startLine, endLine) {
  for (var i = 0; i < arrNumbers.length; i++) {
    var url = startLine + arrNumbers[i] + endLine;
    arrUrls.push(url);
  }
  return arrUrls;
};

var URLS = [];

getUrls(NUMBERS_PHOTO, URLS, 'photos/', '.jpg');

console.log(URLS);

// Функция генерирует произвольное число из переданного диапазона чисел
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

console.log(getRandomInteger(15, 200));

var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var NUMBERS_AVATAR = [];

getNumbers(1, 6, NUMBERS_AVATAR);
shuffleNumbers(NUMBERS_AVATAR);

var AVATARS = [];

getUrls(NUMBERS_AVATAR, AVATARS, 'img/avatar-', '.svg');

console.log(AVATARS);

var NAMES = ['Изольда', 'Марк', 'Луиза', 'Лев', 'Джана', 'Эрик'];

var COMMENTS = [];

// Функция создает массив объектов: список комментариев к фото
var getComment = function (arrAvatars, arrMessages, arrNames, arrUrls, arrComments) {
  for (var i = 0; i < arrUrls.length; i++) {
    var comment = {};
    comment.avatar = arrAvatars[getRandomInteger(0, arrAvatars.length - 1)];
    comment.message = arrMessages[getRandomInteger(0, arrAvatars.length - 1)];
    comment.name = arrNames[getRandomInteger(0, arrAvatars.length - 1)];
    arrComments.push(comment);
  }
  return arrComments;
};

getComment(AVATARS, MESSAGES, NAMES, URLS, COMMENTS);

console.log(COMMENTS);
