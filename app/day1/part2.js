import { readFileSync } from 'fs';
const text = readFileSync('app/day1/data.txt', 'utf8');

const numberMap = [
  { word: 'one', replacement: '1' },
  { word: 'two', replacement: '2' },
  { word: 'three', replacement: '3' },
  { word: 'four', replacement: '4' },
  { word: 'five', replacement: '5' },
  { word: 'six', replacement: '6' },
  { word: 'seven', replacement: '7' },
  { word: 'eight', replacement: '8' },
  { word: 'nine', replacement: '9' },
];

export const calculate = (input) => {
  const numbers = input.map((line) => {
    const numbersInLine = [];
    // Search left-to-right in the string for numbers *or* words in numberMap
    // As you find them, push into numbersInLine
    // Then take the first and last digit from the array
    // Return them as a 2-digit number
    let i = 0;
    while(i < line.length) {
      const char = line[i];
      if(char.match(/\d/)) {
        numbersInLine.push(char);
      } else {
        for(let j = 0; j < numberMap.length; j++) {
          const num = numberMap[j];
          if(line.substring(i, i + num.word.length) === num.word) {
            numbersInLine.push(num.replacement);
          }
        }
      }
      i++;
    }
    const first = numbersInLine[0];
    const last = numbersInLine[numbersInLine.length - 1];
    return parseInt(first + last);
  });

  const sum = numbers.reduce((acc, num) => {
    return acc + num;
  });

  return sum;
}

const fn = () => {
  const dt = text.split('\n');
  
  return calculate(dt);
}

export default fn;