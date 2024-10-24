import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
//import Teksti from '@/components/Textbox';
import AnimoituTeksti from '@/components/AnimatedTextbox';
import { ScrollView } from 'react-native-gesture-handler';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '@/components/loading';
import FlipCard from 'react-native-flip-card';
import { Collapsible } from '@/components/Collapsible';
import * as Animatable from 'react-native-animatable';

type TarotCard = {
  id: string;
  Name: string;
  Desc: string;
  Money?: string;
  Love?: string;
  Image: string;
} | null;

const Tarot: React.FC = () => {
  const [tarotCards, setTarotCards] = useState<TarotCard[]>([]); // Store cards
  const [tarotCard, setTarotCard] = useState<TarotCard>(null); // Displayed card state
  const [loading, setLoading] = useState(true); // Loading state
  const [flipped, setFlipped] = useState(false); // Track flip status
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Track the currently open collapsible

  const getCurrentDate = () => {
    //lisää Date() sisään numeroita jos haluat vaihtaa päivää
    const today = new Date();
    return today.toISOString().split('T')[0]; // Date in YYYY-MM-DD format
  };

  const storeRandomCardIndex = async (randomIndex: number) => {
    const today = getCurrentDate();
    await AsyncStorage.setItem('tarotCardIndex', JSON.stringify(randomIndex));
    await AsyncStorage.setItem('tarotDate', today);
  };

  const loadStoredTarotCard = async (tarotCards: TarotCard[]) => {
    try {
      const storedIndex = await AsyncStorage.getItem('tarotCardIndex');
      const storedDate = await AsyncStorage.getItem('tarotDate');
      const today = getCurrentDate();

      if (storedIndex && storedDate === today) {
        const index = parseInt(storedIndex, 10);
        setTarotCard(tarotCards[index]);
      } else {
        fetchRandomCard(tarotCards);
      }
    } catch (error) {
      console.error('Error loading stored tarot card:', error);
      fetchRandomCard(tarotCards);
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomCard = (tarotCards: TarotCard[]) => {
    const randomIndex = Math.floor(Math.random() * tarotCards.length);
    setTarotCard(tarotCards[randomIndex]);
    storeRandomCardIndex(randomIndex);
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

  const handleFlipStart = () => {
    setFlipped((prev) => !prev); // Toggle flipped state
  };

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Close if the same index is clicked, otherwise open the new one
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {tarotCard ? (
        <View style={styles.view}>
          {flipped && (
            <Animatable.Text
              animation="fadeIn"
              duration={5000}
              style={styles.headertop}
            >
              {tarotCard.Name}
            </Animatable.Text>
          )}
          {!flipped && (
            <Text style={styles.headertop}>Tap the card to flip it</Text>
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
          {flipped && (
            <AnimoituTeksti style={styles.box}>
              <Collapsible
                title="Description"
                isOpen={openIndex === 0}
                onToggle={() => handleToggle(0)}
              >
                <Text style={styles.normalFont}>{tarotCard.Desc}</Text>
              </Collapsible>
              {tarotCard.Money && (
                <Collapsible
                  title="Money"
                  isOpen={openIndex === 1}
                  onToggle={() => handleToggle(1)}
                >
                  <Text style={styles.normalFont}>{tarotCard.Money}</Text>
                </Collapsible>
              )}
              {tarotCard.Love && (
                <Collapsible
                  title="Love"
                  isOpen={openIndex === 2}
                  onToggle={() => handleToggle(2)}
                >
                  <Text style={styles.normalFont}>{tarotCard.Love}</Text>
                </Collapsible>
              )}
            </AnimoituTeksti>
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
    marginBottom: 10,
    color: 'white',
    width: '100%',
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
    minHeight: '100%',
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
    minHeight: 650,
    maxHeight: 650,
  },
  box: {
    margin: 15,
    width: '90%',
  },
});

export default Tarot;
