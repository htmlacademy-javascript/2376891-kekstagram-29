const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersListElement = document.querySelector('.img-filters');
const filtersFormElement = filtersListElement.querySelector('.img-filters__form');
let chosenFilter = Filter.DEFAULT;
let filteredPhotos = [];
let callback;

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const getFilteredPictures = () => {
  switch (chosenFilter) {
    case Filter.RANDOM:
      return [...filteredPhotos].sort(sortRandomly).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      return [...filteredPhotos].sort(sortByComments);
    default:
      return [...filteredPhotos];
  }
};

const onFilterClick = (evt) => {
  const clickedButton = evt.target;
  if (!evt.target.classList.contains('img-filters__button') ||
    clickedButton.id === chosenFilter) {
    return;
  }

  filtersListElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  clickedButton.classList.add('img-filters__button--active');
  chosenFilter = clickedButton.id;
  callback(filteredPhotos);
};

const init = (loadedPictures, cb) => {
  filteredPhotos = [...loadedPictures];
  filtersListElement.classList.remove('img-filters--inactive');
  callback = cb;

  filtersFormElement.addEventListener('click', onFilterClick);

  return getFilteredPictures();
};

export { init };
