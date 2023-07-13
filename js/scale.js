import { getNumber } from './itil.js';

const SCALE_STEP = 25;
const MIN_SCALE = '25%';
const MAX_SCALE = '100%';
const DEFAULT_SCALE = 100;

const modalElement = document.querySelector('.img-upload');
const smallerButtonElement = modalElement.querySelector('.scale__control--smaller');
const biggerButtonElement = modalElement.querySelector('.scale__control--bigger');
const scaleValueElement = modalElement.querySelector('.scale__control--value');
const imageElement = modalElement.querySelector('.img-upload__preview').querySelector('img');

const setScaleValue = (value) => {
  imageElement.style.transform = `scale(${getNumber(value) / 100})`;
  scaleValueElement.value = value;
};

const onSmallerButtonClick = () => {
  const scaleValue = scaleValueElement.value;
  if (scaleValue !== MIN_SCALE) {
    const newScaleValue = `${getNumber(scaleValue) - SCALE_STEP}%`;
    setScaleValue(newScaleValue);
  }
};

const onBiggerButtonClick = () => {
  const scaleValue = scaleValueElement.value;
  if (scaleValue !== MAX_SCALE) {
    const newScaleValue = `${getNumber(scaleValue) + SCALE_STEP}%`;
    setScaleValue(newScaleValue);
  }
};

const resetScale = () => setScaleValue(DEFAULT_SCALE);

smallerButtonElement.addEventListener('click', onSmallerButtonClick);
biggerButtonElement.addEventListener('click', onBiggerButtonClick);

export { resetScale };
