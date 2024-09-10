import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Teksti from '@/components/Textbox';

const Minerals: React.FC = () => {
  return (
    <View style={styles.container}>
      <Teksti>
        <Text style={styles.regularText}>
          Täällä on mineraaleja kadwa regular
        </Text>
        <Text style={styles.boldText}>Täällä on mineraaleja kadwa bold</Text>
        <Text>Täällä on mineraaleja normaali</Text>
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
  regularText: {
    fontFamily: 'Kadwa-Regular',
    fontSize: 20,
    fontWeight: 'normal',
  },
  boldText: {
    fontFamily: 'Kadwa-Bold',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default Minerals;
