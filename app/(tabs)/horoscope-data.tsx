import React, { useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';

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
    <View style={{ padding: 20 }}>
      {data && (
        <>
          <Image source={itemImage}></Image>
          <Text>{itemId}</Text>
          <Text>Date: {data.date}</Text>
          <Text>Horoscope: {data.horoscope_data}</Text>
        </>
      )}
    </View>
  );
};

export default HoroscopeData;
