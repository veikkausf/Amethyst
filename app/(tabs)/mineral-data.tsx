import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';

// Define the param list for the MineralData screen
type RootStackParamList = {
  MineralData: { itemId: string };
};

type MineralDataRouteProp = RouteProp<RootStackParamList, 'MineralData'>;

interface Props {
  route: MineralDataRouteProp;
}

const MineralData: React.FC<Props> = ({ route }) => {
  const { itemId } = route.params; // Access the passed itemId

  return (
    <View style={styles.background}>
      <Text>Mineral ID: {itemId}</Text>
    </View>
  );
};

export default MineralData;

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
