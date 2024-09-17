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
    id: 'Obsidian',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  {
    id: 'Onyx',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  {
    id: 'Moonstone',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  {
    id: 'Carnelian',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  {
    id: 'Malachite',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  {
    id: 'Lepidolite',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  {
    id: 'Fluorite',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  {
    id: 'Yellow Jasper',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  {
    id: 'Hematite',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  {
    id: 'Aventurine',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  {
    id: 'Labradorite',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  {
    id: 'Citrine',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  {
    id: 'Smoky Quartz',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  {
    id: 'Selenite',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  {
    id: 'Clear Quartz',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  {
    id: 'Rose Quartz',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  {
    id: 'Amethyst',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
  {
    id: 'Jade',
    image: require('../../assets/images/placeholdermineral.jpg'),
  },
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
});

export default Minerals;
