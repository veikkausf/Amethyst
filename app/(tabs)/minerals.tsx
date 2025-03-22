import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import MineralButton from '@/components/MineralButton';
import Teksti from '@/components/Textbox';
import ResponsiveText from '@/components/ResponsiveText';

type BoxItem = {
  chakra: string;
  desc: string;
  horoscope: string;
  name: string;
  image: any; // Use image as required to map local images
};

const data: BoxItem[] = [
  {
    chakra: 'Crown, Third Eye, Sacral',
    desc: 'Known for relaxation, stress relief, and spiritual growth. This soothing stone helps calm the mind, ease tension, and promote restful sleep. Amethyst also supports emotional balance and enhances spiritual awareness, making it a powerful aid in meditation and personal transformation.',
    horoscope: 'Aquarius, Pisces, Virgo, Capricorn',
    name: 'Amethyst',
    image: require('../../assets/images/Minerals/amethyst.png'), // Local image reference using require
  },
  {
    chakra: 'Heart',
    desc: 'Promotes luck, prosperity, and emotional balance. This crystal is believed to attract positive opportunities and enhance abundance in various aspects of life. It also supports emotional healing and stability, helping to maintain a balanced and optimistic outlook.',
    horoscope: 'Cancer, Taurus, Virgo',
    name: 'Aventurine',
    image: require('../../assets/images/Minerals/aventurine.png'), // Local image reference using require
  },
];

function Minerals({ navigation }: { navigation: any }) {
  // Directly using static data for rendering buttons
  return (
    <View style={styles.background}>
      <ResponsiveText fontSize={27} style={styles.header}>
        Find
        <ResponsiveText fontSize={27} style={styles.normalFont}>
          {' '}
          a suitable crystal for your mood
        </ResponsiveText>
      </ResponsiveText>
      <Teksti style={styles.stonebox}>
        <ScrollView contentContainerStyle={styles.grid}>
          {data.map((item, index) => (
            <MineralButton
              key={index} // Use index here since we don't have an id anymore
              title={item.name}
              img={item.image} // Now passing the local image directly
              onPress={() =>
                navigation.navigate('MineralData', {
                  itemId: item.name, // or use a unique identifier here if needed
                  itemImage: item.image,
                })
              }
            />
          ))}
        </ScrollView>
      </Teksti>
    </View>
  );
}
//Tyylittely
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
    backgroundColor: 'rgba(145, 137, 152, 0.5)',
    borderColor: '#ACA3AF',
    borderWidth: 4,
    height: '75%',
    width: '90%',
    margin: 15,
  },
  header: {
    // Font responsiivisuus tesTI

    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    marginHorizontal: 40,
    marginBottom: 14,
  },
  normalFont: {
    fontFamily: 'Kadwa_400Regular',
  },
});

export default Minerals;
