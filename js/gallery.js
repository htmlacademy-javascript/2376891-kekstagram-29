import { isEscapeKey } from './itil.js';
import { createFullsizePicture, bigPictureModalElement } from './fullsize-picture.js';

const pictureModalOpenElements = Array.from(document.querySelectorAll('.picture'));
const pictureModalCloseElement = document.querySelector('#picture-cancel');
const commentsLoader = document.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

const onCloseIconClick = () => {
  closePictureModal();
};

const onCommentsLoaderClick = (reRender) => {
  reRender();
};

function openPictureModal(reRender) {
  bigPictureModalElement.classList.remove('hidden');
  // bigPictureModalElement.querySelector('.social__comment-count').classList.add('hidden');
  // bigPictureModalElement.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  pictureModalCloseElement.addEventListener('click', onCloseIconClick);
  commentsLoader.addEventListener('click', () => onCommentsLoaderClick(reRender));
  commentsLoader.removeEventListener('click', () => onCommentsLoaderClick(reRender));
}

function closePictureModal() {
  bigPictureModalElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  pictureModalCloseElement.removeEventListener('click', onCloseIconClick);
  // commentsLoader.removeEventListener('click', () => onCommentsLoaderClick(reRender));
  // document.querySelector('.comments-loader').classList.remove('hidden');
}

pictureModalOpenElements.forEach((pictureModalOpenElement, index) => {
  pictureModalOpenElement.addEventListener('click', () => {
    const reRender = createFullsizePicture(pictureModalOpenElement, index);

    openPictureModal(reRender);
  });
});

