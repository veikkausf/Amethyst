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
  Money?: string;
  Love?: string;
  Image: string;
} | null;

const Tarot: React.FC = () => {
  const [tarotCards, setTarotCards] = useState<TarotCard[]>([]); // tallentaa kaikki kortit usestateen
  const [tarotCard, setTarotCard] = useState<TarotCard>(null); // tallentaa näytetyn kortin
  const [loading, setLoading] = useState(true); //

  const getCurrentDate = () => {
    const today = new Date(); // hakee tämän päivän
    /* today.setDate(today.getDate() + 1); // vaihtaa päivää*/
    return today.toISOString().split('T')[0]; // Palauttaa päivän muodossa YYYY-MM-DD
  };

  // Functio joka tallentaa päivämäärän ja valitsee randomilla idexin ja tallentaa sen
  const storeRandomCardIndex = async (randomIndex: number) => {
    const today = getCurrentDate();
    await AsyncStorage.setItem('tarotCardIndex', JSON.stringify(randomIndex)); // Tallentaa indexin
    await AsyncStorage.setItem('tarotDate', today); // Tallentaa Päivän
  };

  const loadStoredTarotCard = async (tarotCards: TarotCard[]) => {
    try {
      const storedIndex = await AsyncStorage.getItem('tarotCardIndex'); // hakee AsyncStorageen tallennetun indexin

      const storedDate = await AsyncStorage.getItem('tarotDate'); // hakee AsyncStorageen tallenetun päivämäärän
      const today = getCurrentDate(); // hakee tämän päivän päivän

      if (storedIndex && storedDate === today) {
        // vertaa että onko päivämäärä sama kuin tämäpäivä
        const index = parseInt(storedIndex, 10);
        setTarotCard(tarotCards[index]); // käyttää tallenettua indexiä näyttämään oikean kortin
        setLoading(false);
      } else {
        fetchRandomCard(tarotCards); // Hakee uuden random kortin jos päivämäärä on muuttunut
      }
    } catch (error) {
      console.error('Error loading stored tarot card:', error);
      fetchRandomCard(tarotCards); // Hakee uuden kortin jos tulee joku errori
    }
  };

  // Functio joka hakee random kortin
  const fetchRandomCard = (tarotCards: TarotCard[]) => {
    const randomIndex = Math.floor(Math.random() * tarotCards.length); // valitsee randomilla kortin
    setTarotCard(tarotCards[randomIndex]);
    storeRandomCardIndex(randomIndex); // Laittaa talteen sen kortin
  };

  useEffect(() => {
    const tarotCollection = collection(db, 'Tarot');

    // Saatiedon reaaliajassa muutoksista firebaeen
    const unsubscribe = onSnapshot(tarotCollection, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const cards = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as TarotCard[];

        setTarotCards(cards); // tallentaa päivitetyn tiedon

        // lataa päivitetyn kortin uusilla tiedoilla tai valitsee uuden kortin jos päivämmärä on muuttunut
        loadStoredTarotCard(cards);
      } else {
        console.log('No Tarot cards found.');
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Clean up the listener when the component unmounts
  }, []);

  if (loading) {
    return <ActivityIndicator size={'large'} color={'#0000ff'} />; // kun sovellus lataa tämä näkyy
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
          {tarotCard.Money && (
            <Text style={styles.normalFont}>Money: {tarotCard.Money}</Text> // money näkyy vain jos sellainen on olemassa
          )}
          {tarotCard.Love && (
            <Text style={styles.normalFont}>Love: {tarotCard.Love}</Text> // loe näkyy vaan jos sellainen on olemassa
          )}
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
