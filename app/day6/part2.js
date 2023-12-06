import { readFileSync } from 'fs';
const text = readFileSync('app/day6/data.txt', 'utf8');

export const calculate = (input) => {
  const time = parseInt(input[0].split(': ')[1].replace(/ /g, ""));
  const distance = parseInt(input[1].split(': ')[1].replace(/ /g, ""));
  // console.log('-- Total Time and Distance --', time, distance)

  let waysToWin = 0;
  let hasHadWinners = false;
// We have input, let's do math..
  for(let i = 1; i < time; i++) {
    const speed = i;
    const traveledDistance = BigInt((time - i) * speed);
    if(traveledDistance > distance) {
      waysToWin++;
      // if(!hasHadWinners) {
      //   console.log('-- First Winner at --', i);
      // }
      hasHadWinners = true;
    } else if(hasHadWinners) {
      // console.log('-- Breaking the Loop at --', i);
      // You can onnly win in a middle rung of things...
      break;
    }
  }

  return waysToWin;
}

const fn = () => {
  const dt = text.split('\n');
  
  return calculate(dt);
}

export default fn;