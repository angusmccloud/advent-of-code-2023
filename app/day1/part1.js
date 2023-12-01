import { readFileSync } from 'fs';
const text = readFileSync('app/day1/data.txt', 'utf8');

export const calculate = (input) => {
  // For each line, find only the characters that are numbers, ignore the rest
  // Then, for that line, take the first and last digit to create a 2-digit number
  // Store each of those numbers in an array
  // Then sum all of the numbers in the array

  const numbers = input.map((line) => {
    const digits = line.match(/\d/g);
    if(digits === null) {
      return 0;
    }
    const first = digits[0];
    const last = digits[digits.length - 1];
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