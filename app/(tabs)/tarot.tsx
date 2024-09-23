import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Teksti from '@/components/Textbox';
import { ScrollView } from 'react-native-gesture-handler';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
type TarotCard = {
  id: string;
  Name: string;
  Desc: string;
  Money: string;
  Love: string;
  Image: string;
} | null;

const Tarot: React.FC = () => {
  const [tarotCard, setTarotCard] = useState<TarotCard>(null); // State to hold the fetched document data
  const [loading, setLoading] = useState(true); // State to manage the loading state
  const getCurrentDate = () => {
    const today = new Date();
    //näyttää seuraavan päivän kortin
    /* today.setDate(today.getDate() + 1);*/
    return today.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  };

  const fetchRandomCard = async () => {
    try {
      const tarotCollection = collection(db, 'Tarot');
      const querySnapshot = await getDocs(tarotCollection);

      if (!querySnapshot.empty) {
        const tarotCards = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as TarotCard[];
        const randomIndex = Math.floor(Math.random() * tarotCards.length);
        const randomCard = tarotCards[randomIndex];

        const today = getCurrentDate();
        AsyncStorage.setItem('tarotCard', JSON.stringify(randomCard));
        AsyncStorage.setItem('tarotDate', today);
        setTarotCard(randomCard);
      } else {
        console.log('No Tarot cards found.');
      }
    } catch (error) {
      console.error('Error fetching Tarot cards:', error);
    } finally {
      setLoading(false);
    }
  };
  const loadStoredTarotCard = async () => {
    try {
      const storedCard = await AsyncStorage.getItem('tarotCard');
      const storedDate = await AsyncStorage.getItem('tarotDate');
      const today = getCurrentDate();

      // Check if storedDate is today
      if (storedCard && storedDate === today) {
        setTarotCard(JSON.parse(storedCard)); // Parse the stored card and set it
        setLoading(false); // Stop the loading state
      } else {
        fetchRandomCard(); // Fetch a new tarot card if date is different
      }
    } catch (error) {
      console.error('Error loading stored tarot card:', error);
      // Fallback to fetching a random tarot card if any error occurs
      fetchRandomCard();
    }
  };

  useEffect(() => {
    loadStoredTarotCard();
  }, []);

  if (loading) {
    return;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : tarotCard ? (
        <View>
          <Text style={styles.header}> {tarotCard.Name} </Text>

          <Image source={{ uri: tarotCard.Image }} style={styles.image}></Image>
          <Text style={styles.normalFont}>Desc: {tarotCard.Desc}</Text>
          <Text style={styles.normalFont}>Money: {tarotCard.Money}</Text>
          <Text style={styles.normalFont}>Love: {tarotCard.Love}</Text>
        </View>
      ) : (
        <Text>No card found.</Text>
      )}
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
    width: 330,
    height: 650,
    alignContent: 'center',
  },
});

export default Tarot;
