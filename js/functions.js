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
