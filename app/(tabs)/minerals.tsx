import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import MineralButton from '@/components/MineralButton';
import Teksti from '@/components/Textbox';

type MineralData = {
  id: string;
  image: any;
};

const data: MineralData[] = [
  {
    id: 'asdfasdf',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  {
    id: 'fhjnhjkrtnhj',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  {
    id: 'Pisces',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  { id: 'Aries', image: require('../../assets/images/placeholdermineral.jpg') },
  {
    id: 'Taurus',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  {
    id: 'Gemini',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  {
    id: 'Cancer',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  { id: 'Leo', image: require('../../assets/images/placeholdermineral.jpg') },
  { id: 'Virgo', image: require('../../assets/images/placeholdermineral.jpg') },
];

function Minerals({ navigation }: { navigation: any }) {
  return (
    <View style={styles.background}>
      <Text style={styles.header}>FIND a suitable crystal for your mood</Text>
      <Teksti style={styles.stonebox}>
        <ScrollView contentContainerStyle={styles.grid}>
          {data.map((item) => (
            <MineralButton
              key={item.id}
              title={item.id}
              img={item.image}
              onPress={() =>
                navigation.navigate('MineralData', { itemId: item.id })
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
    height: '60%',
    width: '80%',
  },
  header: {
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    marginHorizontal: 40,
    height: '20%',
  },
});

export default Minerals;
