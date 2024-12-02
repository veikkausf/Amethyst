import React from 'react';
import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
import Teksti from '@/components/Textbox';
import ResponsiveText from '@/components/ResponsiveText';

interface DiaryScreenProps {
  navigation: any;
}

const DreamDiary: React.FC<DiaryScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/mineral_icon.png')}
        style={styles.image}
      ></Image>
      <Text style={styles.header}>
        <Text style={styles.headerbold}>Meaning</Text> of dreams
      </Text>
      <ResponsiveText fontSize={20} style={styles.text}>
        Things you see in your dreams often have a deeper meaning than you’d
        expect. Learn the most common symbolism and start being mindful about
        your dreams, and start writing them down.
      </ResponsiveText>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('DreamSymbols')}
        >
          <Teksti>
            <ResponsiveText fontSize={18} style={styles.buttontext}>
              Symbols
            </ResponsiveText>
            <Image
              source={require('../../assets/images/moon.png')}
              style={styles.image}
            ></Image>
          </Teksti>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('diaryPrevious')}
        >
          <Teksti>
            <ResponsiveText fontSize={18} style={styles.buttontext}>
              Diary
            </ResponsiveText>
            <Image
              source={require('../../assets/images/book.png')}
              style={styles.imagebook}
            ></Image>
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
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  imagebook: {
    width: '140%',
    height: 100,
    resizeMode: 'cover',
  },
  header: {
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'Kadwa_400Regular',
    textAlign: 'center', // Center-align text to fit better on screen
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  headerbold: {
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
  },
  text: {
    color: '#ffffff',
    fontFamily: 'Kadwa_400Regular',
    textAlign: 'center',
    marginVertical: 20, // Adds spacing around the text
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  buttontext: {
    color: '#ffffff',
    fontFamily: 'Kadwa_400Regular',
    textAlign: 'center',
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
