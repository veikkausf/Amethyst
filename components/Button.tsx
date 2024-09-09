import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';

/*
Pääväri eli pohjan taustaväri tummanvioletti: #3F3154
Laatikoiden pohjaväri liila: #918998
Laatikon reunojen sävy vaalea liila: #ACA3AF
*/

// Tyyppi-määrittely (propsit)
interface NappiProps {
  title: string;
  onPress: () => void;
}

const Nappi: React.FC<NappiProps> = ({ title, onPress }) => {
  return (
    // Tyylit ja onPress event määritelty napille
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 35,
    backgroundColor: '#918998',
    paddingVertical: 20,
    paddingHorizontal: 30,
    textAlign: 'center',
    justifyContent: 'center',
    width: '250%',
    maxWidth: 300,
    height: 60,
  },
  text: {
    color: '#ffffff',
    fontSize: 35,
    fontFamily: 'Kadwa_400Regular',
    textAlign: 'center',
  },
});
export default Nappi;
