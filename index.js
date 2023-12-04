import express from 'express';
const app = express();
const port = 3000;
import { resultWrapper } from './app/utils.js';
import { part1 as day1part1, part2 as day1part2 } from './app/day1/index.js';
import { part1 as day2part1, part2 as day2part2 } from './app/day2/index.js';
import { part1 as day3part1, part2 as day3part2 } from './app/day3/index.js';
import { part1 as day4part1, part2 as day4part2 } from './app/day4/index.js';
const numberOfDays = 4;

// Day 1, Parts 1 and 2
app.get('/1/1', (req, res) => res.send(resultWrapper(day1part1(), 1, 1)));
app.get('/1/2', (req, res) => res.send(resultWrapper(day1part2(), 1, 2)));
// Day 2, Parts 1 and 2
app.get('/2/1', (req, res) => res.send(resultWrapper(day2part1(), 2, 1)));
app.get('/2/2', (req, res) => res.send(resultWrapper(day2part2(), 2, 2)));
// Day 3, Parts 1 and 2
app.get('/3/1', (req, res) => res.send(resultWrapper(day3part1(), 3, 1)));
app.get('/3/2', (req, res) => res.send(resultWrapper(day3part2(), 3, 2)));
// Day 4, Parts 1 and 2
app.get('/4/1', (req, res) => res.send(resultWrapper(day4part1(), 4, 1)));
app.get('/4/2', (req, res) => res.send(resultWrapper(day4part2(), 4, 2)));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Home page to show a list of the days
app.get('/', (req, res) => {
  let html = '<table>';
  html += '<tr><th>Day</th><th>Part 1</th><th>Part 2</th></tr>';
  for (let i = 1; i <= numberOfDays; i++) {
    html += `<tr><td>${i}</td><td><a href="/${i}/1">Part 1</a></td><td><a href="/${i}/2">Part 2</a></td></tr>`;
  }
  html += '</table>';

  res.send(html);
});