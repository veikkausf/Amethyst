import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';

// Rajapintaluokka playerin propseille
interface AudioPlayerProps {
  audioFile: any;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioFile }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Ladataan ja soitetaan äänitiedosto
  const playSound = async () => {
    try {
      // Pause
      if (isPlaying && sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
        setStatusMessage('Paused');
        return;
      }

      if (!sound) {
        const { sound: newSound } = await Audio.Sound.createAsync(audioFile);
        setSound(newSound);
        setStatusMessage('Playing...');
        await newSound.playAsync();
        setIsPlaying(true);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
        setStatusMessage('Playing...');
      }
    } catch (error) {
      console.error('Error playing sound:', error);
      setStatusMessage('Error playing sound');
    }
  };

  // Async pois käytöstä ,kun komponentti on unMounted
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{statusMessage}</Text>
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={playSound} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  status: {
    marginBottom: 10,
    fontSize: 16,
  },
});

export default AudioPlayer;
