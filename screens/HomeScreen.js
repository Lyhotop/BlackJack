// HomeScreen.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Button from '../components/Button'; 

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Button text="Start" onPress={() => navigation.navigate('Local BlackJack')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2e7d32'
  },
});

export default HomeScreen;
