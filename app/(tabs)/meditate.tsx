import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MedButton from '@/components/MedButton';

type data = {
  id: string;
  image: any;
};

const mediData: data[] = [
  {
    id: 'Morning brew',
    image: require('../../assets/images/meditationpc.png'),
  },
  {
    id: 'Anxiety help',
    image: require('../../assets/images/meditationpc.png'),
  },
  {
    id: 'Better sleep',
    image: require('../../assets/images/meditationpc.png'),
  },
];

const natData: data[] = [
  { id: 'Nightfall', image: require('../../assets/images/meditationpc.png') },
  {
    id: 'Windy field',
    image: require('../../assets/images/meditationpc.png'),
  },
  {
    id: 'Fireplace',
    image: require('../../assets/images/meditationpc.png'),
  },
];

function Meditate({ navigation }: { navigation: any }) {
  return (
    <View style={styles.background}>
      <Text style={styles.header}>
        Select
        <Text style={styles.normalFont}> Your serenity</Text>
      </Text>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {mediData.map((item) => (
          <MedButton
            key={item.id} //Napin avain jokaiselle napille listasta
            title={item.id} //Napin otsikko teksti
            img={item.image} //Napin kuva
            onPress={
              () => navigation.navigate('MineralData', { itemId: item.id }) //Navigoidaan "MineralData" sivulle ja viedään sinne samalla ID parametrinä
            }
          />
        ))}
      </ScrollView>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {natData.map((item) => (
          <MedButton
            key={item.id} //Napin avain jokaiselle napille listasta
            title={item.id} //Napin otsikko teksti
            img={item.image} //Napin kuva
            onPress={
              () => navigation.navigate('MineralData', { itemId: item.id }) //Navigoidaan "MineralData" sivulle ja viedään sinne samalla ID parametrinä
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#3F3154',
    flex: 1,
  },

  header: {
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    marginHorizontal: 40,
    height: '20%',
  },
  normalFont: {
    fontFamily: 'Kadwa_400Regular',
  },
  box: { width: '40%' },
});
export default Meditate;
