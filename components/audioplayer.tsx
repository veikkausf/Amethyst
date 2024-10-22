import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { Slider } from '@react-native-assets/slider';

interface AudioPlayerProps {
  audioFile: any;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioFile }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [positionMillis, setPositionMillis] = useState<number>(0); // Current position
  const [durationMillis, setDurationMillis] = useState<number>(0); // Total duration

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
        const { sound: newSound, status } = await Audio.Sound.createAsync(
          audioFile,
          {
            shouldPlay: true, // Soitetaan alusta automaattisesti
          }
        );
        setSound(newSound);
        // Status testi
        setStatusMessage('Playing...');

        if (status.isLoaded) {
          setDurationMillis(status.durationMillis || 0); // "Setataan ääniraidan pituus tai kesto"
        }

        setIsPlaying(true);

        // Subscribataan toiston status päivitykset
        newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
        setStatusMessage('Playing...');
      }
    } catch (error) {
      console.error('Error playing sound:', error);
      // Status testi
      setStatusMessage('Error playing sound');
    }
  };

  // Päivitetään playbackin eli toiston status
  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setPositionMillis(status.positionMillis); // Päivitetään nykinen ääniraidan position
      setDurationMillis(status.durationMillis || 0);
    } else {
      // Error, jos ääntä ei saada ladattua tai muuta vastaavaa
      setStatusMessage('Error loading audio');
    }
  };

  // Kun käytetään slideria muutetaan arvo millisekunneiksi
  const handleSeek = async (value: number) => {
    if (sound && durationMillis) {
      try {
        const seekPosition = Math.floor(value * durationMillis); // Convert slider value to millis
        await sound.setPositionAsync(seekPosition); // Wait for seeking to finish
        setPositionMillis(seekPosition); // Update state to reflect the new position
      } catch (error) {
        console.error('Error seeking audio position:', error);
      }
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

  // muutetaan millsekiunnit minuutteiksi ja sekunneiksi
  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setPositionMillis(status.positionMillis);
        }
      }
    }, 500); // Päivitetään joka 500ms

    return () => clearInterval(interval);
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{statusMessage}</Text>

      <Pressable onPress={playSound}>
        <Image
          source={
            isPlaying
              ? require('../assets/images/pause_icon.png')
              : require('../assets/images/play_icon.png')
          }
          style={{ width: 50, height: 50 }}
        />
      </Pressable>
      <Slider
        style={{ width: 300, height: 40 }}
        slideOnTap={true}
        minimumValue={0}
        maximumValue={1}
        value={durationMillis ? positionMillis / durationMillis : 0} // Aika
        onSlidingComplete={handleSeek} // Etsi kohta, kun käyttäjä päästää irti sliderista
        minimumTrackTintColor={'#ACA3AF'}
        maximumTrackTintColor={'#B88EEE'}
        thumbTintColor={'white'}
        // thumbImage={require('../assets/images/slider_icon.png')}
        thumbSize={20}
        trackHeight={10}
      />
      {/* Näytetää nykyinen aika */}
      <Text style={styles.time}>{`${formatTime(positionMillis)} / ${formatTime(
        durationMillis
      )}`}</Text>
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
  time: {
    color: 'white',
    fontSize: 20,
  },
});

export default AudioPlayer;
