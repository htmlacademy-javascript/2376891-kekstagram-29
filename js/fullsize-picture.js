import { getPhotos } from './script.js';
import { renderThumbnails } from './thumbnail.js';
import { isEscapeKey } from './itil.js';

const photos = getPhotos();

renderThumbnails(photos);


//будем описывать логику показа и скрытия полноразмерного изображения
const pictureModalElement = document.querySelector('.big-picture');
const pictureModalOpenElements = Array.from(document.querySelectorAll('.picture'));
const pictureModalCloseElement = document.querySelector('#picture-cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

const onPictureClick = () => {
  closePictureModal();
};

function openPictureModal() {
  pictureModalElement.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);

  pictureModalCloseElement.addEventListener('click', onPictureClick);
}

function closePictureModal() {
  pictureModalElement.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);

  pictureModalCloseElement.removeEventListener('click', onPictureClick);
}

const commentsList = pictureModalElement.querySelector('.social__comments');

const takeFullsizePicture = (picture, index) => {
  pictureModalElement.querySelector('.big-picture__img').querySelector('img').src = picture.querySelector('.picture__img').src;
  // pictureModalElement.querySelector('.big-picture__img').querySelector('img').alt = picture.querySelector('.picture__img').alt;
  pictureModalElement.querySelector('.social').querySelector('span').textContent = picture.querySelector('.picture__likes').textContent;
  pictureModalElement.querySelector('.social__comment-count').querySelector('span').textContent = picture.querySelector('.picture__comments').textContent;
  pictureModalElement.querySelector('.social__caption').textContent = picture.querySelector('img').alt;

  const template = pictureModalElement.querySelector('ul').querySelector('.social__comment').cloneNode(true);

  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }

  const comments = photos[index].comments;
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentTemplate = template.cloneNode(true);
    commentTemplate.querySelector('img').src = comment.avatar;
    commentTemplate.querySelector('img').alt = comment.name;
    commentTemplate.querySelector('p').textContent = comment.message;
    fragment.appendChild(commentTemplate);
  });
  commentsList.appendChild(fragment);
};

pictureModalOpenElements.forEach((pictureModalOpenElement, index) => {
  pictureModalOpenElement.addEventListener('click', () => {
    takeFullsizePicture(pictureModalOpenElement, index);

    openPictureModal();
  });
});


