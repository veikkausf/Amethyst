// Komponentti, jossa animoitu laatikko tekstejä varten

import * as Animatable from 'react-native-animatable';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

type TekstiProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  animation?: string; // Animation prop for custom animations
  duration?: number; // Optional duration prop
  delay?: number; // Optional delay prop
};

const AnimoituTeksti = ({
  children,
  style,
  animation = 'fadeIn',
  duration = 3000,
  delay = 0,
}: TekstiProps) => {
  return (
    <Animatable.View
      animation={animation} // Set animation type (default is fadeIn)
      duration={duration} // Set animation duration
      delay={delay} // Set animation delay
      style={[styles.box, style]} // Apply styles
    >
      {children}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 20,
    borderWidth: 3,
    borderColor: '#ACA3AF',
    borderRadius: 10,
    backgroundColor: 'rgba(145, 137, 152, 0.4)',
    alignItems: 'center',
  },
});

export default AnimoituTeksti;
