import React from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
  ViewStyle,
  Image,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import Teksti from '../../components/Textbox';

type MenuScreenProps = StackScreenProps<RootStackParamList, 'Menu'>;

function MenuScreen({ navigation, route }: MenuScreenProps) {
  const { givenName, userBirthday } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        <Text style={styles.headerbold}>{givenName || 'Guest'}</Text>, choose a
        way to calm your mind...
      </Text>
      {/* Tarot  */}
      <Pressable
        style={styles.containerLeft}
        onPress={() => navigation.navigate('Tarot')}
      >
        <Teksti style={styles.textBoxLeft}>
          <View style={styles.borderLeft}>
            <Image
              style={styles.imageleft}
              source={require('../../assets/images/menu-tarot.png')}
            />
          </View>
          <View>
            <Text style={styles.headerLeft}>Daily tarot</Text>
            <Text style={styles.textLeft}>Get your daily guidance</Text>
          </View>
        </Teksti>
      </Pressable>
      {/* Horoscope */}
      <Pressable
        style={styles.containerRight}
        onPress={() => navigation.navigate('Horoscope', { userBirthday })}
      >
        <Teksti style={styles.textBoxRight}>
          <View style={styles.borderRight}>
            <Image
              style={styles.imageright}
              source={require('../../assets/images/menu-horo.png')}
            />
          </View>
          <View>
            <Text style={styles.headerRight}>Today's horoscope</Text>
            <Text style={styles.textRight}>What's in the air today</Text>
          </View>
        </Teksti>
      </Pressable>

      {/* Meditation */}

      <Pressable
        style={styles.containerLeft}
        onPress={() => navigation.navigate('DreamDiary')}
      >
        <Teksti style={styles.textBoxLeft}>
          <View style={styles.borderLeft}>
            <Image
              style={styles.imageleft}
              source={require('../../assets/images/menu-dream.png')}
            />
          </View>
          <View>
            <Text style={styles.headerLeft}>Dream diary</Text>
            <Text style={styles.textLeft}>Interpretation of dreams</Text>
          </View>
        </Teksti>
      </Pressable>

      {/* Crystals  */}

      <Pressable
        style={styles.containerRight}
        onPress={() => navigation.navigate('Minerals')}
      >
        <Teksti style={styles.textBoxRight}>
          <View style={styles.borderRight}>
            <Image
              style={styles.imageright}
              source={require('../../assets/images/menu-mineral.png')}
            />
          </View>
          <View>
            <Text style={styles.headerRight}>Crystal guide</Text>
            <Text style={styles.textRight}>Learn about crystal energies</Text>
          </View>
        </Teksti>
      </Pressable>
    </View>
  );
}

export default MenuScreen;
//tyylit
const styles = StyleSheet.create({
  // yleiset

  container: {
    backgroundColor: '#3F3154',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  header: {
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'Kadwa_400Regular',
    marginHorizontal: 15,
  },
  headerbold: {
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
  },
  //
  // vasemmat
  //
  containerLeft: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 10,
    width: '80%',
    height: '15%',
    marginVertical: 30,
  },
  textBoxLeft: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  imageleft: {
    width: 60,
    height: 60,
    borderColor: '#ACA3AF',
    borderWidth: 3,
    borderRadius: 30,
  },
  borderLeft: {
    width: 70,
    height: 70,
    borderColor: '#3F3154',
    borderWidth: 5,
    borderRadius: 40,
    left: '103%',
    position: 'absolute',
    top: '30%',
  },
  headerLeft: {
    textAlign: 'left',
    color: 'white',
    fontFamily: 'Kadwa_400Regular',
    fontSize: 25,
  },

  textLeft: {
    textAlign: 'left',
    color: 'white',
    fontFamily: 'Kadwa_400Regular',
    fontSize: 15,
  },

  //
  // oikeat
  //
  containerRight: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginHorizontal: 10,
    width: '80%',
    height: '15%',
    borderRadius: 10, // Rounded corners
  },
  imageright: {
    width: 60,
    height: 60,
    borderColor: '#ACA3AF',
    borderWidth: 3,
    borderRadius: 30,
  },

  borderRight: {
    width: 70,
    height: 70,
    borderColor: '#3F3154',
    borderWidth: 5,
    borderRadius: 40,
    right: '103%',
    position: 'absolute',
    top: '30%',
  },

  textBoxRight: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  headerRight: {
    textAlign: 'right',
    color: 'white',
    fontFamily: 'Kadwa_400Regular',
    fontSize: 25,
  },

  textRight: {
    textAlign: 'right',
    color: 'white',
    fontFamily: 'Kadwa_400Regular',
    fontSize: 15,
  },
});
