import { showFullsizePicture } from './fullsize-picture.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsList = document.querySelector('.pictures');

const createThumbnail = ({ url, description, likes, comments }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const renderThumbnails = (photos) => {
  // console.log(photos);
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => fragment.appendChild(createThumbnail(photo)));
  thumbnailsList.appendChild(fragment);

  const pictures = Array.from(document.querySelectorAll('.picture'));
  // console.log(pictures);

  pictures.forEach((picture, index) => {
    picture.addEventListener('click', () => {
      // console.log(picture);
      // console.log(photos[index]);
      showFullsizePicture(photos[index], index);
    });
  });
};

// const pictures = Array.from(document.querySelectorAll('.picture'));
// console.log(pictures);

// export const template = document.querySelector('.social__comment');

export { renderThumbnails };
