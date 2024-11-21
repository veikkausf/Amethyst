import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Pressable, Text, View, StatusBar } from 'react-native';
import {
  useFonts,
  Kadwa_400Regular,
  Kadwa_700Bold,
} from '@expo-google-fonts/kadwa';
import * as SplashScreen from 'expo-splash-screen';

/*
Pääväri eli pohjan taustaväri tummanvioletti: #3F3154
Laatikoiden pohjaväri liila: #918998
Laatikon reunojen sävy vaalea liila: #ACA3AF
*/

SplashScreen.preventAutoHideAsync();

// Tyyppi-määrittely (propsit)
interface NappiProps {
  title: string;
  onPress: () => void;
}

const Nappi: React.FC<NappiProps> = ({ title, onPress }) => {
  // Ladataan custom-fontit
  StatusBar.setBarStyle('light-content');
  StatusBar.setBackgroundColor('#3F3154');
  let [fontsLoaded] = useFonts({
    Kadwa_400Regular,
    Kadwa_700Bold,
  });

  // Splash screen piilotetaan, kun fontit ovat ladattu
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  //
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
      onLayout={onLayoutRootView}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

// Tyylittelyt
const styles = StyleSheet.create({
  button: {
    borderRadius: 35,
    backgroundColor: '#918998',
    width: 300,
    height: 70,
    top: '35%',
    marginBottom: 10,
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 25,
    fontFamily: 'Kadwa_400Regular',
    textAlign: 'center',
    alignContent: 'center',
  },
});
export default Nappi;
