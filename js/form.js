import { isEscapeKey } from './itil.js';

const uploadFormElement = document.querySelector('#upload-select-image');
const uploadFileElement = uploadFormElement.querySelector('#upload-file');
const imgEditElement = uploadFormElement.querySelector('.img-upload__overlay');
const cancelButtonElement = uploadFormElement.querySelector('#upload-cancel');
const bodyElement = document.querySelector('body');
const hashtagElement = uploadFormElement.querySelector('.text__hashtags');
const commentElement = uploadFormElement.querySelector('.text__description');
const MAX_HASHTAG_COUNT = 5;
let errorMessage;

const onCancelButtonClick = () => {
  closeUploadFile();
};

const isTextFieldFocused = () => document.activeElement === hashtagElement || document.activeElement === commentElement;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeUploadFile();
  }
};

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper', //Элемент, на который будут добавляться классы
  errorTextParent: 'img-upload__field-wrapper', //Элемент, куда будет выводиться текст с ошибкой
  errorTextClass: 'img-upload__field-wrapper--error', //Класс для элемента с текстом ошибки
}, false);

const validateHashtags = (value) => {
  const hashtags = value.toLowerCase().split(' ').filter((element) => element !== ''); //Boolean(element.length)
  const totalHashtags = new Set(hashtags);

  if (hashtags.length !== totalHashtags.size) {
    errorMessage = 'Хэш-теги не должны повторяться';
    return false;
  }

  if (hashtags.length > MAX_HASHTAG_COUNT) {
    errorMessage = 'Не больше 5 хэш-тегов';
    return false;
  }

  const hashtagTemplate = /^#[a-za-яё0-9]{1,19}$/i;
  errorMessage = 'Хэш-тег должен начинаться с # и может содержать только буквы и цифры';
  return hashtags.every((hashtag) => hashtagTemplate.test(hashtag));
};

function getErrorMessage() {
  return errorMessage;
}

pristine.addValidator(hashtagElement, validateHashtags, getErrorMessage);

uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

function closeUploadFile() {
  imgEditElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadFormElement.reset();
  pristine.reset();
}

function openUploadFile() {
  imgEditElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

uploadFileElement.addEventListener('change', openUploadFile);
