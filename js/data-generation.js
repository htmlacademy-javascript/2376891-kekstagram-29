import { getPhotos } from './script.js';
import { renderThumbnails } from './thumbnail.js';

export const template = document.querySelector('.social__comment');

export const photos = getPhotos();
renderThumbnails(photos);
