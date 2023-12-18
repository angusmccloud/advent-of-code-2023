import { calculate } from './part1.js';
import { readFileSync } from 'fs';
const dt = readFileSync('app/day8/test.txt', 'utf8');

test('Test Part 1', () => {
  const input = dt.split('\n');
  const expectedOutput = 6;
  
  const result = calculate(input);
  
  expect(result).toBe(expectedOutput);
});