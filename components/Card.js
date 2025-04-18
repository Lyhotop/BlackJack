// Card.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ suit, rank, backgroundColor = 'white', isFaceDown = false }) => {
  if (isFaceDown) {
    return <View style={styles.backCard} />;
  }

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <Text style={styles.rank}>{rank}</Text>
      <Text style={styles.suit}>{suit}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 70,
    height: 100,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backCard: {
    width: 70,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#bbb', 
    margin: 5,
    borderWidth: 1,
    borderColor: '#333',
  },
  rank: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  suit: {
    fontSize: 30,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default Card;
