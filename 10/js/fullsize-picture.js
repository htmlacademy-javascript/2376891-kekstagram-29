import { isEscapeKey } from './itil.js';
import { photos, template } from './gallery.js';

const bigPictureElement = document.querySelector('.big-picture');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const bigPictureCommentsCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.comments-loader');
const cancelButtonElement = document.querySelector('#picture-cancel');
const COMMENTS_FIRST_PORTION = 5;
let commentsCount = COMMENTS_FIRST_PORTION, pictureIndex, minCommentsCount = 0;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

const onCancelButtonClick = () => {
  closePictureModal();
};

function closePictureModal() {
  bigPictureElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  commentsCount = COMMENTS_FIRST_PORTION;
  minCommentsCount = 0;
}

const renderCommentsList = () => {
  const comments = photos[pictureIndex].comments;
  const fragment = document.createDocumentFragment();

  comments.forEach((comment, index) => {
    for (let i = minCommentsCount; i < commentsCount; i++) {
      if (index === i) {
        const commentTemplate = template.cloneNode(true);
        commentTemplate.querySelector('img').src = comment.avatar;
        commentTemplate.querySelector('img').alt = comment.name;
        commentTemplate.querySelector('p').textContent = comment.message;
        fragment.appendChild(commentTemplate);
      }
    }
  });

  if (commentsLoaderElement.classList.contains('hidden')) {
    commentsLoaderElement.classList.remove('hidden');
  }
  if (commentsCount >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
  }

  commentsListElement.appendChild(fragment);
  bigPictureCommentsCountElement.querySelector('.open_comments-count').textContent = `${commentsListElement.children.length} из `;
};

function onCommentsLoaderClick() {
  minCommentsCount = commentsCount;
  commentsCount += COMMENTS_FIRST_PORTION;
  renderCommentsList();
}

const createBigPictureDetails = (picture) => {
  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = picture.querySelector('.picture__img').src;
  bigPictureElement.querySelector('.social').querySelector('span').textContent = picture.querySelector('.picture__likes').textContent;
  bigPictureCommentsCountElement.querySelector('.comments-count').textContent = picture.querySelector('.picture__comments').textContent;
  bigPictureElement.querySelector('.social__caption').textContent = picture.querySelector('.picture__img').alt;

  commentsListElement.innerHTML = '';
};

export const showFullsizePicture = (picture, index) => {
  pictureIndex = index;
  createBigPictureDetails(picture);

  renderCommentsList();

  bigPictureElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
};

commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
