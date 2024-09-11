import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type BoxItem = {
  id: string;
  image: any;
};

const data: BoxItem[] = [
  { id: 'Capricorn', image: require('../../assets/images/amethyst_icon.png') },
  { id: 'Aquarius', image: require('../../assets/images/amethyst_icon.png') },
  { id: 'Pisces', image: require('../../assets/images/amethyst_icon.png') },
  { id: 'Aries', image: require('../../assets/images/amethyst_icon.png') },
  { id: 'Taurus', image: require('../../assets/images/amethyst_icon.png') },
  { id: 'Gemini', image: require('../../assets/images/amethyst_icon.png') },
  { id: 'Cancer', image: require('../../assets/images/amethyst_icon.png') },
  { id: 'Leo', image: require('../../assets/images/amethyst_icon.png') },
  { id: 'Virgo', image: require('../../assets/images/amethyst_icon.png') },
  { id: 'Libra', image: require('../../assets/images/amethyst_icon.png') },
  { id: 'Scorpion', image: require('../../assets/images/amethyst_icon.png') },
  {
    id: 'Sagittarius',
    image: require('../../assets/images/amethyst_icon.png'),
  },
  // Add more items up to 12
];

const BoxButton: React.FC<{ item: BoxItem }> = ({ item }) => {
  return (
    <TouchableOpacity
      style={styles.box}
      onPress={() => console.log(`Pressed ${item.id}`)}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.boxText}>{item.id}</Text>
    </TouchableOpacity>
  );
};

const TaurusList = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <BoxButton item={item} />}
      numColumns={1} // Display boxes in rows of 3
      contentContainerStyle={styles.flatListContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flex: 1,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  box: {
    flex: 1,
    margin: 10,
    height: 100,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  boxText: {
    fontSize: 14,
    color: '#333',
  },
});

export default TaurusList;
