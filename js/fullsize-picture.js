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

const renderCommentsList = (photoIndex, commentsCount, targetCommentsCount) => {
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

  // if (commentsCount >= comments.length) {
  //   // console.log('всего комментариев ' + comments.length);
  //   // console.log('сколько показать ' + commentsCount);
  //   document.querySelector('.comments-loader').classList.add('hidden');
  // }
  commentsList.appendChild(fragment);
  bigPictureModalElement.querySelector('.social__comment-count').firstChild.textContent = `${commentsList.children.length} из `;
};

export const createFullsizePicture = (picture, index) => {
  let commentsCount = 5;
  bigPictureModalElement.querySelector('.big-picture__img').querySelector('img').src = picture.querySelector('.picture__img').src;
  bigPictureModalElement.querySelector('.social').querySelector('span').textContent = picture.querySelector('.picture__likes').textContent;
  bigPictureModalElement.querySelector('.social__comment-count').querySelector('span').textContent = picture.querySelector('.picture__comments').textContent;
  bigPictureModalElement.querySelector('.social__caption').textContent = picture.querySelector('.picture__img').alt;

  clearCommentsList();

  renderCommentsList(index, commentsCount, 0);

  return () => {
    const targetCommentsCount = commentsCount;
    commentsCount += 5;
    renderCommentsList(index, commentsCount, targetCommentsCount);
  };
};

