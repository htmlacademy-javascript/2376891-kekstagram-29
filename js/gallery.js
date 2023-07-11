import { getPhotos } from './script.js';
import { renderThumbnails } from './thumbnail.js';
import { showFullsizePicture } from './fullsize-picture.js';

export const template = document.querySelector('.social__comment');

export const photos = getPhotos();
renderThumbnails(photos);

const pictures = Array.from(document.querySelectorAll('.picture'));

pictures.forEach((picture, index) => {
  picture.addEventListener('click', () => {
    showFullsizePicture(picture, index);
  });
});
