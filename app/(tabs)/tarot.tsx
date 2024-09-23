import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Teksti from '@/components/Textbox';
import { ScrollView } from 'react-native-gesture-handler';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

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

  const fetchTarotCard = async () => {
    try {
      const tarotCollection = collection(db, 'Tarot');
      const q = query(tarotCollection, where('Name', '==', 'The Sun'));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setTarotCard({ id: doc.id, ...doc.data() } as TarotCard); // Set the document data to state
      } else {
        console.log('No matching document found.');
      }
    } catch (error) {
      console.error('Error fetching Tarot card:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTarotCard();
  }, []);

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
