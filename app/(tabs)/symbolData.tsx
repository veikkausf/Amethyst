import React, { useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import Teksti from '@/components/Textbox';
import Loader from '@/components/loading';
// Parametri-lista tälle komponentille
type RootStackParamList = {
  SymbolData: { itemId: string; itemImage: any };
};

type SymbolDataRouteProp = RouteProp<RootStackParamList, 'SymbolData'>;

interface SymbolDataProps {
  route: SymbolDataRouteProp;
}

const SymbolData: React.FC<SymbolDataProps> = ({ route }) => {
  const { itemId } = route.params; // Tuotu ID propsina
  const { itemImage } = route.params;

  return (
    <View style={styles.background}>
      <Text style={styles.header}>{itemId}</Text>
      <Image source={itemImage} style={styles.image}></Image>
      <Teksti>
        <Text style={styles.header}>Symbol data</Text>
      </Teksti>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#3F3154',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#3F3154',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    marginHorizontal: 40,
  },
  date: {
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    marginHorizontal: 40,
    height: '20%',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 7,
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Kadwa_400Regular',
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  box: {
    margin: 15,
    bottom: 40,
  },
  image: {
    bottom: 75,
  },
});

export default SymbolData;
