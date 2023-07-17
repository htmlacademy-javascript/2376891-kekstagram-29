import { renderThumbnails } from './thumbnail.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

export const template = document.querySelector('.social__comment');

getData()
  .then((images) => {
    const photos = images;
    renderThumbnails(photos);
  })
  .catch(
    (err) => {
      showAlert(err.massage);
    }
  );
