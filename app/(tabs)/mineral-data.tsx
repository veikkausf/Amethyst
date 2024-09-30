import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { doc, getDoc } from 'firebase/firestore'; // Firestore importit
import { db } from '../../firebaseConfig';
import Teksti from '@/components/Textbox';
import Loader from '@/components/loading';

function MineralData({ route, navigation }: { route: any; navigation: any }) {
  const { itemId } = route.params;
  const [mineral, setMineral] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Haetaan mineraali id:n perusteella.
    const fetchMineralById = async (id: string) => {
      try {
        // Referenssi vastaavaan dokumenttiin eli Mineral
        const mineralDocRef = doc(db, 'Mineral', id);

        // Dokumentin nouto
        const mineralDoc = await getDoc(mineralDocRef);

        // Jos mineralDoc on olemassa/saavutettavissa
        if (mineralDoc.exists()) {
          setMineral(mineralDoc.data()); // Asetetaan data
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching mineral:', error);
      } finally {
        setLoading(false); // Loading loppuu kun data noudettu
      }
    };

    fetchMineralById(itemId);
  }, [itemId]);

  // Lataus animaatio, lisätään myöhemmin (lottie)
  if (loading) {
    return <Loader />;
  }

  // Jos mineraali on null, ei löydy, näytetään virheteksti
  if (!mineral) {
    return <Text>Mineral data not found!</Text>;
  }

  // Datan löytyessä renderataan se Viewissä
  return (
    <View style={styles.background}>
      {/* Renderataan mineraalin kuva, nimi ja muut tiedot*/}
      <Image source={require('../../assets/images/mineral_icon.png')}></Image>
      <Text style={styles.headerbig}>{mineral.Name}</Text>

      <Text style={styles.header}>Chakra: </Text>
      <Text style={styles.headertext}>{mineral.Chakra}</Text>

      <Text style={styles.header}>Horoscope: </Text>
      <Text style={styles.headertext}>{mineral.Horoscope}</Text>

      <Teksti style={styles.box}>
        <Text style={styles.normalFont}>{mineral.Desc}</Text>
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
  headerbig: {
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    paddingBottom: 40,
  },
  header: {
    fontSize: 25,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    alignSelf: 'center',
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
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    textAlign: 'center',
  },
  box: { width: '95%' },
});

export default MineralData;
