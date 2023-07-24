const FILTER = {
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

const DEFAULT__EFFECT = 'none';
const DEFAULT_SLIDER_VALUE = '100%';

const modalElement = document.querySelector('.pictures').querySelector('.img-upload');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const sliderValueElement = modalElement.querySelector('.effect-level__value');
const sliderContainerElement = modalElement.querySelector('.img-upload__effect-level');
const imgElement = modalElement.querySelector('.img-upload__preview img');
const effectsListElement = modalElement.querySelector('.effects');
let chosenEffect = '', sliderValue = '';

const setImageStyle = () => {
  if (chosenEffect === DEFAULT__EFFECT) {
    imgElement.style.filter = null;
    return;
  }

  const { filter, unit } = FILTER[chosenEffect];
  imgElement.style.filter = `${filter}(${sliderValue + unit})`;
};

const resetSlider = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
  sliderContainerElement.classList.add('hidden');
  chosenEffect = DEFAULT__EFFECT;
  sliderValue = DEFAULT_SLIDER_VALUE;
  setImageStyle();
};

const createSlider = () => {
  const { min, max, step } = FILTER[chosenEffect];
  noUiSlider.create(sliderElement, {
    range: {
      'min': min,
      'max': max,
    },
    start: max,
    step: step,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(2); //тест принимает знач-е с двумя цифрами после запятой (было 0)
        }
        return value.toFixed(2); //округление до 1 цифры после запятой не проходит тесты
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  sliderContainerElement.classList.remove('hidden');
  sliderElement.noUiSlider.on('update', onSliderUpdate);
};

function onSliderUpdate() {
  sliderValueElement.value = sliderElement.noUiSlider.get();
  sliderValue = sliderValueElement.value;
  setImageStyle();
}

sliderContainerElement.classList.add('hidden');

const onEffectChange = (evt) => {
  if (sliderElement.noUiSlider) {
    resetSlider();
  }
  chosenEffect = evt.target.value;
  if (chosenEffect === 'none') {
    return;
  }
  createSlider();
};

effectsListElement.addEventListener('change', onEffectChange);

export { resetSlider, createSlider };
