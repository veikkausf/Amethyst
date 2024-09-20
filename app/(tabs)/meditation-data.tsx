import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import Teksti from '@/components/Textbox';
import AudioPlayer from '@/components/audioplayer';

// Parametri-lista tälle komponentille
type RootStackParamList = {
  MeditationData: { itemId: string; itemImage: any };
};

type MeditationDataRouteProp = RouteProp<RootStackParamList, 'MeditationData'>;

interface Props {
  route: MeditationDataRouteProp;
}

const MeditationData: React.FC<Props> = ({ route }) => {
  const { itemId } = route.params;
  const { itemImage } = route.params;

  return (
    <View style={styles.background}>
      <Text style={styles.header}>
        Choose{' '}
        <Text style={styles.normalFont}>
          the meditation time that suits you best
        </Text>
      </Text>
      <Teksti style={styles.box}>
        <Image source={itemImage} style={styles.image}></Image>
        <Text style={styles.imgHeader}>{itemId} </Text>
      </Teksti>
      <AudioPlayer audioFile={require('../../assets/audiotest/test.mp3')} />
    </View>
  );
};
//Tyylit
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#3F3154',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 25,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
  },

  image: {},
  normalFont: {
    fontFamily: 'Kadwa_400Regular',
  },
  box: {
    margin: 15,
    width: '45%',
  },
  imgHeader: {
    fontSize: 20,
    fontFamily: 'Kadwa_400Regular',
  },
});

export default MeditationData;
