import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';

interface GuestBirthdayModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: () => void; // Trigger when the user presses "OK"
}

const GuestBirthdayModal: React.FC<GuestBirthdayModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
}) => {
  return isVisible ? (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        {/* Custom Pressable button */}
        <Pressable
          onPress={() => {
            onSubmit();
            onClose();
          }}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#7a6f6f' : '#918998' }, // Change color on press
          ]}
        >
          <Text style={styles.text}>OK</Text>
        </Pressable>
        <SafeAreaView>
          <Text style={styles.title}>
            Please tell us your birthday, so that we can inform you about your
            own horoscope!
          </Text>
        </SafeAreaView>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontFamily: 'Kadwa_400Regular',
    textAlign: 'center',
    fontSize: RFValue(10, 412), // Responsiivinen fontti
    marginBottom: 10,
    flex: 1,
  },
  button: {
    borderRadius: 35, // Rounded corners as in your desired style
    width: 300, // Button width
    height: 70, // Button height
    justifyContent: 'center',
    alignItems: 'center', // Center the text inside the button
  },
  text: {
    color: '#ffffff', // Text color
    fontSize: 25, // Font size for button text
    fontFamily: 'Kadwa_400Regular',
    textAlign: 'center', // Center the text horizontally
    flexWrap: 'wrap',
  },
});

export default GuestBirthdayModal;
