import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Teksti from '@/components/Textbox';

interface DiaryScreenProps {
  navigation: any;
}

const DreamDiary: React.FC<DiaryScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        <Text style={styles.headerbold}>Meaning</Text> of dreams
      </Text>
      <Text style={styles.text}>
        Things you see in your dreams often have a deeper meaning than you’d
        expect. Learn the most common symbolism and start being mindful about
        your dreams, and start writing your them down.
      </Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('DreamSymbols')}
        >
          <Teksti>
            <Text>Symbols</Text>
          </Teksti>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('DiaryList')}
        >
          <Teksti>
            <Text>Diary</Text>
          </Teksti>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3F3154',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20, // Add padding to avoid content being cut off on smaller screens
  },
  header: {
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'Kadwa_400Regular',
    textAlign: 'center', // Center-align text to fit better on screen
  },
  headerbold: {
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
  },
  text: {
    color: '#ffffff',
    fontSize: 20, // Reduced font size for better layout
    fontFamily: 'Kadwa_400Regular',
    textAlign: 'center',
    marginVertical: 20, // Adds spacing around the text
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'space-around', // Space buttons evenly
    width: '100%', // Full width to give the buttons more room
    paddingHorizontal: 20, // Padding on sides to avoid edges
  },
  button: { width: '45%' },
});

export default DreamDiary;
