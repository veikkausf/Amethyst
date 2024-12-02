import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native';
import MineralButton from '@/components/MineralButton';
import Teksti from '@/components/Textbox';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Loader from '@/components/loading';
import ResponsiveText from '@/components/ResponsiveText';
import FastImage from 'react-native-fast-image';

type MineralData = {
  id: string;
  Name: string;
  Image: string;
};

function Minerals({ navigation }: { navigation: any }) {
  const [mineralData, setMineralData] = useState<MineralData[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect noutaa dataa kun komponentti "renderaa"
  useEffect(() => {
    const fetchMinerals = async () => {
      try {
        // Määritellään kokoelma tietokannasta nimeltään mineral
        const mineralCollection = collection(db, 'Mineral');

        // Kaikki haetut dokumentit
        const mineralSnapshot = await getDocs(mineralCollection);

        // Mapataan dokumentit MineralData-tyypin mukaisesti
        const minerals: MineralData[] = mineralSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            Name: data.Name ?? 'Unknown Mineral', // Tarkastetaan, että name on aina merkkijono
            Image: data.Image ?? '', // Sama imagelle
          };
        });

        // Laitetaan "state", noudetulle mineral-datalle
        setMineralData(minerals);
      } catch (error) {
        console.error('Error fetching minerals:', error);
      } finally {
        // Kun datan on noudettu, muuttuu loading arvo falseksi
        setLoading(false);
      }
    };

    fetchMinerals();
  }, []);

  // Latausnäkymä
  if (loading) {
    return <Loader />;
  }

  // Renderataan mineraalit noutamisen onnistuttua
  return (
    <View style={styles.background}>
      <ResponsiveText fontSize={27} style={styles.header}>
        Find
        <ResponsiveText fontSize={27} style={styles.normalFont}>
          {' '}
          a suitable crystal for your mood
        </ResponsiveText>
      </ResponsiveText>
      <Teksti style={styles.stonebox}>
        <FastImage>
          <ScrollView contentContainerStyle={styles.grid}>
            {mineralData.map((item) => (
              <MineralButton
                key={item.id}
                title={item.Name}
                img={{ uri: item.Image }}
                onPress={() =>
                  navigation.navigate('MineralData', {
                    itemId: item.id,
                    itemImage: item.Image,
                  })
                }
              />
            ))}
          </ScrollView>
        </FastImage>
      </Teksti>
    </View>
  );
}
//Tyylittely
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
    backgroundColor: 'rgba(145, 137, 152, 0.5)',
    borderColor: '#ACA3AF',
    borderWidth: 4,
    height: '75%',
    width: '90%',
    margin: 15,
  },
  header: {
    // Font responsiivisuus tesTI

    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    marginHorizontal: 40,
    marginBottom: 14,
  },
  normalFont: {
    fontFamily: 'Kadwa_400Regular',
  },
});

export default Minerals;
