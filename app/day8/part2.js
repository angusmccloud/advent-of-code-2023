import { readFileSync } from 'fs';
const text = readFileSync('app/day8/data.txt', 'utf8');

// Find 5 Lengths for Given Starting Position
const findLengths = (startingPosition, instructions, positions, numberOfPositionsToFind = 5) => {
  const lengths = [];
  let numberOfMoves = 0;
  let position = startingPosition;
  let foundAllZ = false;
  while (!foundAllZ) {
    // Find in instruction at position numberOfMoves
    // Noting that there may be more moves that total instructions and you need to loop around
    const instruction = instructions[numberOfMoves % instructions.length];
    const positionData = positions.find((pos) => pos.position === position);
    const newPosition = instruction === 'R' ? positionData.right : positionData.left;
    position = newPosition;
    numberOfMoves++;
    // Check if the new position ends with the character Z
    const checkZ = newPosition.endsWith('Z');
    if(checkZ) {
      lengths.push(numberOfMoves);
    }
    // Check to see if we've found all the positions we need
    if(lengths.length === numberOfPositionsToFind) {
      foundAllZ = true;
    }

  }
  return lengths;
}

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
  
  // Find all starting positions, whih is positions that end with the character A
  // Only return the Position, don't need other fields
  const startingPositions = positions.filter((pos) => pos.position.endsWith('A')).map((pos) => pos.position);
  // console.log(startingPositions);

  const lengthsForStartingPositions = [];
  for(let i = 0; i < startingPositions.length; i++) {
    const startingPosition = startingPositions[i];
    const lengths = findLengths(startingPosition, instructions, positions, 1);
    for(let ii = 0; ii < lengths.length; ii++) {
      lengthsForStartingPositions.push(lengths[ii]);
    }
  }
  console.log(lengthsForStartingPositions)
  // Find the least-common-multiple of the lengths
  const lcm = lengthsForStartingPositions.reduce((acc, val) => {
    return acc * val;
  }, 1);
  console.log(lcm);

  return lcm;
}

const fn = () => {
  const dt = text.split('\n');
  
  return calculate(dt);
}

export default fn;