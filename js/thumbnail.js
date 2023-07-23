import { showFullsizePicture } from './fullsize-picture.js';
import { init } from './filter.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;

const thumbnailTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsContainerElement = document.querySelector('.pictures');
let loadedPhotos = '';

const createThumbnail = ({ url, description, likes, comments, id }) => {
  const thumbnail = thumbnailTemplateElement.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

const clearThumbnails = () => {
  const thumbnailsElements = document.querySelectorAll('.picture');
  if (thumbnailsElements.length > 0) {
    thumbnailsElements.forEach((element) => element.remove());
  }
};

function onThumbnailClick(evt) {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');
  if (!thumbnail) {
    return;
  }
  evt.preventDefault();
  const picture = loadedPhotos.find((photo) => photo.id === Number(thumbnail.dataset.thumbnailId));
  showFullsizePicture(picture);
}

const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();
  loadedPhotos = photos;
  clearThumbnails();

  const filteredPhotos = init(loadedPhotos, debounce(renderThumbnails, RERENDER_DELAY));
  filteredPhotos.forEach((photo) => fragment.appendChild(createThumbnail(photo)));
  thumbnailsContainerElement.appendChild(fragment);

  thumbnailsContainerElement.addEventListener('click', onThumbnailClick);
};

export { renderThumbnails };
