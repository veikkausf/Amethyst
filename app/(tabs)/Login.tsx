import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Nappi from '@/components/Button';

// Kirjautumisruutu, viimeistellään myöhemmin Firebasen kanssa (google kirjautuminen mahdollisesti jne.)

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/background.jpg')} // Taustakuva
      style={styles.background}
      resizeMode="cover"
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
