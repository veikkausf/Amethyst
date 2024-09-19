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
      <Text style={styles.header}>
        <Text style={styles.headerbold}>Choose</Text> a way to calm your mind...
      </Text>
      <MenuButton
        title="Daily Tarot"
        text="Get your daily guidance"
        onPress={() => navigation.navigate('Tarot')}
        style={styles.right}
      />

      <MenuButton
        title="Today's horoscope"
        text="Whats in the air today"
        onPress={() => navigation.navigate('Horoscope')}
        style={styles.left}
      />
      <MenuButton
        title="Meditation lessons"
        text="Clear your mind and relax"
        onPress={() => navigation.navigate('Meditate')}
        style={styles.right}
      />
      <MenuButton
        title="Crystal guide"
        text="Learn about crystal energies"
        onPress={() => navigation.navigate('Minerals')}
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
    fontSize: 30,
    fontFamily: 'Kadwa_400Regular',
  },
  headerbold: {
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
  },
});
