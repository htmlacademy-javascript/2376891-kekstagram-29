const modalElement = document.querySelector('.pictures').querySelector('.img-upload');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const valueElement = modalElement.querySelector('.effect-level__value');

valueElement.value = 100;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});


