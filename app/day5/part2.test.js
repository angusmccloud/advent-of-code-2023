import { calculate } from './part2.js';
import { readFileSync } from 'fs';
const dt = readFileSync('app/day5/test.txt', 'utf8');

test('Test Part 2', () => {
  const input = dt.split('\n');
  const expectedOutput = 46;
  
  const result = calculate(input);
  
  expect(result).toBe(expectedOutput);
});