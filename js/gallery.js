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

const onCommentsLoaderClick = (firstRender) => {
  // const commentsCount = 5;
  // console.log(firstRender);
  // firstRender = Object.assign({a: commentsCount += 5}, firstRender);
  firstRender();
};

function openPictureModal(firstRender) {
  // const commentsCount = 5;
  bigPictureModalElement.classList.remove('hidden');
  // bigPictureModalElement.querySelector('.social__comment-count').classList.add('hidden');
  // bigPictureModalElement.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  pictureModalCloseElement.addEventListener('click', onCloseIconClick);
  commentsLoader.addEventListener('click', () => onCommentsLoaderClick(firstRender));
  commentsLoader.removeEventListener('click', () => onCommentsLoaderClick(firstRender));
}

function closePictureModal() {
  bigPictureModalElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  pictureModalCloseElement.removeEventListener('click', onCloseIconClick);
  // commentsLoader.removeEventListener('click', () => onCommentsLoaderClick(firstRender));
  // document.querySelector('.comments-loader').classList.remove('hidden');
}

pictureModalOpenElements.forEach((pictureModalOpenElement, index) => {
  pictureModalOpenElement.addEventListener('click', () => {
    const firstRender = createFullsizePicture(pictureModalOpenElement, index);

    openPictureModal(firstRender);
  });
});

