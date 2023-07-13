// import { getNumber } from './itil.js';

const FILTERS = {
  none: 0,
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

const modalElement = document.querySelector('.pictures').querySelector('.img-upload');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const sliderValueElement = modalElement.querySelector('.effect-level__value');
const sliderContainerElement = modalElement.querySelector('.img-upload__effect-level');
const imgElement = modalElement.querySelector('.img-upload__preview img');
const effectsListElement = modalElement.querySelector('.effects');

sliderValueElement.value = 100;

const setStyle = (effect) => {
  // console.log(FILTERS[effect]['filter']);
  if (effect === 'none') {
    imgElement.style.filter = effect;
    return;
  }
  const value = sliderValueElement.value;
  imgElement.style.filter = `${FILTERS[effect]['filter']}(${value + FILTERS[effect]['unit']})`;
  // sliderElement.noUiSlider.updateOptions({
  //   range: {
  //     min: FILTERS[effect]['min'],
  //     max: FILTERS[effect]['max'],
  //   },
  //   start: FILTERS[effect]['max'],
  //   step: FILTERS[effect]['step'],
  //   connect: 'lower',
  // });
};

const onSliderUpdate = () => {
  sliderValueElement.value = sliderElement.noUiSlider.get();
};

const createSlider = (effect) => {
  // console.log(`min: ${ FILTERS[effect]['min'] }max: ${ FILTERS[effect]['max'] }step: ${ FILTERS[effect]['step']}`);
  noUiSlider.create(sliderElement, {
    range: {
      min: FILTERS[effect]['min'],
      max: FILTERS[effect]['max'],
    },
    start: FILTERS[effect]['max'],
    step: FILTERS[effect]['step'],
    connect: 'lower',
  });
  sliderContainerElement.classList.remove('hidden');
  sliderElement.noUiSlider.on('update', onSliderUpdate);
};

effectsListElement.addEventListener('change', (evt) => {
  const effect = evt.target.closest('[value]');
  // console.log(effect.value);
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
    sliderContainerElement.classList.add('hidden');
  }
  setStyle(effect.value);
  createSlider(effect.value);
});
