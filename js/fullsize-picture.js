import { isEscapeKey } from './util.js';
import { template } from './main.js';

const COMMENTS_FIRST_PORTION = 5;

const bigPictureElement = document.querySelector('.big-picture');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const bigPictureCommentsCountElement = bigPictureElement.querySelector('.social__comment-count');
const openCommentsCountElement = bigPictureCommentsCountElement.querySelector('.open_comments-count');
const commentsLoaderElement = document.querySelector('.comments-loader');
const cancelButtonElement = document.querySelector('#picture-cancel');
const bodyElement = document.querySelector('body');

let shownCommentsCount = COMMENTS_FIRST_PORTION, minCommentsCount = 0;
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
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  shownCommentsCount = COMMENTS_FIRST_PORTION;
  minCommentsCount = 0;
}

const renderCommentsList = () => {
  const comments = bigPicture.comments;
  const fragment = document.createDocumentFragment();

  comments.forEach((comment, index) => {
    for (let i = minCommentsCount; i < shownCommentsCount; i++) {
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
  if (shownCommentsCount >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
  }

  commentsListElement.appendChild(fragment);
  openCommentsCountElement.textContent = `${commentsListElement.children.length} из `;
};

function onCommentsLoaderClick() {
  minCommentsCount = shownCommentsCount;
  shownCommentsCount += COMMENTS_FIRST_PORTION;
  renderCommentsList();
}

const createBigPictureDetails = () => {
  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = bigPicture.url;
  bigPictureElement.querySelector('.social').querySelector('span').textContent = bigPicture.likes;
  bigPictureCommentsCountElement.querySelector('.comments-count').textContent = bigPicture.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = bigPicture.description;

  commentsListElement.innerHTML = '';
};

const showFullsizePicture = (picture) => {
  bigPicture = picture;
  createBigPictureDetails();

  renderCommentsList();

  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
cancelButtonElement.addEventListener('click', onCancelButtonClick);

export { showFullsizePicture };
