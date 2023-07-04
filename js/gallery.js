import { isEscapeKey } from './itil.js';
import { createFullsizePicture, bigPictureModalElement } from './fullsize-picture.js';

const pictureModalOpenElements = Array.from(document.querySelectorAll('.picture'));
const pictureModalCloseElement = document.querySelector('#picture-cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

const onCloseIconClick = () => {
  closePictureModal();
};

function openPictureModal() {
  bigPictureModalElement.classList.remove('hidden');
  bigPictureModalElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureModalElement.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);

  pictureModalCloseElement.addEventListener('click', onCloseIconClick);
}

function closePictureModal() {
  bigPictureModalElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);

  pictureModalCloseElement.removeEventListener('click', onCloseIconClick);
}

pictureModalOpenElements.forEach((pictureModalOpenElement, index) => {
  pictureModalOpenElement.addEventListener('click', () => {
    createFullsizePicture(pictureModalOpenElement, index);

    openPictureModal();
  });
});

