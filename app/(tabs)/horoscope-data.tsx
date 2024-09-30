import React, { useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import Teksti from '@/components/Textbox';
import Loader from '@/components/loading';
// Parametri-lista tälle komponentille
type RootStackParamList = {
  HoroscopeData: { itemId: string; itemImage: any };
};

type HoroscopeDataRouteProp = RouteProp<RootStackParamList, 'HoroscopeData'>;

// Rajapintaluokka api:sta saapuvaa dataa varten
interface HoroscopeDataResponse {
  date: string;
  horoscope_data: string;
}

interface HoroscopeDataProps {
  route: HoroscopeDataRouteProp;
}

const HoroscopeData: React.FC<HoroscopeDataProps> = ({ route }) => {
  const { itemId } = route.params; // Tuotu ID propsina
  const { itemImage } = route.params;
  const [data, setData] = useState<HoroscopeDataResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHoroscope();
  }, []);

  // Haetaan API:sta propsin avulla dataa, tarkalleen ottaen horoskooppi kuvaukset tai "ennustukset"
  const fetchHoroscope = async () => {
    try {
      const response = await fetch(
        // Käytetään tuotua id-propsia api-fetchin kanssa
        `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${itemId}&day=TODAY`,
        {
          headers: {
            accept: 'application/json',
          },
        }
      );
      const result = await response.json();
      setData(result.data); // Otetaan data talteen
    } catch (error) {
      console.error('Error fetching horoscope:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.background}>
      {data && (
        <>
          <Text style={styles.header}>{itemId}</Text>
          <Image source={itemImage} style={styles.image}></Image>
          <Teksti style={styles.box}>
            <Text style={styles.date}>{data.date}</Text>
            <Text style={styles.text}>{data.horoscope_data}</Text>
          </Teksti>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#3F3154',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#3F3154',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    marginHorizontal: 40,
    height: '20%',
  },
  date: {
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    marginHorizontal: 40,
    height: '20%',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 7,
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Kadwa_400Regular',
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  box: {
    margin: 15,
    bottom: 40,
  },
  image: {
    bottom: 75,
  },
});

export default HoroscopeData;
