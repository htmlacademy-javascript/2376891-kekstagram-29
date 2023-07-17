// import { getPhotos } from './script.js';
import { renderThumbnails } from './thumbnail.js';
// import { showFullsizePicture } from './fullsize-picture.js';

export const template = document.querySelector('.social__comment');

// let photos = '';
// renderThumbnails(photos);

fetch('https://29.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((images) => {
    const photos = images;
    // console.log(photos);
    renderThumbnails(photos);
  });

// photos.forEach((photo, index) => {
//   photo.addEventListener('click', () => {
//     console.log(photo + index);
//     showFullsizePicture(photo, index);
//   });
// });

// console.log(photos);
// renderThumbnails(photos);

// const pictures = Array.from(document.querySelectorAll('.picture'));
// console.log(pictures);

// photos.forEach((photo, index) => {
//   photo.addEventListener('click', () => {
//     console.log(photo + index);
//     showFullsizePicture(photo, index);
//   });
// });

// export { photos };
