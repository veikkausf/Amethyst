import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import Teksti from '@/components/Textbox';

// Parametri-lista tälle komponentille
type RootStackParamList = {
  MineralData: { itemId: string };
};

type MineralDataRouteProp = RouteProp<RootStackParamList, 'MineralData'>;

interface Props {
  route: MineralDataRouteProp;
}

const MineralData: React.FC<Props> = ({ route }) => {
  const { itemId } = route.params; //Mineraaleista tuotu ID

  return (
    <View style={styles.background}>
      <Image
        style={styles.image}
        source={require('../../assets/images/mineral_icon.png')}
      ></Image>
      <Text style={styles.header}>{itemId}</Text>
      <Text style={styles.headerLeft}>
        Shackra: <Text style={styles.normalFont}>Root and solar plexus</Text>
      </Text>
      <Text style={styles.headerRight}>
        Horoscope:
        <Text style={styles.normalFont}> Libra, Sagittarius, Capricorn </Text>
      </Text>
      <Teksti style={styles.box}>
        <Text></Text>
      </Teksti>
    </View>
  );
};
//Tyylit
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
    bottom: '2%',
  },
  headerLeft: {
    fontSize: 20,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    textAlign: 'left',
    right: 75,
    width: '50%',
    bottom: '8%',
  },
  headerRight: {
    fontSize: 20,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    textAlign: 'right',
    left: 60,
    width: '60%',
    bottom: '5%',
  },
  image: {
    height: '10%',
    width: '12%',
    bottom: '2%',
  },
  normalFont: {
    fontFamily: 'Kadwa_400Regular',
  },
  box: {
    margin: 15,
    width: '90%',
    height: '33%',
  },
});

export default MineralData;
