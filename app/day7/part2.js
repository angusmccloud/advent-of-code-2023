import { readFileSync } from 'fs';
const text = readFileSync('app/day7/data.txt', 'utf8');

const cardValues = [
  { value: 'A', rank: 1, iteratable: true },
  { value: 'K', rank: 2, iteratable: true },
  { value: 'Q', rank: 3, iteratable: true },
  { value: 'T', rank: 4, iteratable: true },
  { value: '9', rank: 5, iteratable: true },
  { value: '8', rank: 6, iteratable: true },
  { value: '7', rank: 7, iteratable: true },
  { value: '6', rank: 8, iteratable: true },
  { value: '5', rank: 9, iteratable: true },
  { value: '4', rank: 10, iteratable: true },
  { value: '3', rank: 11, iteratable: true },
  { value: '2', rank: 12, iteratable: true },
  { value: 'J', rank: 13, iteratable: false },
];

function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}

const getHandRank = (hand) => {
  const sortedHand = hand.split('').sort((a, b) => cardValues.find((value) => value.value === a).rank - cardValues.find((value) => value.value === b).rank).join('');
  // console.log(hand, sortedHand);
  const handCards = sortedHand.split('');
  let handRank = 7; // Default if no pattern matches
  const card1 = handCards[0];
  const card2 = handCards[1];
  const card3 = handCards[2];
  const card4 = handCards[3];
  const card5 = handCards[4];
  if(card1 === card2 && card2 === card3 && card3 === card4 && card4 === card5) {
    // 5 of a kind
    handRank = 1;
  } else if ((card1 === card2 && card2 === card3 && card3 === card4) || (card2 === card3 && card3 === card4 && card4 == card5) ) {
    // 4 of a kind
    handRank = 2;
  } else if ((card1 === card2 && card2 === card3 && card4 === card5) || (card1 === card2 && card3 === card4 && card4 === card5)) {
    // Full House
    handRank = 3;
  } else if ((card1 === card2 && card2 === card3) || (card2 === card3 && card3 === card4) || (card3 === card4 && card4 === card5)) {
    // 3 of a kind
    handRank = 4;
  } else if ((card1 === card2 && card3 === card4) || (card1 === card2 && card4 === card5) || (card2 === card3 && card4 === card5)) {
    // 2 pair
    handRank = 5;
  } else if (card1 === card2 || card2 === card3 || card3 === card4 || card4 === card5) {
    // 1 pair
    handRank = 6;
  }

  return handRank;
}

export const calculate = (input) => {
  // Each line on the input consists of a hand and a bet. They look like: 32T3K 765
  // Create an array of all hands, their bet, the rank of the hand, and the rank of each ard in the hand (from left to right)

  const handsWithRanks = input.map((line) => {
    const [hand, bet] = line.split(' ');
    
    const cardRanks = hand.split('').map((card) => cardValues.find((value) => value.value === card).rank);
    let bestRank = 7;
    for(let i = 0; i < 12; i++) {
      const cardValue = cardValues[i].value;
      const newHand = replaceAll(hand, 'J', cardValue);
      const newHandRank = getHandRank(newHand);
      if(newHandRank < bestRank) {
        bestRank = newHandRank;
      }
    }
    
    return { hand, bet: parseInt(bet), handRank: bestRank, cardRanks };
  });

  // console.log('-- handsWithRanks --', handsWithRanks)
  // Sort the hands by their rank (ASC) then by the rank of the cards in the hand (from left to right)
  const sortedHands = handsWithRanks.sort((a, b) => {
    if (a.handRank === b.handRank) {
      // First check the 1st card, if they're the same check the 2nd, then the 3rd, 4th, and 5th
      for (let i = 0; i < 5; i++) {
        if (a.cardRanks[i] !== b.cardRanks[i]) {
          return a.cardRanks[i] - b.cardRanks[i];
        }
      }
    }
    return a.handRank - b.handRank;
  });
  // console.log('-- Sorted Hands --');
  // sortedHands.forEach((hand) => console.log(hand.sortedHand, hand.handRank, hand.cardRanks));

  
  const numberOfHands = sortedHands.length;
  let dollars = 0;
  for(let i = 0; i < numberOfHands; i++) {
    const hand = sortedHands[i];
    const bet = hand.bet;
    dollars += (bet * (numberOfHands - i));
    // console.log('-- bet, i --', bet, i, bet * (numberOfHands - i));
  }

  


  return dollars;
}

const fn = () => {
  const dt = text.split('\n');
  
  return calculate(dt);
}

export default fn;

// Wrong (too low): 252729171
// Wrong (I thought too low, maybe not); 253137358
// Wrong (too high); 254975271