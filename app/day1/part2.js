import { readFileSync } from 'fs';
const text = readFileSync('app/day1/data.txt', 'utf8');

export const calculate = (input) => {
  // Given the input array of strings, calculate a result as follows:
  // The strings are either blank of have a number in them
  // We want to create a list of the total number of groups in the array. A group is defined as "all of the numbers between an empty string"
  // Once we have those groupings, create the sum of all values in that group
  // Then return the sum of the top 3 groups
  const groups = [];
  let currentGroup = [];
  input.forEach((line) => {
    if (line === '') {
      groups.push(currentGroup);
      currentGroup = [];
    } else {
      currentGroup.push(line);
    }
  });
  groups.push(currentGroup);

  const groupTotals = groups.map((group) => {
    return group.reduce((acc, line) => {
      return acc + parseInt(line);
    }, 0);
  });

  const sorted = groupTotals.sort((a, b) => {
    return b - a;
  });

  const top3 = sorted.slice(0, 3);

  const sum = top3.reduce((acc, total) => {
    return acc + total;
  });

  return sum;
}

const fn = () => {
  const dt = text.split('\n');
  
  return calculate(dt);
}

export default fn;