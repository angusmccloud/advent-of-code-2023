import { readFileSync } from 'fs';
const text = readFileSync('app/day9/data.txt', 'utf8');

const childDifferences = (input) => {
  const differences = [];
  for(let i = 0; i < input.length - 1; i++) {
    differences.push(input[i + 1] - input[i]);
  }
  return differences;
}

const calculateNextValue = (input) => {
  const differences = childDifferences(input);
  // If all differences are the same
  if (differences.every((value) => value === differences[0])) {
    return input[0] - differences[0];
  } else {
    return input[0] - calculateNextValue(differences);
  }
}

export const calculate = (input) => {
  let total = 0;
  for(let i = 0; i < input.length; i++) {
    const oneSetOfValues = input[i].split(' ').map((value) => parseInt(value));
    const nextValue = calculateNextValue(oneSetOfValues);
    total += nextValue;
  }
  return total;
}

const fn = () => {
  const dt = text.split('\n');
  
  return calculate(dt);
}

export default fn;