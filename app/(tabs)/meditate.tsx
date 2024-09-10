import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Teksti from '@/components/Textbox';

const Meditate: React.FC = () => {
  return (
    <View style={styles.container}>
      <Teksti>
        <Text> Täällä Voit meditoida</Text>
      </Teksti>
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

export default Meditate;
