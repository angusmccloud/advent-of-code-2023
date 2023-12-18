import { readFileSync } from 'fs';
const text = readFileSync('app/day8/data.txt', 'utf8');

export const calculate = (input) => {
  // Grab all instrcutions in the first line of the input
  const instructions = input[0].split('');
  // console.log(instructions);
  // For lines 3 and on, grab the position and directions
  // Formatted as: TJF = (TXF, NGK)
  // Store as: { position: 'TJF', left: 'TXF', right: 'NGK' }
  const positions = input.slice(2).map((line) => {
    const [position, directions] = line.split(' = ');
    const [left, right] = directions.split(', ');
    return { position, left: left.replace('(', ''), right: right.replace(')', '') };
  });
  // console.log(positions);
  
  let numberOfMoves = 0;
  let foundZZZ = false;
  let position = 'AAA'
  while (!foundZZZ) {
    // Find in instruction at position numberOfMoves
    // Noting that there may be more moves that total instructions and you need to loop around
    const instruction = instructions[numberOfMoves % instructions.length];
    console.log('instruction', instruction);
    // Find the position in the positions array
    const positionData = positions.find((pos) => pos.position === position);
    console.log('positionData', positionData);
    let newPosition = instruction === 'R' ? positionData.right : positionData.left;
    console.log('newPosition', newPosition);
    if(newPosition === 'ZZZ') {
      foundZZZ = true;
      numberOfMoves++;
    } else {
      position = newPosition;
      numberOfMoves++;
    }
  }

  return numberOfMoves;
}

const fn = () => {
  const dt = text.split('\n');
  
  return calculate(dt);
}

export default fn;