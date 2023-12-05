import { calculate } from './part1.js';
import { readFileSync } from 'fs';
const dt = readFileSync('app/day5/test.txt', 'utf8');

test('Test Part 1', () => {
  const input = dt.split('\n');
  const expectedOutput = 35;
  
  const result = calculate(input);
  
  expect(result).toBe(expectedOutput);
});