import { createPhotos } from './script.js';

const createGallery = () => {
  const photosList = document.querySelector('.pictures');
  const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const photos = createPhotos();

  const photosListFragment = document.createDocumentFragment();

  photos.forEach(({url, description, likes, comments}) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photosListFragment.appendChild(photoElement);
  });
  photosList.appendChild(photosListFragment);
};

export { createGallery };
