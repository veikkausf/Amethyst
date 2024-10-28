import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Teksti from '@/components/Textbox';
import HoroscopeButton from '@/components/HoroscopeButton';

// Type for horoscope items
type BoxItem = {
  id: string;
  image: any;
  dates: string;
};

interface DreamSymbolProps {
  navigation: any;
}

// Names and images for horoscope buttons
const data: BoxItem[] = [
  {
    id: 'Capricorn',
    image: require('../../assets/images/capricorn.png'),
    dates: 'December 22 - January 19',
  },
  {
    id: 'Aquarius',
    image: require('../../assets/images/aquarius.png'),
    dates: 'January 20 - February 18',
  },
  {
    id: 'Pisces',
    image: require('../../assets/images/pisces.png'),
    dates: 'February 19 - March 20',
  },
  {
    id: 'Aries',
    image: require('../../assets/images/aries.png'),
    dates: 'March 21 - April 19',
  },
  {
    id: 'Taurus',
    image: require('../../assets/images/taurus.png'),
    dates: 'April 20 - May 20',
  },
  {
    id: 'Gemini',
    image: require('../../assets/images/gemini.png'),
    dates: 'May 21 - June 20',
  },
  {
    id: 'Cancer',
    image: require('../../assets/images/cancer.png'),
    dates: 'June 21 - July 22',
  },
  {
    id: 'Leo',
    image: require('../../assets/images/leo.png'),
    dates: 'July 23 - August 22',
  },
  {
    id: 'Virgo',
    image: require('../../assets/images/virgo.png'),
    dates: 'August 23 - September 22',
  },
  {
    id: 'Libra',
    image: require('../../assets/images/libra.png'),
    dates: 'September 23 - October 22',
  },
  {
    id: 'Scorpio',
    image: require('../../assets/images/scorpio.png'),
    dates: 'October 23 - November 21',
  },
  {
    id: 'Sagittarius',
    image: require('../../assets/images/sagittarius.png'),
    dates: 'November 22 - December 21',
  },
];
const DreamSymbols: React.FC<DreamSymbolProps> = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.grid}>
        <Text style={styles.header}>Symbols</Text>
        {data.map((item) => (
          <HoroscopeButton
            key={item.id}
            title={item.id}
            img={item.image}
            onPress={() =>
              navigation.navigate('SymbolData', {
                itemId: item.id,
                itemImage: item.image,
              })
            }
          />
        ))}
      </ScrollView>
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
  box: {
    backgroundColor: '#918998',
    width: '50%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DreamSymbols;
