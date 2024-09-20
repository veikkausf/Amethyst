import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Teksti from '@/components/Textbox';
import { ScrollView } from 'react-native-gesture-handler';

const Tarot: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>
        {' '}
        The Sun... <Text style={styles.normalFont}>Is burning you today</Text>
      </Text>

      <Image
        source={require('../../assets/images/tarot.png')}
        style={styles.image}
      ></Image>
      <Text style={styles.normalFont}>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like). tters, as
        opposed to using 'Content here, content here', making it look like
        readable English. Many desktop publishing packages and web page editors
        now use Lorem Ipsum as their default model text, and a search for 'lorem
        ipsum' will uncover many web sites still in their infancy. Various
        versions have evolved over the years, sometimes by accident, sometimes
        on purpose (injected humour and the like).
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontFamily: 'Kadwa_700Bold',
  },
  normalFont: {
    fontFamily: 'Kadwa_400Regular',
  },
  container: {
    backgroundColor: '#3F3154',

    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 600,
    alignContent: 'center',
  },
});

export default Tarot;
