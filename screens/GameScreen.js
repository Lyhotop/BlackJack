import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { shuffleDeck, dealCard, calculateHandValue, checkWinner } from '../gameLogic';
import Card from '../components/Card';
import Button from '../components/Button';

const GameScreen = () => {
  const [deck, setDeck] = useState(shuffleDeck());
  const [playerHand, setPlayerHand] = useState([dealCard(deck), dealCard(deck)]);
  const [dealerHand, setDealerHand] = useState([dealCard(deck), dealCard(deck)]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);

  const getCardValue = (card) => {
    if (!card) return 0;
    if (card.rank === 'A') return 11;
    return card.value;
  };

  const firstDealerCardValue = getCardValue(dealerHand[0]);

  const hit = () => {
    const newCard = dealCard(deck);
    const newHand = [...playerHand, newCard];
    setPlayerHand(newHand);

    if (calculateHandValue(newHand) > 21) {
      setGameOver(true);
      setMessage('Player busted!');
    }
  };

  const stand = () => {
    let dealerCards = [...dealerHand];
    while (calculateHandValue(dealerCards) < 17) {
      dealerCards.push(dealCard(deck)); 
    }
    setDealerHand(dealerCards);
  
    setGameOver(true);
    setMessage(checkWinner(playerValue, calculateHandValue(dealerCards)));
  };

  const restartGame = () => {
    setDeck(shuffleDeck());
    setPlayerHand([dealCard(deck), dealCard(deck)]);
    setDealerHand([dealCard(deck), dealCard(deck)]);
    setGameOver(false);
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
    
      <View style={styles.dealerContainer}>
        <Card suit={dealerHand[0].suit} rank={dealerHand[0].rank} />

       
        {gameOver && dealerHand.slice(1).map((card, index) => (
          <Card key={index + 1} suit={card.suit} rank={card.rank} />
        ))}

       
        {!gameOver && (
          <View style={styles.deckStack}>
            {[0, 1, 2].map((_, index) => (
              <View key={index} style={[styles.deckCard, { right: index * 5 }]}>
                <Card isFaceDown />
              </View>
            ))}
          </View>
        )}
      </View>

      
      <View style={styles.playerContainer}>
        {playerHand.map((card, index) => (
          <Card key={index} suit={card.suit} rank={card.rank} />
        ))}
      </View>

     
      <Text style={styles.dealerScore}>
        Dealer's: {gameOver ? dealerValue : firstDealerCardValue}
      </Text>
      <Text style={styles.playerScore}>Your: {playerValue}</Text>

     
      {gameOver && (
        <View style={styles.overlay}>
          <Text style={styles.resultText}>{message}</Text>
          <Button text="Restart" onPress={restartGame} buttonColor="#4CAF50" textColor="#fff" />
        </View>
      )}

   
      {!gameOver && (
        <View style={styles.buttonsContainer}>
          <Button text="Hit" onPress={hit} buttonColor="#4CAF50" textColor="#fff" />
          <Button text="Stand" onPress={stand} buttonColor="#FF5733" textColor="#fff" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2e7d32',
  },
  dealerContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
  },
  playerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  deckStack: {
    width: 90,
    height: 110,
    position: 'relative',
    marginLeft: -5,
  },
  deckCard: {
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    justifyContent: 'space-between',
    width: '80%',
  },
  dealerScore: {
    position: 'absolute',
    top: 10,
    left: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  playerScore: {
    position: 'absolute',
    top: 10,
    right: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default GameScreen;
