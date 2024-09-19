import React from 'react';
import { View, StyleSheet } from 'react-native';
import MenuButton from '@/components/MenuButton';

interface HomeScreenProps {
  navigation: any;
}
//Menu painikkeet kutsumalla MenuButton komponenttia
//onPress() funtio navigointia varten
function MenuScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <MenuButton title="Tarot" onPress={() => navigation.navigate('Tarot')} />
      <MenuButton
        title="Minerals"
        onPress={() => navigation.navigate('Minerals')}
      />
      <MenuButton
        title="Horoscope"
        onPress={() => navigation.navigate('Horoscope')}
      />
      <MenuButton
        title="Meditate"
        onPress={() => navigation.navigate('Meditate')}
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
  },
});
