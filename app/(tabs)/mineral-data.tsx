import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore'; // Firestore importit
import { db } from '../../firebaseConfig';
import Teksti from '@/components/Textbox';
import Loader from '@/components/loading';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

function MineralData({ route, navigation }: { route: any; navigation: any }) {
  const { itemId } = route.params;
  const [mineral, setMineral] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMineralById = async (id: string) => {
      try {
        const mineralDocRef = doc(db, 'Mineral', id);
        const mineralDoc = await getDoc(mineralDocRef);
        if (mineralDoc.exists()) {
          setMineral(mineralDoc.data());
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching mineral:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMineralById(itemId);
  }, [itemId]);

  if (loading) {
    return <Loader />;
  }

  if (!mineral) {
    return <Text>Mineral data not found!</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Image with proper resizing */}
        <Image
          source={require('../../assets/images/mineral_icon.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.headerbig}>{mineral.Name}</Text>

        <Text style={styles.header}>Chakra: </Text>
        <Text style={styles.headertext}>{mineral.Chakra}</Text>

        <Text style={styles.header}>Horoscope: </Text>
        <Text style={styles.headertext}>{mineral.Horoscope}</Text>

        <Teksti style={styles.box}>
          <Text style={styles.normalFont}>{mineral.Desc}</Text>
        </Teksti>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F3154',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    width: width * 0.2, // Käytetään dimensions-kirjastoa responsiivisuuteen
    height: width * 0.2,
    maxWidth: 200,
    maxHeight: 200,
    minWidth: 100,
    minHeight: 100,
    marginBottom: 20,
  },
  headerbig: {
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    paddingBottom: 40,
    textAlign: 'center',
  },
  header: {
    fontSize: 25,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    textAlign: 'center',
  },
  headertext: {
    fontSize: 23,
    fontFamily: 'Kadwa_400Regular',
    color: 'white',
    textAlign: 'center',
    width: '85%',
    alignSelf: 'center',
    marginHorizontal: 10,
    paddingBottom: 30,
  },
  normalFont: {
    fontFamily: 'Kadwa_400Regular',
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  box: {
    width: '95%',
  },
});

export default MineralData;
