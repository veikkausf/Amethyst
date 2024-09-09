import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';

/*
Pääväri eli pohjan taustaväri tummanvioletti: #3F3154
Laatikoiden pohjaväri liila: #918998
Laatikon reunojen sävy vaalea liila: #ACA3AF
*/

interface NappiProps {
  title: string;
}

const Nappi: React.FC<NappiProps> = ({ title }) => {
  return (
    <Pressable style={styles.button} onPress={() => alert('Button Pressed!')}>
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
