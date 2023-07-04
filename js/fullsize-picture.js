import { getPhotos } from './script.js';
import { renderThumbnails, template } from './thumbnail.js';

export const photos = getPhotos();
export const bigPictureModalElement = document.querySelector('.big-picture');
renderThumbnails(photos);

const commentsList = bigPictureModalElement.querySelector('.social__comments');

const clearCommentsList = () => {
  if (commentsList.children) {
    while (commentsList.firstChild) {
      commentsList.removeChild(commentsList.firstChild);
    }
  }
};

const renderCommentsList = (index) => {
  const comments = photos[index].comments;
  const fragment = document.createDocumentFragment();

  clearCommentsList();

  comments.forEach((comment) => {
    const commentTemplate = template.cloneNode(true);
    commentTemplate.querySelector('img').src = comment.avatar;
    commentTemplate.querySelector('img').alt = comment.name;
    commentTemplate.querySelector('p').textContent = comment.message;
    fragment.appendChild(commentTemplate);
  });
  commentsList.appendChild(fragment);
};

export const createFullsizePicture = (picture, index) => {
  bigPictureModalElement.querySelector('.big-picture__img').querySelector('img').src = picture.querySelector('.picture__img').src;
  bigPictureModalElement.querySelector('.social').querySelector('span').textContent = picture.querySelector('.picture__likes').textContent;
  bigPictureModalElement.querySelector('.social__comment-count').querySelector('span').textContent = picture.querySelector('.picture__comments').textContent;
  bigPictureModalElement.querySelector('.social__caption').textContent = picture.querySelector('.picture__img').alt;

  renderCommentsList(index);
};

