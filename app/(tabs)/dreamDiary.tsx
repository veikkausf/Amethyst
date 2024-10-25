import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import Nappi from '@/components/Button';

// Kirjautumisruutu, viimeistellään myöhemmin Firebasen kanssa (google kirjautuminen mahdollisesti jne.)

interface LoginScreenProps {
  navigation: any;
}

const DreamDiary: React.FC<LoginScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Riku on aasi</Text>
    </View>
  );
};

export default DreamDiary;
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#3F3154',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
