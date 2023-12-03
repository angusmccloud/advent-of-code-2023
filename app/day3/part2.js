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

  // Create a list of positions in the input that have a Gear Symbol *
  const symbolPositions = [];
  const symbols = ['*'];
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

  // For each Symbol, check for all symbols that are directly adjacent to exactly two different numbers
  // Adjacent means directly above, below, left, right, or diagonal a single space
  // For symbols that have two numbers adjacent, multiple together those numbers, then add to sum
  let sum = 0;
  for(let i = 0; i < symbolPositions.length; i++) {
    const {row, column} = symbolPositions[i];
    const isRight = numbers.filter((number) => {
      return number.row === row && number.startColumn === column + 1;
    });
    const isLeft = numbers.filter((number) => {
      return number.row === row && number.endColumn === column - 1;
    });
    const isAbove = numbers.filter((number) => {
      // Check for numbers that are directly above the symbol OR one to the lef tor right (taking into account startColumn and endCoumn)
      return number.row === row - 1 && number.startColumn <= column + 1 && number.endColumn >= column - 1;
    });
    const isBelow = numbers.filter((number) => {
      // Check for numbers that are directly below the symbol OR one to the lef tor right (taking into account startColumn and endCoumn)
      return number.row === row + 1 && number.startColumn <= column + 1 && number.endColumn >= column - 1;
    });

    if(isAbove.length + isBelow.length + isLeft.length + isRight.length === 2) {
      const numbersToMultiply = [...isAbove, ...isBelow, ...isLeft, ...isRight];
      const product = numbersToMultiply.reduce((acc, number) => {
        return acc * parseInt(number.number);
      }, 1);
      sum += product;
    }

  }
  
  return sum;
}

const fn = () => {
  const dt = text.split('\n');
  
  return calculate(dt);
}

export default fn;