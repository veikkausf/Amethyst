import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';

// Parametri-lista tälle komponentille
type RootStackParamList = {
  HoroscopeData: { itemId: string };
};

type HoroscopeDataRouteProp = RouteProp<RootStackParamList, 'HoroscopeData'>;

interface Props {
  route: HoroscopeDataRouteProp;
}

const HoroscopeData: React.FC<Props> = ({ route }) => {
  const { itemId } = route.params; // Tuotu ID

  return (
    <View style={styles.background}>
      <Text>{itemId}</Text>
    </View>
  );
};

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

export default HoroscopeData;
