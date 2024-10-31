import React from 'react';
import { View, StyleSheet, ImageBackground, Alert } from 'react-native';
import Nappi from '@/components/Button';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '946110492595-2boqsje3qba3aoj6uo3npvsooj8rrfp0.apps.googleusercontent.com',
});

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  // Function to handle Google Sign-In
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);
      navigation.navigate('Menu');
    } catch (error: unknown) {
      // Explicitly declare error as `unknown`
      // Narrow down the type of `error` using type guards
      if (error instanceof Error) {
        if ((error as any).code === statusCodes.SIGN_IN_CANCELLED) {
          Alert.alert('Sign-In Cancelled', 'User cancelled the sign-in.');
        } else if ((error as any).code === statusCodes.IN_PROGRESS) {
          Alert.alert(
            'Sign-In in Progress',
            'Sign-In is currently in progress.'
          );
        } else if (
          (error as any).code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
        ) {
          Alert.alert(
            'Play Services Not Available',
            'Google Play Services is required.'
          );
        } else {
          Alert.alert('Sign-In Error', 'An error occurred during sign-in.');
          console.error('Google Sign-In Error:', error.message);
        }
      } else {
        console.error('Unknown error:', error);
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Nappi title="Login with Google" onPress={signInWithGoogle} />
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
