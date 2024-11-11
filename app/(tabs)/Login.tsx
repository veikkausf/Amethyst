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
  //forceCodeForRefreshToken: true,
  scopes: [
    'profile',
    'email',
    'openid',
    'https://www.googleapis.com/auth/user.birthday.read',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
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

      if (userInfo.data) {
        const { idToken, user } = userInfo.data;

        // Proceed with Firebase Authentication using idToken
        if (idToken) {
          // Import GoogleAuthProvider from Firebase auth
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);

          const userCredential = await auth().signInWithCredential(
            googleCredential
          );
          const firebaseUser = userCredential.user;

          console.log('User signed in with Firebase:', firebaseUser);

          // Get access token using GoogleSignin.getTokens() method
          const { accessToken } = await GoogleSignin.getTokens(); // Retrieve the access token

          let userBirthday = null; // Default value for userBirthday

          if (accessToken) {
            // Fetch user's birthday using the People API with the access token
            const response = await fetch(
              `https://people.googleapis.com/v1/people/me?personFields=birthdays`,
              {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${accessToken}`, // Use the access token here
                },
              }
            );

            const data = await response.json();
            console.log('Full People API Response:', data);

            if (data && data.birthdays && data.birthdays.length > 0) {
              const birthday = data.birthdays[0].date;
              console.log('User Birthday:', birthday);
              userBirthday = birthday;
            } else {
              console.log(
                'Birthday is not available or not found in the response.'
              );
            }
          } else {
            console.log('Access token is not available.');
          }
          console.log('Syntymäpäivä', userBirthday);
          const givenName = user.givenName || 'Guest';

          // Now navigate to Menu screen and pass the userBirthday
          navigation.navigate('Menu', { givenName, userBirthday });
        } else {
          console.error('idToken is not available:', userInfo);
          Alert.alert('Sign-In Error', 'No valid idToken returned.');
        }
      } else {
        console.error('userInfo.data is null:', userInfo);
        Alert.alert('Sign-In Error', 'No valid user information returned.');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
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
    marginBottom: '40%',
  },
});

export default LoginScreen;
