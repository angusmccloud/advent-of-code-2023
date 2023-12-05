import { readFileSync } from 'fs';
const text = readFileSync('app/day3/data.txt', 'utf8');

export const calculate = (input) => {
  // Create an array of all numbers that appear on any line in the input
  // Should track as an object: number, row, startColumn, endColumn
  // Sample Row: ...960#.31..192..
  // In that sample, would find the number 960, 31, and 192
  // Notice that the length of the numbers can change
  const numbers = [];
  const rows = input.length;
  const columns = input[0].length;
  const regex = /\d+/g;
  for (let i = 0; i < rows; i++) {
    let match = regex.exec(input[i]);
    while (match !== null) {
      const number = match[0];
      const startColumn = match.index;
      const endColumn = match.index + number.length - 1;
      numbers.push({ number, row: i, startColumn, endColumn });
      match = regex.exec(input[i]);
    }
  }

  // Create a list of positions in the input that have a symbol
  // All characters are either a period, a symbol, or a number (0-9)
  // We only want to track symbols that are not periods and not numbers
  // Sample Row: ...960#.31..192.%
  // In that sample, would find the symbol # and %
  const symbolPositions = [];
  const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '=', '[', ']', '{', '}', '|', '\\', '/', '<', '>', '?', ':', ';', '\'', '"', ',', '*', '`', '~', '_'];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const char = input[i][j];
      if (symbols.includes(char)) {
        symbolPositions.push({ row: i, column: j, char: char });
      }
    }
  }

  // console.log(numbers);
  // console.log(symbolPositions);

  // Now for each number, sum together those that have a symbol directly adjacent to them
  // Adjacent means directly above, below, left, right, or diagonal a single space
  let sum = 0
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    const { row, startColumn, endColumn } = number;
    const isAbove = symbolPositions.filter((symbolPosition) => {
      return symbolPosition.row === row - 1 && symbolPosition.column >= startColumn -1 && symbolPosition.column <= endColumn +1;
    });
    const isBelow = symbolPositions.filter((symbolPosition) => {
      return symbolPosition.row === row + 1 && symbolPosition.column >= startColumn -1 && symbolPosition.column <= endColumn +1;
    });
    const isLeft = symbolPositions.filter((symbolPosition) => {
      return symbolPosition.row === row && symbolPosition.column === startColumn - 1;
    });
    const isRight = symbolPositions.filter((symbolPosition) => {
      return symbolPosition.row === row && symbolPosition.column === endColumn + 1;
    });
    const isInAnyPosition = isAbove.length > 0 || isBelow.length > 0 || isLeft.length > 0 || isRight.length > 0;

    // console.log('-- for Number X, adding length --', number.number, isInAnyPosition);
    if (isInAnyPosition) {
      sum += parseInt(number.number);
    }
  }
  
  return sum;
}

const fn = () => {
  const dt = text.split('\n');
  
  return calculate(dt);
}

export default fn;