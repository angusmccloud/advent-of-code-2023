import { readFileSync } from 'fs';
const text = readFileSync('app/day2/data.txt', 'utf8');

export const calculate = (input) => {
  const maxRed = 12;
  const maxGreen = 13;
  const maxBlue = 14;
  let gameIdSum = 0;
  for ( let i = 0; i < input.length; i++ ) {
    // Parse a string with the structure of: Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    // Grab the Game ID (Before the `:`), and each set of dice rolls between the `;`
    // For each game find the max number of red, green, and blue that shoe up in any roll
    // If *all* of those maximums are less-or-equal to the max values, then add the Game ID to the sum

    const game = input[i];
    const gameParts = game.split(':');
    const gameId = gameParts[0];
    const rolls = gameParts[1].split(';');
    let maxRedInGame = 0;
    let maxGreenInGame = 0;
    let maxBlueInGame = 0;
    
    for ( let j = 0; j < rolls.length; j++ ) {
      const roll = rolls[j];
      let dice = roll.split(',');
      let red = 0;
      let green = 0;
      let blue = 0;
      
      for ( let k = 0; k < dice.length; k++ ) {
        const die = dice[k].trim();
        // Split Die on the Space, use the first part as a parseInt for the number, 2nd part for the color
        const dieParts = die.split(' ');
        const dieNumber = parseInt(dieParts[0]);
        const dieColor = dieParts[1];

        if ( dieColor === 'red' ) {
          if ( dieNumber > red ) {
            red = dieNumber;
          }
        } else if ( dieColor === 'green' ) {
          if ( dieNumber > green ) {
            green = dieNumber;
          }
        } else if ( dieColor === 'blue' ) {
          if ( dieNumber > blue ) {
            blue = dieNumber;
          }
        }
      }
      
      if ( red > maxRedInGame ) {
        maxRedInGame = red;
      }
      if ( green > maxGreenInGame ) {
        maxGreenInGame = green;
      }
      if ( blue > maxBlueInGame ) {
        maxBlueInGame = blue;
      }
    }

    if ( maxRedInGame <= maxRed && maxGreenInGame <= maxGreen && maxBlueInGame <= maxBlue ) {
      // Split gameId by the space, parseInt on the 2nd part, and add it to the sum
      const gameIdParts = gameId.split(' ');
      const gameIdNumber = parseInt(gameIdParts[1]);
      gameIdSum += parseInt(gameIdNumber);
    }
  }
  return gameIdSum;
}

const fn = () => {
  const dt = text.split('\n');
  
  return calculate(dt);
}

export default fn;