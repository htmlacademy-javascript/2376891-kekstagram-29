import { getPhotos } from './script.js';
import { renderThumbnails } from './thumbnail.js';

export const photos = getPhotos();
renderThumbnails(photos);
