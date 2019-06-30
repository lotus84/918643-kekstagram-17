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
var ESC_KEYCODE = 27;


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

// Открытие и закрытие формы загрузки и редактирования изображения
var formPopupOpen = similarListElement.querySelector('#upload-file');
var formPopup = similarListElement.querySelector('.img-upload__overlay');
var formPopupClose = similarListElement.querySelector('#upload-cancel');
var onFormPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeFormPopup();
  }
};
var openFormPopup = function () {
  formPopup.classList.remove('hidden');
  document.addEventListener('keydown', onFormPopupEscPress);
};
var closeFormPopup = function () {
  formPopup.classList.add('hidden');
  document.removeEventListener('keydown', onFormPopupEscPress);
  clearFileInputField();
};
var clearFileInputField = function () {
  formPopupOpen.value = '';
};

formPopupOpen.addEventListener('change', function () {
  openFormPopup();
});

formPopupClose.addEventListener('click', function () {
  closeFormPopup();
});

// Наложение эффекта на изображение
var effectsList = document.querySelector('.effects__list');
var effects = effectsList.querySelectorAll('.effects__radio');
var imagePreview = document.querySelector('.img-upload__preview img');
var effectLevel = document.querySelector('.img-upload__effect-level');
var addOnEffectClick = function (effect) {
  effect.addEventListener('click', function () {
    clearEffects();
    addEffect(effect);
    toggleEffectLevel(effect);
  });
};
var clearEffects = function () {
  imagePreview.classList.remove('effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
};
var addEffect = function (effect) {
  imagePreview.classList.add('effects__preview--' + effect.value);
};
var toggleEffectLevel = function (effect) {
  if (effect.value === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
};

for (var l = 0; l < effects.length; l++) {
  addOnEffectClick(effects[l]);
}

// Регулирование интенсивности эффекта
var effectLevelFieldset = document.querySelector('.effect-level');
var effectLevelPin = effectLevelFieldset.querySelector('.effect-level__pin');
var effectLevelDepth = effectLevelFieldset.querySelector('.effect-level__depth');
var effectLevelLine = effectLevelFieldset.querySelector('.effect-level__line');
var effectLevelValue = effectLevelFieldset.querySelector('.effect-level__value');
var getPinValue = function () {
  var depthWidth = effectLevelDepth.getBoundingClientRect().right - effectLevelDepth.getBoundingClientRect().left;
  var lineWidth = effectLevelLine.getBoundingClientRect().right - effectLevelLine.getBoundingClientRect().left;
  var pinValue = Math.round((depthWidth / lineWidth) * 100);
  effectLevelValue.setAttribute('value', pinValue);
};
/* var setFilterValue = function () {
  var filter = window.getComputedStyle(imagePreview).filter;
  filter = 'grayscale(' + (pinValue / 100) + ')';
};*/

effectLevelPin.addEventListener('mouseup', function () {
  getPinValue();
});
