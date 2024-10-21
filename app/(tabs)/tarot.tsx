import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Teksti from '@/components/Textbox';
import { ScrollView } from 'react-native-gesture-handler';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '@/components/loading';
import FlipCard from 'react-native-flip-card';

type TarotCard = {
  id: string;
  Name: string;
  Desc: string;
  Money?: string;
  Love?: string;
  Image: string;
} | null;

const Tarot: React.FC = () => {
  const [tarotCards, setTarotCards] = useState<TarotCard[]>([]); // Varastoidaan kortit
  const [tarotCard, setTarotCard] = useState<TarotCard>(null); // Näytetty kortti storeen
  const [loading, setLoading] = useState(true); // Lataus tila
  const [flipped, setFlipped] = useState(false); // State to track flip status

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Pvm muodossa YYYY-MM-DD
  };

  const storeRandomCardIndex = async (randomIndex: number) => {
    const today = getCurrentDate();
    await AsyncStorage.setItem('tarotCardIndex', JSON.stringify(randomIndex)); // tarot-kortti index storeen
    await AsyncStorage.setItem('tarotDate', today); // pmv storeen
  };

  const loadStoredTarotCard = async (tarotCards: TarotCard[]) => {
    try {
      const storedIndex = await AsyncStorage.getItem('tarotCardIndex');
      const storedDate = await AsyncStorage.getItem('tarotDate');
      const today = getCurrentDate();

      if (storedIndex && storedDate === today) {
        const index = parseInt(storedIndex, 10);
        setTarotCard(tarotCards[index]); // Käytetään indexiä näytetylle kortille
      } else {
        fetchRandomCard(tarotCards); // Uusi kortti pvm vaihtuessa
      }
    } catch (error) {
      console.error('Error loading stored tarot card:', error);
      fetchRandomCard(tarotCards);
    } finally {
      setLoading(false); // Lataus false kortin noudon jälkeen
    }
  };

  const fetchRandomCard = (tarotCards: TarotCard[]) => {
    const randomIndex = Math.floor(Math.random() * tarotCards.length);
    setTarotCard(tarotCards[randomIndex]); //random kortti
    storeRandomCardIndex(randomIndex); //
  };

  useEffect(() => {
    const tarotCollection = collection(db, 'Tarot');

    const unsubscribe = onSnapshot(tarotCollection, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const cards = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as TarotCard[];

        setTarotCards(cards);

        loadStoredTarotCard(cards);
      } else {
        console.log('No Tarot cards found.');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader />;
  }

  // Handler to detect when the card starts flipping
  const handleFlipStart = () => {
    setFlipped((prev) => !prev); // Toggle flipped state
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {tarotCard ? (
        <View style={styles.view}>
          {flipped && <Text style={styles.headertop}> {tarotCard.Name} </Text>}
          {!flipped && (
            <Text style={styles.header}>
              Tap to flip the card and reveal your message!
            </Text>
          )}
          <FlipCard
            flipHorizontal={true}
            flipVertical={false}
            perspective={300}
            friction={10}
            clickable={!flipped} // Disable flipping after the first flip
            onFlipEnd={handleFlipStart} // Trigger on flip start
          >
            {/* Front side of the card */}
            <Image
              source={require('../../assets/images/backside.jpg')}
              style={styles.image}
            />

            {/* Back side of the card */}
            <Image
              source={{
                uri: tarotCard.Image,
              }}
              style={[styles.image, flipped && { transform: [{ scaleX: -1 }] }]}
            />
          </FlipCard>
          {!flipped && (
            <Teksti style={styles.box}>
              <Text style={styles.header}>
                Tap to flip the card and reveal your message!
              </Text>
            </Teksti>
          )}
          {flipped && (
            <Teksti style={styles.box}>
              <Text style={styles.normalFont}>
                <Text style={styles.header}>Description:</Text> {tarotCard.Desc}
              </Text>
              {tarotCard.Money && (
                <Text style={styles.normalFont}>
                  <Text style={styles.header}>Money:</Text> {tarotCard.Money}
                </Text>
              )}
              {tarotCard.Love && (
                <Text style={styles.normalFont}>
                  <Text style={styles.header}>Love:</Text> {tarotCard.Love}
                </Text>
              )}
            </Teksti>
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
    color: 'white',
  },
  headertop: {
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 10,
    color: 'white',
  },
  normalFont: {
    fontFamily: 'Kadwa_400Regular',
    color: 'white',
    fontSize: 14,
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  container: {
    backgroundColor: '#3F3154',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: 330,
    height: 650,
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  box: {
    margin: 15,
    width: '90%',
  },
});

export default Tarot;
