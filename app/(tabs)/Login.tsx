import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Nappi from '@/components/Button';
import {
  GoogleSignin,
  statusCodes,
  SignInResponse,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId:
    '946110492595-2boqsje3qba3aoj6uo3npvsooj8rrfp0.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [isSigningIn, setIsSigningIn] = useState(false); // State to manage loading

  const signInWithGoogle = async () => {
    if (isSigningIn) return; // Prevent multiple sign-in attempts
    setIsSigningIn(true); // Set loading state to true

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo: SignInResponse = await GoogleSignin.signIn();

      console.log('User Info:', userInfo);

      if (userInfo.data) {
        const { idToken, user } = userInfo.data;

        if (idToken) {
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          const userCredential = await auth().signInWithCredential(
            googleCredential
          );
          const firebaseUser = userCredential.user;

          console.log('User signed in with Firebase:', firebaseUser);

          const givenName = user.givenName || 'Guest';

          navigation.navigate('Menu', { givenName });
        } else {
          console.error('idToken is not available:', userInfo);
          Alert.alert('Sign-In Error', 'No valid idToken returned.');
        }
      } else {
        console.error('userInfo.data is null:', userInfo);
        Alert.alert('Sign-In Error', 'No valid user information returned.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        switch ((error as any).code) {
          case statusCodes.SIGN_IN_CANCELLED:
            Alert.alert('Sign-In Cancelled', 'User cancelled the sign-in.');
            break;
          case statusCodes.IN_PROGRESS:
            Alert.alert(
              'Sign-In in Progress',
              'Sign-In is currently in progress.'
            );
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert(
              'Play Services Not Available',
              'Google Play Services is required.'
            );
            break;
          default:
            Alert.alert('Sign-In Error', 'An error occurred during sign-in.');
            console.error('Google Sign-In Error:', error.message);
        }
      } else {
        console.error('Unknown error:', error);
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    } finally {
      setIsSigningIn(false); // Reset loading state
    }
  };

  const navigateAsGuest = () => {
    const givenName = 'Guest';
    navigation.navigate('Menu', { givenName });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Ensure StatusBar is applied globally */}
      <View style={styles.container}>
        {isSigningIn ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <>
            <Nappi title="Login with Google" onPress={signInWithGoogle} />
            <Nappi title="Continue as a guest" onPress={navigateAsGuest} />
          </>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
