import { showFullsizePicture } from './fullsize-picture.js';
import { getRandomIntegerArray, debounce } from './util.js';
import { photos } from './gallery.js';

const RERENDER_DELAY = 500;
const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsList = document.querySelector('.pictures');
const filtersListElement = document.querySelector('.img-filters');
const filtersFormElement = filtersListElement.querySelector('.img-filters__form');
let chosenFilter = Filters.DEFAULT;
let filteredPhotos = '';
let thumbnailsElement = '';

const createThumbnail = ({ url, description, likes, comments, id }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

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
    thumbnailsElement.removeEventListener('click', onThumbnailClick);
    for (let i = 0; i < thumbnailsElements.length; i++) {
      thumbnailsElements[i].remove();
    }
  }
};

const compareCommentCounts = (pictureA, pictureB) => {
  const pictureAComments = pictureA.comments.length;
  const pictureBComments = pictureB.comments.length;

  return pictureBComments - pictureAComments;
};

function onThumbnailClick(evt) {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');
  if (!thumbnail) {
    return;
  }
  evt.preventDefault();
  const picture = photos.find((photo) => photo.id === +thumbnail.dataset.thumbnailId);
  showFullsizePicture(picture);
}

const renderThumbnails = () => {
  const fragment = document.createDocumentFragment();
  filteredPhotos = photos.slice();
  clearThumbnails();

  if (chosenFilter === Filters.RANDOM) {
    const intArray = getRandomIntegerArray(0, 24, 10);
    filteredPhotos = [];
    photos.forEach((photo) => {
      if (intArray.includes(photo.id)) {
        filteredPhotos.push(photo);
      }
    });
  } else if (chosenFilter === Filters.DISCUSSED) {
    filteredPhotos = filteredPhotos.sort(compareCommentCounts);
  }
  filteredPhotos.forEach((photo) => fragment.appendChild(createThumbnail(photo)));
  thumbnailsList.appendChild(fragment);

  thumbnailsElement = document.querySelector('.pictures');
  thumbnailsElement.addEventListener('click', onThumbnailClick);
};

filtersFormElement.addEventListener('click', debounce(onFilterChange, RERENDER_DELAY));

function onFilterChange (evt) {
  chosenFilter = evt.target.id;
  renderThumbnails();
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
}

export { renderThumbnails, filtersListElement };
