

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
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

export { getRandomInteger, getRandomArrayElement, getSequenceNumber};