const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getNumber = (string) => {
  string = String(string);
  let number = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      number += string[i];
    }
  }
  return parseInt(number, 10);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getSequenceNumber = (min, max) => {
  let num = min;
  return () => {
    if (num <= max) {
      return num++;
    }
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomInteger, getRandomArrayElement, getSequenceNumber, isEscapeKey, getNumber };
// export const template = document.querySelector('.social__comment');
