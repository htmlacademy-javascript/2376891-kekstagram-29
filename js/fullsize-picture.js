import { getPhotos } from './script.js';
import { renderThumbnails, template } from './thumbnail.js';

export const photos = getPhotos();
export const bigPictureModalElement = document.querySelector('.big-picture');
renderThumbnails(photos);

const commentsList = bigPictureModalElement.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
let commentsCount, NextIndex;

const clearCommentsList = () => {
  if (commentsList.children) {
    while (commentsList.firstChild) {
      commentsList.removeChild(commentsList.firstChild);
    }
  }
};

const renderCommentsList = (photoIndex, targetCommentsCount) => {
  const comments = photos[photoIndex].comments;
  const fragment = document.createDocumentFragment();

  comments.forEach((comment, index) => {
    for (let i = targetCommentsCount; i < commentsCount; i++) {
      if (index === i) {
        const commentTemplate = template.cloneNode(true);
        commentTemplate.querySelector('img').src = comment.avatar;
        commentTemplate.querySelector('img').alt = comment.name;
        commentTemplate.querySelector('p').textContent = index + comment.message;
        fragment.appendChild(commentTemplate);
      }
    }
  });

  if (commentsCount >= comments.length) {
    document.querySelector('.comments-loader').classList.add('hidden');
    commentsCount = 5;
  }
  commentsList.appendChild(fragment);
  bigPictureModalElement.querySelector('.social__comment-count').firstChild.textContent = `${commentsList.children.length} из `;
};

const onCommentsLoaderClick = () => {
  const targetCommentsCount = commentsCount;
  commentsCount += 5;
  renderCommentsList(NextIndex, targetCommentsCount);
};

export const createFullsizePicture = (picture, oneIndex) => {
  commentsCount = 5;
  NextIndex = oneIndex;
  bigPictureModalElement.querySelector('.big-picture__img').querySelector('img').src = picture.querySelector('.picture__img').src;
  bigPictureModalElement.querySelector('.social').querySelector('span').textContent = picture.querySelector('.picture__likes').textContent;
  bigPictureModalElement.querySelector('.social__comment-count').querySelector('span').textContent = picture.querySelector('.picture__comments').textContent;
  bigPictureModalElement.querySelector('.social__caption').textContent = picture.querySelector('.picture__img').alt;

  clearCommentsList();

  renderCommentsList(NextIndex, 0);

  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  if (document.querySelector('.comments-loader').classList.contains('hidden')) {
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
    document.querySelector('.comments-loader').classList.remove('hidden');
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
  }
};

