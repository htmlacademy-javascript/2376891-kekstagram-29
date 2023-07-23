import { isEscapeKey } from './util.js';

const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
const messagesListElement = document.querySelector('body');

const onCancelButtonClick = () => {
  closeMessage();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

const onOutsideClick = (evt) => {
  if (evt.target === messagesListElement.querySelector('.success') ||
  evt.target === messagesListElement.querySelector('.error')) {
    closeMessage();
  }
};

function closeMessage () {
  messagesListElement.removeChild(messagesListElement.lastChild);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onOutsideClick);
}

const showSuccessMessage = () => {
  const fragment = document.createDocumentFragment();
  const template = successTemplateElement.cloneNode(true);
  fragment.appendChild(template);
  messagesListElement.appendChild(fragment);

  const cancelSuccessButtonElement = template.querySelector('.success__button');
  cancelSuccessButtonElement.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOutsideClick);
};

const showErrorMessage = () => {
  const fragment = document.createDocumentFragment();
  const template = errorTemplateElement.cloneNode(true);
  fragment.appendChild(template);
  messagesListElement.appendChild(fragment);

  const cancelErrorButtonElement = template.querySelector('.error__button');
  cancelErrorButtonElement.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOutsideClick);
};

export { showSuccessMessage, showErrorMessage };
