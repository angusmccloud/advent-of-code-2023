import { readFileSync } from 'fs';
const text = readFileSync('app/day4/data.txt', 'utf8');

export const calculate = (input) => {
  // With an array of rows, where a sample row looks like this: Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
  // First remove everything to the left of the ":"
  // Then split the string on the "|" character
  // Then for each of the two sides, create an array of numbers (removing spaces)

  const lotteryCards = input.map(row => {
    const card = row.split(':')[1];
    const cardNumber = parseInt(row.split(':')[0].replace('   ', ' ').replace('  ', ' ').split(' ')[1]);
    const sides = card.split('|');
    const winningNumbers = [];
    const ourNumbers = [];
    const winningNumbersSide = sides[0].split(' ');
    const ourNumbersSide = sides[1].split(' ');
    for (let i = 0; i < winningNumbersSide.length; i++) {
      const num = Number(winningNumbersSide[i]);
      if (num) {
        winningNumbers.push(num);
      }
    }
    for (let i = 0; i < ourNumbersSide.length; i++) {
      const num = Number(ourNumbersSide[i]);
      if (num) {
        ourNumbers.push(num);
      }
    }
    
    const numberThatMatch = ourNumbers.filter(num => winningNumbers.includes(num));

    return {
      cardNumber: cardNumber,
      numberOfThisCard: 1,
      // winningNumbers,
      // ourNumbers,
      numberThatMatch: numberThatMatch.length,
    };
  });

  for(let i = 0; i < lotteryCards.length; i++) {
    // Loop through each Lottery Card
    // On each card, look at the numberThatMatch, numberOfThisCard, and cardNumber
    // For example, if numberThatMatch is 3, then on the cards with cardNumber+1, cardNumber+2, and cardNumber+3, increment numberOfThisCard by the numberOfThisCard on the current card
    const currentCard = lotteryCards[i];
    const { numberThatMatch, cardNumber, numberOfThisCard } = currentCard;
    if (numberThatMatch > 0) {
      for (let j = 1; j <= numberThatMatch; j++) {
        const nextCard = lotteryCards.find(card => card.cardNumber === cardNumber + j);
        if (nextCard) {
          nextCard.numberOfThisCard += numberOfThisCard;
        }
      }
    }
  }

  console.log(lotteryCards);

  // Sum the numberOfThisCard
  const numberOfCards = lotteryCards.reduce((acc, card) => {
    return acc + card.numberOfThisCard;
  }, 0);

  return numberOfCards;
}

const fn = () => {
  const dt = text.split('\n');
  
  return calculate(dt);
}

export default fn;