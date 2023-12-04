import { readFileSync } from 'fs';
const text = readFileSync('app/day4/data.txt', 'utf8');

const winningValueMap = [0, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512];

export const calculate = (input) => {
  // With an array of rows, where a sample row looks like this: Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
  // First remove everything to the left of the ":"
  // Then split the string on the "|" character
  // Then for each of the two sides, create an array of numbers (removing spaces)

  const lotteryCards = input.map(row => {
    const card = row.split(':')[1];
    const sides = card.split('|');
    const winningNumbers = [];
    const ourNumbers = [];
    const winningNumbersSide = sides[0].split(' ');
    const ourNumbersSide = sides[1].split(' ');
    for (let i = 0; i < winningNumbersSide.length; i++) {
      const num = Number(winningNumbersSide[i]);
      if (num) {
        winningNumbers.push(num);
      }
    }
    for (let i = 0; i < ourNumbersSide.length; i++) {
      const num = Number(ourNumbersSide[i]);
      if (num) {
        ourNumbers.push(num);
      }
    }
    const numberThatMatch = ourNumbers.filter(num => winningNumbers.includes(num));
    const value = winningValueMap[numberThatMatch.length];

    return {
      winningNumbers,
      ourNumbers,
      value: value,
    };
  });
  // console.log(lotteryCards);
  const total = lotteryCards.reduce((acc, card) => {
    return acc + card.value;
  }, 0);

  return total;
}

const fn = () => {
  const dt = text.split('\n');
  
  return calculate(dt);
}

export default fn;