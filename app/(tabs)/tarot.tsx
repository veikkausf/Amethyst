import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Teksti from '@/components/Textbox';
import { ScrollView } from 'react-native-gesture-handler';
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

// tarot kortin tyylittely
type TarotCard = {
  id: string;
  Name: string;
  Desc: string;
  Money: string;
  Love: string;
  Image: string;
} | null;

const Tarot: React.FC = () => {
  const [tarotCards, setTarotCards] = useState<TarotCard[]>([]); // Store all fetched cards
  const [tarotCard, setTarotCard] = useState<TarotCard>(null); // Store the displayed card
  const [loading, setLoading] = useState(true);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  };

  // Function to store and update the random card index
  const storeRandomCardIndex = async (randomIndex: number) => {
    const today = getCurrentDate();
    await AsyncStorage.setItem('tarotCardIndex', JSON.stringify(randomIndex)); // Store only the index
    await AsyncStorage.setItem('tarotDate', today); // Store today's date
  };

  const loadStoredTarotCard = async (tarotCards: TarotCard[]) => {
    try {
      const storedIndex = await AsyncStorage.getItem('tarotCardIndex');
      const storedDate = await AsyncStorage.getItem('tarotDate');
      const today = getCurrentDate();

      if (storedIndex && storedDate === today) {
        const index = parseInt(storedIndex, 10);
        setTarotCard(tarotCards[index]); // Use the stored index to display the card
        setLoading(false);
      } else {
        fetchRandomCard(tarotCards); // Fetch a new card if the stored date is not today
      }
    } catch (error) {
      console.error('Error loading stored tarot card:', error);
      fetchRandomCard(tarotCards); // Fetch a new card if any error occurs
    }
  };

  // Function to select a random card
  const fetchRandomCard = (tarotCards: TarotCard[]) => {
    const randomIndex = Math.floor(Math.random() * tarotCards.length);
    setTarotCard(tarotCards[randomIndex]);
    storeRandomCardIndex(randomIndex); // Store the random card index
  };

  useEffect(() => {
    const tarotCollection = collection(db, 'Tarot');

    // Listen for real-time updates from Firestore
    const unsubscribe = onSnapshot(tarotCollection, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const cards = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as TarotCard[];

        setTarotCards(cards); // Store the fetched cards

        // Load the stored card or fetch a new random one if the date doesn't match
        loadStoredTarotCard(cards);
      } else {
        console.log('No Tarot cards found.');
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Clean up the listener when the component unmounts
  }, []);

  if (loading) {
    return <p>kakkaa</p>;
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
