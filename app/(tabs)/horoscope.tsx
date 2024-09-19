import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import HoroscopeButton from '@/components/HoroscopeButton';

// Tyyppi horoskooppi-itemeitä varten
type BoxItem = {
  id: string;
  image: any;
};

// Nimet ja kuvat horoskooppi nappuloita varten
const data: BoxItem[] = [
  {
    id: 'Capricorn',
    image: require('../../assets/images/capricorn.png'),
  },
  { id: 'Aquarius', image: require('../../assets/images/aquarius.png') },
  { id: 'Pisces', image: require('../../assets/images/pisces.png') },
  { id: 'Aries', image: require('../../assets/images/aries.png') },
  { id: 'Taurus', image: require('../../assets/images/taurus.png') },
  { id: 'Gemini', image: require('../../assets/images/gemini.png') },
  { id: 'Cancer', image: require('../../assets/images/cancer.png') },
  { id: 'Leo', image: require('../../assets/images/leo.png') },
  { id: 'Virgo', image: require('../../assets/images/virgo.png') },
  { id: 'Libra', image: require('../../assets/images/libra.png') },
  { id: 'Scorpio', image: require('../../assets/images/scorpio.png') },
  {
    id: 'Sagittarius',
    image: require('../../assets/images/sagittarius.png'),
  },
];

function Horoscopes({ navigation }: { navigation: any }) {
  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.grid}>
        <Text style={styles.header}>
          What's <Text style={styles.normalFont}>your sun sign?</Text>
        </Text>
        {data.map((item) => (
          <HoroscopeButton
            key={item.id} // horoskooppi-itemin avain
            title={item.id} // horoskooppi-itemin id eli nimi
            img={item.image} // horoskooppi-itemin kuva tai ikoni
            // Nappia painaessa avaa HoroscopeData-komponentin tai toisin sanoen navigoi sinne
            onPress={() =>
              navigation.navigate('HoroscopeData', {
                itemId: item.id,
                itemImage: item.image,
              })
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
    height: '60%',
    width: '80%',
  },
  header: {
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    marginHorizontal: 40,
  },
  normalFont: {
    fontFamily: 'Kadwa_400Regular',
  },
});

export default Horoscopes;
