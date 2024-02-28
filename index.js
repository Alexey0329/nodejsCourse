const min = 1;
const max = 1000;

export default function getRandomNumber() {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

let result = getRandomNumber();
console.log(result);