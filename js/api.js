import { isEscapeKey } from './util.js';
import { closeUploadFile } from './form.js';

const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
const messagesList = document.querySelector('body');

const closeMessage = () => {
  messagesList.removeChild(messagesList.lastChild);
};

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
  if (evt.target === messagesList.querySelector('.success') ||
  evt.target === messagesList.querySelector('.error')) {
    closeMessage();
  }
};

const createSuccessMessage = () => {
  const fragment = document.createDocumentFragment();
  const template = successTemplateElement.cloneNode(true);
  fragment.appendChild(template);
  messagesList.appendChild(fragment);

  const cancelSuccessButtonElement = template.querySelector('.success__button');
  cancelSuccessButtonElement.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOutsideClick);
};

const createErrorMessage = () => {
  const fragment = document.createDocumentFragment();
  const template = errorTemplateElement.cloneNode(true);
  fragment.appendChild(template);
  messagesList.appendChild(fragment);

  const cancelErrorButtonElement = template.querySelector('.error__button');
  cancelErrorButtonElement.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOutsideClick);
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);
const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body)
  .then(createSuccessMessage)
  .then(closeUploadFile)
  .catch(createErrorMessage);

export { getData, sendData };
