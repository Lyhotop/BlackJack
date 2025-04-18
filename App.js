// App.js
import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Audio } from 'expo-av';

import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';

const Stack = createStackNavigator();

const App = () => {
  const musicRef = useRef(null);

  useEffect(() => {
    const playMusic = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
        });

        const { sound } = await Audio.Sound.createAsync(
          require('./assets/music/background-music.mp3'),
          { shouldPlay: true, isLooping: true, volume: 0.4 }
        );

        musicRef.current = sound;
        await sound.playAsync();
      } catch (error) {
        console.log('🎵 Error playing background music:', error);
      }
    };

    playMusic();

    return () => {
      if (musicRef.current) {
        musicRef.current.stopAsync();
        musicRef.current.unloadAsync();
      }
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2e7d32',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Local BlackJack" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
