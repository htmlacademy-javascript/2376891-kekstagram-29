import { renderThumbnails, filtersListElement } from './thumbnail.js';
import { getData, sendData } from './api.js';
import { showAlert, debounce } from './util.js';
import { setUploadFormSubmit, closeUploadFileModal } from './form.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

export const template = document.querySelector('.social__comment');
export let photos = '';

const RERENDER_DELAY = 500;

getData()
  .then((data) => {
    photos = data;
    debounce(renderThumbnails(data), RERENDER_DELAY);
    filtersListElement.classList.remove('img-filters--inactive');
  })
  .catch((err) => showAlert(err.message));

// try {
//   const data = await getData();
//   renderThumbnails(data);
// } catch (err) {
//   showAlert(err.message);
// }

setUploadFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeUploadFileModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

