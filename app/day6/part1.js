import { readFileSync } from 'fs';
const text = readFileSync('app/day6/data.txt', 'utf8');

export const calculate = (input) => {
  // We have to lines to input, each with a string up front then numbers separated by one-or-more space. Ex:
  // Time:      7  15   30
  // Distance:  9  40  200
  // We want to parse this into an array of objects, where each object has a time and distance property. Ex:
  // [
  //   {time: 7, distance: 9},
  //   {time: 15, distance: 40},
  //   {time: 30, distance: 200},
  // ]
  const timeArray = [];
  const distanceArray = [];
  let timesLineTimes = input[0].split(': ')[1];
  let distancesLineDistances = input[1].split(': ')[1];
  for(let i = 0; i < 20; i++) {
    timesLineTimes = timesLineTimes.replace('  ', ' ');
    distancesLineDistances = distancesLineDistances.replace('  ', ' ');
  }
  const timesLineTimesSplit = timesLineTimes.split(' ');
  const distancesLineDistancesSplit = distancesLineDistances.split(' ');
  timesLineTimesSplit.forEach((time) => {
    if(time !== '') {
      timeArray.push(parseInt(time));
    }
  });
  distancesLineDistancesSplit.forEach((distance) => {
    if(distance !== '') {
      distanceArray.push(parseInt(distance));
    }
  });
  const timeDistanceArray = [];
  for(let i = 0; i < timeArray.length; i++) {
      timeDistanceArray.push({
        time: timeArray[i],
        distance: distanceArray[i],
        waysToWin: 0,
      });
  }

  let answer = 1;
  // We have input, let's do math..
  for(let i = 0; i < timeDistanceArray.length; i++) {
    const race = timeDistanceArray[i];
    const { time, distance } = race;
    let waysToWin = 0;
    for(let i = 1; i < time; i++) {
      const speed = i;
      const traveledDistance = (time - i) * speed;
      if(traveledDistance > distance) {
        waysToWin++;
      }
    }
    race.waysToWin = waysToWin;
    answer *= waysToWin;
  }

  // console.log(timeDistanceArray);


  return answer;
}

const fn = () => {
  const dt = text.split('\n');
  
  return calculate(dt);
}

export default fn;