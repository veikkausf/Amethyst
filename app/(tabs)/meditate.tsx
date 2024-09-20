import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Teksti from '@/components/Textbox';
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
        <Text style={styles.normalFont}>Your serenity</Text>
      </Text>
      <Teksti style={styles.stonebox}>
        <ScrollView horizontal={true}>
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
      </Teksti>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#3F3154',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  stonebox: {
    backgroundColor: '#918998',
    borderColor: '#ACA3AF',
    borderWidth: 4,
    height: '65%',
    width: '90%',
    margin: 15,
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
});
export default Meditate;
