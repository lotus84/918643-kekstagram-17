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
var PIN_VALUE_INITIAL = 100;


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
var commentTextarea = formPopup.querySelector('.text__description');
var hashtagInput = formPopup.querySelector('.text__hashtags');
var onFormPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (commentTextarea !== document.activeElement && hashtagInput !== document.activeElement) {
      closeFormPopup();
    }
  }
};
var openFormPopup = function () {
  formPopup.classList.remove('hidden');
  effectLevel.classList.add('hidden');
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
var currentEffect;
var effectsList = document.querySelector('.effects__list');
var effects = effectsList.querySelectorAll('.effects__radio');
var imagePreview = document.querySelector('.img-upload__preview img');
var effectLevel = document.querySelector('.img-upload__effect-level');
var addOnEffectClick = function (effect) {
  effect.addEventListener('click', function () {
    addEffect(effect);
    toggleEffectLevel(effect);
  });
};
var clearEffects = function () {
  if (currentEffect) {
    imagePreview.classList.remove('effects__preview--' + currentEffect);
  }
};
var setInitialState = function () {
  if (currentEffect === 'none') {
    imagePreview.setAttribute('style', 'filter: initial');
  } else {
    pinValue = PIN_VALUE_INITIAL;
    valueInput.setAttribute('value', pinValue);
    imagePreview.setAttribute('style', effectFilters[currentEffect]());
    var initialX = getCoords(sliderElem).width;
    pinElem.style.left = initialX + 'px';
    fillSliderElem.style.width = initialX + 'px';
  }
};
var addEffect = function (effect) {
  clearEffects();
  currentEffect = effect.value;
  imagePreview.classList.add('effects__preview--' + currentEffect);
  setInitialState();
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
var pinValue;
var effectFilters = {
  chrome: function () {
    var level = pinValue / 100;
    return 'filter: grayscale(' + level + ')';
  },
  sepia: function () {
    var level = pinValue / 100;
    return 'filter: sepia(' + level + ')';
  },
  marvin: function () {
    return 'filter: invert(' + pinValue + '%)';
  },
  phobos: function () {
    var level = (pinValue * 3) / 100;
    return 'filter: blur(' + level + 'px)';
  },
  heat: function () {
    var level = (pinValue * 2) / 100 + 1;
    return 'filter: brightness(' + level + ')';
  }
};
var effectLevelFieldset = document.querySelector('.effect-level');
var pinElem = effectLevelFieldset.querySelector('.effect-level__pin');
var fillSliderElem = effectLevelFieldset.querySelector('.effect-level__depth');
var sliderElem = effectLevelFieldset.querySelector('.effect-level__line');
var valueInput = effectLevelFieldset.querySelector('.effect-level__value');
var getCoords = function (elem) {
  var elemPosition = elem.getBoundingClientRect();
  return {
    left: elemPosition.left,
    right: elemPosition.right,
    width: elemPosition.right - elemPosition.left
  };
};
var getPinValue = function () {
  pinValue = Math.round((getCoords(fillSliderElem).width / getCoords(sliderElem).width) * 100);
  valueInput.setAttribute('value', pinValue);
};
var setFilterValue = function () {
  imagePreview.setAttribute('style', effectFilters[currentEffect]());
};

pinElem.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoordX = evt.clientX;
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var newCoordX = moveEvt.clientX;

    if (newCoordX < getCoords(sliderElem).left) {
      newCoordX = getCoords(sliderElem).left;
    }

    if (newCoordX > getCoords(sliderElem).right) {
      newCoordX = getCoords(sliderElem).right;
    }

    var shiftX = startCoordX - newCoordX;

    startCoordX = newCoordX;

    pinElem.style.left = (pinElem.offsetLeft - shiftX) + 'px';
    var depthWidth = Math.round(getCoords(pinElem).left + getCoords(pinElem).width / 2 - getCoords(sliderElem).left);
    fillSliderElem.style.width = depthWidth + 'px';

    getPinValue();
    setFilterValue();
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    getPinValue();
    setFilterValue();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
