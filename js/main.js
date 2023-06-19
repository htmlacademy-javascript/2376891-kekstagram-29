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
  'strawberry',
  'fruit drink',
  'airplane',
  'shoe rack',
  'Path to the Beach',
  'White car',
  'salmon with vegetables',
  'sushi',
  'felt boots',
  'above the clouds',
  'opera choir',
  'vintage car',
  'Light Up Slippers',
  'The Territory Of The Hotel',
  'chicken salad',
  'the sunset',
  'lobster',
  'concert',
  'hippopotamus',
];

const PHOTO_COUNT = 25;
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
let idNumber = 0;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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

const createPhoto = () => {
  const getComments = Array.from({ length: getRandomInteger(Comments.MIN, Comments.MAX) }, createComment);

  idNumber += 1;
  return {
    id: idNumber, //от 1-25
    url: `img/photos/${ idNumber}.jpg`,
    description: DESCRIPTIONS[idNumber - 1],
    likes: getRandomInteger(Likes.MIN,Likes.MAX),
    comments: getComments,
  };
};

const createPhotos = Array.from({ length: PHOTO_COUNT }, createPhoto);

console.log(createPhotos);
