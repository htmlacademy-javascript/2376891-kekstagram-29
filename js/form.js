import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { resetSlider } from './effect.js';
import { setUploadFile } from './upload-file.js';

const MAX_HASHTAG_COUNT = 5;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэш-теги не должны повторяться',
  INVALID_PATTERN: 'Неправильный хэштег',
};
const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const uploadFormElement = document.querySelector('#upload-select-image');
const uploadFileElement = uploadFormElement.querySelector('#upload-file');
const overlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const cancelButtonElement = uploadFormElement.querySelector('#upload-cancel');
const bodyElement = document.querySelector('body');
const hashtagElement = uploadFormElement.querySelector('.text__hashtags');
const commentElement = uploadFormElement.querySelector('.text__description');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');
let errorMessage;

const isTextFieldFocused = () => document.activeElement === hashtagElement || document.activeElement === commentElement;
const isErrorMessageShown = () => Boolean(document.querySelector('.error'));

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const closeUploadFileModal = () => {
  uploadFormElement.reset();
  pristine.reset();
  resetScale();
  resetSlider();
  uploadFileElement.value = '';
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onCancelButtonClick() {
  closeUploadFileModal();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isErrorMessageShown()) {
    evt.preventDefault();
    closeUploadFileModal();
  }
}

const validateHashtags = (value) => {
  const hashtags = value.toLowerCase().split(' ').filter((element) => element !== ''); //Boolean(element.length)
  const totalHashtags = new Set(hashtags);

  if (hashtags.length !== totalHashtags.size) {
    errorMessage = ErrorText.NOT_UNIQUE;
    return false;
  }

  if (hashtags.length > MAX_HASHTAG_COUNT) {
    errorMessage = ErrorText.INVALID_COUNT;
    return false;
  }

  const hashtagTemplate = /^#[a-za-яё0-9]{1,19}$/i;
  errorMessage = ErrorText.INVALID_PATTERN;
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

const setUploadFormSubmit = (callback) => {
  uploadFormElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await callback(new FormData(evt.target));
      unblockSubmitButton();
    }
  });
};

const showUploadFileModal = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onUploadFileChange() {
  setUploadFile();
  showUploadFileModal();
}

uploadFileElement.addEventListener('change', onUploadFileChange);

export { setUploadFormSubmit, closeUploadFileModal };
