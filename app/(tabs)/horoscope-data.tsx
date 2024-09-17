import React, { useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import Teksti from '@/components/Textbox';

// Parametri-lista tälle komponentille
type RootStackParamList = {
  HoroscopeData: { itemId: string; itemImage: any };
};

type HoroscopeDataRouteProp = RouteProp<RootStackParamList, 'HoroscopeData'>;

// Interface for the horoscope data received from the API
interface HoroscopeDataResponse {
  date: string;
  horoscope_data: string;
}

interface HoroscopeDataProps {
  route: HoroscopeDataRouteProp;
}

const HoroscopeData: React.FC<HoroscopeDataProps> = ({ route }) => {
  const { itemId } = route.params; // Tuotu ID
  const { itemImage } = route.params;
  const [data, setData] = useState<HoroscopeDataResponse | null>(null); // Use the interface here
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHoroscope();
  }, []);

  const fetchHoroscope = async () => {
    try {
      const response = await fetch(
        `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${itemId}&day=TODAY`,
        {
          headers: {
            accept: 'application/json',
          },
        }
      );
      const result = await response.json();
      setData(result.data); // Set the data in state
    } catch (error) {
      console.error('Error fetching horoscope:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.background}>
      {data && (
        <>
          <Text style={styles.header}>{itemId}</Text>
          <Image source={itemImage} style={styles.image}></Image>
          <Teksti style={styles.box}>
            <Text style={styles.header}>{data.date}</Text>
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
  text: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Kadwa_400Regular',
    textAlign: 'center',
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
