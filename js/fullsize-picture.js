import { getPhotos } from './script.js';
import { renderThumbnails } from './thumbnail.js';
import { isEscapeKey } from './itil.js';

const photos = getPhotos();

renderThumbnails(photos);


//будем описывать логику показа и скрытия полноразмерного изображения
const bigPictureModalElement = document.querySelector('.big-picture');
const pictureModalOpenElements = Array.from(document.querySelectorAll('.picture'));
const pictureModalCloseElement = document.querySelector('#picture-cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

const onCloseButtonClick = () => {
  closePictureModal();
};

function openPictureModal() {
  bigPictureModalElement.classList.remove('hidden');


  document.addEventListener('keydown', onDocumentKeydown);

  pictureModalCloseElement.addEventListener('click', onCloseButtonClick);
}

function closePictureModal() {
  bigPictureModalElement.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);

  pictureModalCloseElement.removeEventListener('click', onCloseButtonClick);
}

const commentsList = bigPictureModalElement.querySelector('.social__comments');

const renderComments = (index) => {
  const template = bigPictureModalElement.querySelector('ul').querySelector('.social__comment').cloneNode(true);
  const comments = photos[index].comments;
  const fragment = document.createDocumentFragment();

  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }
  comments.forEach((comment) => {
    const commentTemplate = template.cloneNode(true);
    commentTemplate.querySelector('img').src = comment.avatar;
    commentTemplate.querySelector('img').alt = comment.name;
    commentTemplate.querySelector('p').textContent = comment.message;
    fragment.appendChild(commentTemplate);
  });
  commentsList.appendChild(fragment);
};

const createFullsizePicture = (picture, index) => {
  bigPictureModalElement.querySelector('.big-picture__img').querySelector('img').src = picture.querySelector('.picture__img').src;
  bigPictureModalElement.querySelector('.social').querySelector('span').textContent = picture.querySelector('.picture__likes').textContent;
  bigPictureModalElement.querySelector('.social__comment-count').querySelector('span').textContent = picture.querySelector('.picture__comments').textContent;
  bigPictureModalElement.querySelector('.social__caption').textContent = picture.querySelector('.picture__img').alt;

  renderComments(index);
};

pictureModalOpenElements.forEach((pictureModalOpenElement, index) => {
  pictureModalOpenElement.addEventListener('click', () => {
    createFullsizePicture(pictureModalOpenElement, index);

    openPictureModal();
  });
});


