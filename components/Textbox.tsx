import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

type TekstiProps = {
  children: React.ReactNode;
  style?: ViewStyle; // Allow custom styles to be passed in
};

const Teksti = ({ children, style }: TekstiProps) => {
  return <View style={[styles.box, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  box: {
    padding: 20, // Default padding
    borderWidth: 2, // Default border width
    borderColor: '#ACA3AF', // Default border color
    borderRadius: 10, // Default rounded corners
    backgroundColor: '#918998', // Default background color
    alignItems: 'center', // Center the content horizontally
  },
});

export default Teksti;
