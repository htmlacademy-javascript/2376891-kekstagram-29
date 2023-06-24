function checkLength(string, length) {
  return string.length <= length;
}

function isPalindrome(string) {
  string = string.toLowerCase().replaceAll(' ', '');
  let backWord = '';

  for (let i = string.length - 1; i >= 0; i--) {
    backWord += string[i];
  }

  if (string === backWord) {
    return true;
  }
  return false;
}

function getNumber(string) {
  string = String(string);
  let number = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      number += string[i];
    }
  }
  return parseInt(number, 10);
}

checkLength('проверяемая строка', 20);
isPalindrome('топот');
getNumber('2023 год');

/*console.log(checkLength('проверяемая строка', 20));
console.log(checkLength('проверяемая строка', 18));
console.log(checkLength('проверяемая строка', 10));
console.log(checkLength('aaa', 3));
console.log(checkLength('aa', 3));
console.log(checkLength('aaaa', 3));

/*console.log(isPalindrome('топот'));
console.log(isPalindrome('ДовОд'));
console.log(isPalindrome('Кекс'));
console.log(isPalindrome('Лёша на полке клопа нашёл '));

console.log(getNumber('2023 год'));
console.log(getNumber('ECMAScript 2022'));
console.log(getNumber('1 кефир, 0.5 батона'));
console.log(getNumber('агент 007'));
console.log(getNumber('а я томат'));

console.log(getNumber(2023));
console.log(getNumber(-1));
console.log(getNumber(1.5));*/

const convertToHours = (date) => Number(date.split(':')[0]) + Number(date.split(':')[1] / 60);

const isMeetingSuitable = (startWork, endWork, startMeeting, meetingDuration) => {
  startWork = convertToHours(startWork);
  endWork = convertToHours(endWork);
  startMeeting = convertToHours(startMeeting);
  const endMeeting = startMeeting + meetingDuration / 60;
  //console.log(startWork, endWork, startMeeting, meetingDuration);

  return startMeeting >= startWork && endMeeting <= endWork;
};
/*console.log(isMeetingSuitable('08:00', '17:30', '14:00', 90)); // true
console.log(isMeetingSuitable('8:0', '10:0', '8:0', 120)); // true
console.log(isMeetingSuitable('08:00', '14:30', '14:00', 90)); // false
console.log(isMeetingSuitable('14:00', '17:30', '08:0', 90)); // false
console.log(isMeetingSuitable('8:00', '17:30', '08:00', 900)); // false*/

isMeetingSuitable('08:00', '17:30', '14:00', 90); // true
