import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
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
  Keywords: string;
} | null;

const Tarot: React.FC = () => {
  const [tarotCards, setTarotCards] = useState<TarotCard[]>([]); // Store cards
  const [tarotCard, setTarotCard] = useState<TarotCard>(null); // Displayed card state
  const [loading, setLoading] = useState(true); // Loading state
  const [flipped, setFlipped] = useState(false); // Track flip status
  const [anim, setAnim] = useState(false); // Track Animation status
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Allow null for closed state

  // Get screen dimensions
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  // Adjust image dimensions based on screen size
  const imageWidth = screenWidth * 0.8;
  const imageHeight = (imageWidth / 330) * 650; // Maintain the original aspect ratio

  const getCurrentDate = () => {
    //lisää Date() sisään numeroita jos haluat vaihtaa päivää
    const today = new Date();
    return today.toISOString().split('T')[0]; // Date in YYYY-MM-DD format
  };
  //Tallennetaan päivän random kortti AsyncStorageen
  //Kortti saadaan randomIndex joka tulee fetchRandomCard funktiosta
  const storeRandomCardIndex = async (randomIndex: number) => {
    const today = getCurrentDate();
    await AsyncStorage.setItem('tarotCardIndex', JSON.stringify(randomIndex));
    await AsyncStorage.setItem('tarotDate', today);
  };
  //ladataan tallenettu kortti
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
  //Random numero database pituuden mukaan
  const fetchRandomCard = (tarotCards: TarotCard[]) => {
    const randomIndex = Math.floor(Math.random() * tarotCards.length);
    setTarotCard(tarotCards[randomIndex]);
    storeRandomCardIndex(randomIndex);
  };
  //Database query korteille
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
  //Lataus ruutu
  if (loading) {
    return <Loader />;
  }

  const handleFlipStart = () => {
    setFlipped((prev) => !prev); // Toggle flipped state
  };
  // Collapsible function
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Close current and open new collapsible
  };
  const handleAnimationEnd = () => {
    setAnim(true); // Anim -> true että tekstin animaatio vaihtuu
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {tarotCard ? (
        <View style={styles.view}>
          {flipped && !anim && (
            <Animatable.Text
              animation="fadeOutLeft"
              duration={800}
              onAnimationEnd={handleAnimationEnd}
              style={styles.headertop}
            >
              Tap the card to flip it
            </Animatable.Text>
          )}
          {anim && (
            <Animatable.Text
              animation="fadeInRight"
              duration={800}
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
            clickable={!flipped} // Vain kerran flipattava
            onFlipEnd={handleFlipStart} // Trigger on flip start
          >
            {/* Back side of the card */}
            <Animatable.Image
              animation="tada"
              iterationCount="infinite" // loputon idle animaatio
              duration={5000}
              source={require('../../assets/images/backside.jpg')}
              style={[styles.image, { width: imageWidth, height: imageHeight }]}
            />

            {/* Front side of the card */}
            <Animatable.Image
              source={{
                uri: tarotCard.Image,
              }}
              style={[
                styles.image,
                { width: imageWidth, height: imageHeight },
                flipped && { transform: [{ scaleX: -1 }] },
              ]}
            />
          </FlipCard>

          {flipped && (
            <View>
              <Text style={styles.keywords}>{tarotCard.Keywords}</Text>

              <AnimoituTeksti style={styles.box}>
                <Collapsible
                  title="Description"
                  isOpen={openIndex === 0}
                  onToggle={() => handleToggle(0)}
                >
                  <Animatable.Text
                    animation={{
                      from: {
                        translateY: -25,
                        opacity: 0,
                      },
                      to: {
                        translateY: 0,
                        opacity: 1,
                      },
                    }}
                    duration={1000}
                    style={styles.normalFont}
                  >
                    {tarotCard.Desc}
                  </Animatable.Text>
                </Collapsible>
                {tarotCard.Money && (
                  <Collapsible
                    title="Money"
                    isOpen={openIndex === 1}
                    onToggle={() => handleToggle(1)}
                  >
                    <Animatable.Text
                      animation={{
                        from: {
                          translateY: -25,
                          opacity: 0,
                        },
                        to: {
                          translateY: 0,
                          opacity: 1,
                        },
                      }}
                      duration={1000}
                      style={styles.normalFont}
                    >
                      {tarotCard.Money}
                    </Animatable.Text>
                  </Collapsible>
                )}
                {tarotCard.Love && (
                  <Collapsible
                    title="Love"
                    isOpen={openIndex === 2}
                    onToggle={() => handleToggle(2)}
                  >
                    <Animatable.Text
                      animation={{
                        from: {
                          translateY: -25,
                          opacity: 0,
                        },
                        to: {
                          translateY: 0,
                          opacity: 1,
                        },
                      }}
                      duration={1000}
                      style={styles.normalFont}
                    >
                      {tarotCard.Love}
                    </Animatable.Text>
                  </Collapsible>
                )}
              </AnimoituTeksti>
            </View>
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
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
    maxHeight: '90%',
    resizeMode: 'contain',
  },
  box: {
    margin: 15,
    width: '90%',
  },
  keywords: {
    fontFamily: 'Kadwa_400Regular',
    color: 'white',
    fontSize: 20,
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginHorizontal: 30,
    justifyContent: 'center',
    marginTop: -30,
  },
});

export default Tarot;
