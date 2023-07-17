import { isEscapeKey } from './itil.js';
// import { photos, template } from './gallery.js';
import { template } from './gallery.js';

const bigPictureElement = document.querySelector('.big-picture');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const bigPictureCommentsCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.comments-loader');
const cancelButtonElement = document.querySelector('#picture-cancel');
const COMMENTS_FIRST_PORTION = 5;
let commentsCount = COMMENTS_FIRST_PORTION, pictureIndex, minCommentsCount = 0;
let bigPicture = '';

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
  const comments = bigPicture.comments;
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

const createBigPictureDetails = () => {
  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = bigPicture.url;
  bigPictureElement.querySelector('.social').querySelector('span').textContent = bigPicture.likes;
  bigPictureCommentsCountElement.querySelector('.comments-count').textContent = bigPicture.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = bigPicture.description;

  commentsListElement.innerHTML = '';
};

export const showFullsizePicture = (picture, index) => {
  bigPicture = picture;
  pictureIndex = index;
  createBigPictureDetails();

  renderCommentsList();

  bigPictureElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
};

commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
