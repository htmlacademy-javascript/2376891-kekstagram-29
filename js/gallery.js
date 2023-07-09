import './data-generation.js';
import { showFullsizePicture } from './fullsize-picture.js';

const pictures = Array.from(document.querySelectorAll('.picture'));

pictures.forEach((picture, index) => {
  picture.addEventListener('click', () => {
    showFullsizePicture(picture, index);
  });
});
