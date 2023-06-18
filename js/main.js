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

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getMessages = (messagesNumber) => {
  let message = messages[getRandomInteger(0, (messages.length - 1))];
  if (messagesNumber === 1) {
    return message;
  }
  message += messages[getRandomInteger(0, (messages.length - 1))];
  return message;
};

const getComment = () => ({
  id: getRandomInteger(0, 500),
  avatar: `img/photos/${ getRandomInteger(1,6)}.jpg`,
  message: getMessages(getRandomInteger(1,2)),
  name: NAMES[getRandomInteger(0, (NAMES.length - 1))],
});

const getComments = (commentsNumber) => Array.from({length: commentsNumber}, getComment);

const createPhotoDescription = () => {
  const idNumber = 0;
  return {
    id: idNumber + 1, //от 1-25
    photoUrl: `img/photos/${ idNumber + 1}.jpg`,
    description: '',
    likes: getRandomInteger(15,200),
    comments: getComments(getRandomInteger(0, 30)),
  };
};

console.log(createPhotoDescription());
