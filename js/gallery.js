import { renderThumbnails } from './thumbnail.js';
import { getData, sendData } from './api.js';
import { showAlert } from './util.js';
import { setUploadFormSubmit, closeUploadFileModal } from './form.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

export const template = document.querySelector('.social__comment');


getData()
  .then((data) => {
    renderThumbnails(data);
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

