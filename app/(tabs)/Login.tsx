import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Nappi from '@/components/Button';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/background.jpg')} // Relative path to the background image
      style={styles.background}
      resizeMode="cover" // Adjusts how the image is resized to fit the background (options: cover, contain, stretch, etc.)
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Nappi title="Login" onPress={() => navigation.navigate('Menu')} />
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#3F3154',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
