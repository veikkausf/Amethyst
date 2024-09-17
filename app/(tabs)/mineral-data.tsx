import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';

// Parametri-lista tälle komponentille
type RootStackParamList = {
  MineralData: { itemId: string };
};

type MineralDataRouteProp = RouteProp<RootStackParamList, 'MineralData'>;

interface Props {
  route: MineralDataRouteProp;
}

const MineralData: React.FC<Props> = ({ route }) => {
  const { itemId } = route.params; // Tuotu ID

  return (
    <View style={styles.background}>
      <Image
        style={styles.image}
        source={require('../../assets/images/mineral_icon.png')}
      ></Image>
      <Text style={styles.header}>{itemId}</Text>
      <Text style={styles.headerLeft}>Shackra: sajajajajajajajja</Text>
      <Text style={styles.headerRight}>
        Horoscope:
        <Text style={styles.normalFont}> Libra, Sagittarius, Capricorn </Text>
      </Text>
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
  header: {
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    marginHorizontal: 40,
    height: '20%',
  },
  headerLeft: {
    fontSize: 20,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',

    height: '20%',
  },
  headerRight: {
    fontSize: 20,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    textAlign: 'right',
    left: 60,
    width: '60%',
  },
  image: {
    height: '10%',
    width: '10%',
  },
  normalFont: {
    fontFamily: 'Kadwa_400Regular',
  },
});

export default MineralData;
