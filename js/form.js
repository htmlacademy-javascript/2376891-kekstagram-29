import { isEscapeKey, showAlert } from './util.js';
import { resetScale } from './scale.js';
import { sendData } from './api.js';
import { resetSlider } from './effect.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const uploadFormElement = document.querySelector('#upload-select-image');
const uploadFileElement = uploadFormElement.querySelector('#upload-file');
const imgEditElement = uploadFormElement.querySelector('.img-upload__overlay');
const cancelButtonElement = uploadFormElement.querySelector('#upload-cancel');
const bodyElement = document.querySelector('body');
const hashtagElement = uploadFormElement.querySelector('.text__hashtags');
const commentElement = uploadFormElement.querySelector('.text__description');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');
const MAX_HASHTAG_COUNT = 5;
let errorMessage;

const isTextFieldFocused = () => document.activeElement === hashtagElement || document.activeElement === commentElement;

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper', //Элемент, на который будут добавляться классы
  errorTextParent: 'img-upload__field-wrapper', //Элемент, куда будет выводиться текст с ошибкой
  errorTextClass: 'img-upload__field-wrapper--error', //Класс для элемента с текстом ошибки
}, false);

const closeUploadFile = () => {
  imgEditElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadFormElement.reset();
  pristine.reset();
  resetScale();
  resetSlider();
  uploadFileElement.value = '';
  uploadFormElement.removeEventListener('submit', onFormSubmitClick);
};

function onCancelButtonClick() {
  closeUploadFile();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeUploadFile();
  }
}

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

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

function onFormSubmitClick (evt) {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    const formData = new FormData(evt.target);
    sendData(formData)
      .catch((err) => {
        showAlert(err.message);
      })
      .finally(unblockSubmitButton);
  }
}

const setUploadFormSubmit = () => {
  uploadFormElement.addEventListener('submit', onFormSubmitClick);
};

function onFileInputChange() {
  imgEditElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);

  setUploadFormSubmit();
}

uploadFileElement.addEventListener('change', onFileInputChange);

export { setUploadFormSubmit, closeUploadFile };
