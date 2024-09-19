import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MenuButton from '@/components/MenuButton';

interface HomeScreenProps {
  navigation: any;
}
//Menu painikkeet kutsumalla MenuButton komponenttia
//onPress() funtio navigointia varten
function MenuScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menu</Text>
      <MenuButton
        title="Tarot"
        text="test"
        onPress={() => navigation.navigate('Tarot')}
        style={styles.right}
      />
      <MenuButton
        title="Minerals"
        text="test"
        onPress={() => navigation.navigate('Minerals')}
        style={styles.left}
      />
      <MenuButton
        title="Horoscope"
        text="test"
        onPress={() => navigation.navigate('Horoscope')}
        style={styles.right}
      />
      <MenuButton
        title="Meditate"
        text="test"
        onPress={() => navigation.navigate('Meditate')}
        style={styles.left}
      />
    </View>
  );
}

export default MenuScreen;
//tyylit
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#3F3154',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  left: {
    justifyContent: 'flex-start',
    left: 40,
  },
  right: {
    justifyContent: 'flex-start',
    right: 40,
  },
  header: {
    color: '#ffffff',
    fontSize: 25,
    fontFamily: 'Kadwa_400Regular',
  },
});
