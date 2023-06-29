import { getRandomInteger, getRandomArrayElement, getSequenceNumber } from './itil.js';

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'beach area',
  'signpost',
  'azure coast',
  'photo on the beach',
  'soup',
  'black car',
];

const PhotoCount = {
  MIN: 1,
  MAX: 25,
};
const Messages = {
  MIN: 1,
  MAX: 2,
};
const Comments = {
  MIN: 0,
  MAX: 30,
};
const Likes = {
  MIN: 15,
  MAX: 200,
};

const getMessages = (messagesCount) => {
  let message = getRandomArrayElement(MESSAGES); //let message = MESSAGES[getRandomInteger(0, (MESSAGES.length - 1))];
  if (messagesCount === 1) {
    return message;
  }
  message += getRandomArrayElement(MESSAGES);
  return message;
};

const createComment = () => ({
  id: getRandomInteger(0, 500),
  avatar: `img/avatar-${ getRandomInteger(1, 6)}.svg`,
  message: getMessages(getRandomInteger(Messages.MIN,Messages.MAX)),
  name: getRandomArrayElement(NAMES), //NAMES[getRandomInteger(0, (NAMES.length - 1))],
});

const createIDNumber = getSequenceNumber(PhotoCount.MIN,PhotoCount.MAX);

const createPhoto = () => {
  const getComments = Array.from({ length: getRandomInteger(Comments.MIN, Comments.MAX) }, createComment);
  const idNumber = createIDNumber();

  return {
    id: idNumber, //от 1-25
    url: `/photos/${idNumber}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(Likes.MIN,Likes.MAX),
    comments: getComments,
  };
};

export const createPhotos = () => Array.from({ length: PhotoCount.MAX }, createPhoto);
