import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import Nappi from '@/components/Button';
import BirthdayModal from '@/components/DatePicker';
import GuestBirthdayModal from '@/components/BirthdayModal'; // Import the new modal

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showModal, setShowModal] = useState(false); // Show Birthday Modal
  const [showGuestModal, setShowGuestModal] = useState(false); // Show GuestBirthdayModal

  const signInWithGoogle = async () => {
    // Implement Google Sign-In if needed
    console.log('Google Sign-In method should be implemented here');
  };

  const handleSubmitBirthday = (birthday: { day: number; month: number }) => {
    setShowModal(false); // Close Birthday Modal
    navigation.navigate('Menu', { userBirthday: birthday });
  };

  const handleGuestBirthdaySubmit = () => {
    setShowGuestModal(false); // Close GuestBirthdayModal
    setShowModal(true); // Show BirthdayModal
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
            <Nappi
              title="Continue as a guest"
              onPress={() => setShowGuestModal(true)}
            />
          </>
        )}
      </View>

      {/* Render GuestBirthdayModal and BirthdayModal */}
      {showGuestModal && (
        <GuestBirthdayModal
          isVisible={showGuestModal}
          onClose={() => setShowGuestModal(false)}
          onSubmit={handleGuestBirthdaySubmit}
        />
      )}

      {showModal && (
        <BirthdayModal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmitBirthday}
        />
      )}
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
