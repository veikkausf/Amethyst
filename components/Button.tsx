import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
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

// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

// Tyyppi-määrittely (propsit)
interface NappiProps {
  title: string;
  onPress: () => void;
}

const Nappi: React.FC<NappiProps> = ({ title, onPress }) => {
  // Load the fonts
  let [fontsLoaded] = useFonts({
    Kadwa_400Regular,
    Kadwa_700Bold,
  });

  // Callback to hide splash screen once fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync(); // Hide the splash screen when fonts are loaded
    }
  }, [fontsLoaded]);

  // If fonts are not loaded, keep the splash screen visible
  if (!fontsLoaded) {
    return null; // Render nothing while fonts are loading (splash screen remains)
  }

  return (
    // Call onLayoutRootView to hide splash screen when the component is ready
    <Pressable
      style={styles.button}
      onPress={onPress}
      onLayout={onLayoutRootView}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

// Define your styles including the custom font
const styles = StyleSheet.create({
  button: {
    borderRadius: 35,
    backgroundColor: '#918998',
    width: 300,
    height: 70,
    marginTop: 600,
  },
  text: {
    color: '#ffffff',
    fontSize: 35,
    fontFamily: 'Kadwa_400Regular',
    textAlign: 'center',
  },
});
export default Nappi;
