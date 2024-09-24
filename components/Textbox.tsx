// Komponentti, jossa laatikko tekstejä varten

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

type TekstiProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const Teksti = ({ children, style }: TekstiProps) => {
  return <View style={[styles.box, style]}>{children}</View>;
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

export default Teksti;
