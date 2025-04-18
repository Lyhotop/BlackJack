
import { cards } from './cards';


export const shuffleDeck = () => {
  let shuffledDeck = [...cards];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
};


export const dealCard = (deck) => {
  return deck.pop();
};

export const calculateHandValue = (hand) => {
  let totalValue = 0;
  let aceCount = 0;

  hand.forEach(card => {
    totalValue += card.value;
    if (card.rank === 'A') aceCount += 1;
  });

  while (totalValue > 21 && aceCount > 0) {
    totalValue -= 10;
    aceCount -= 1;
  }

  return totalValue;
};


export const checkWinner = (playerValue, dealerValue) => {
  if (playerValue > 21) return 'Dealer wins! (Player busted)';
  if (dealerValue > 21) return 'Player wins! (Dealer busted)';
  if (playerValue > dealerValue) return 'Player wins!';
  if (dealerValue > playerValue) return 'Dealer wins!';
  return "It's a tie!";
};
