import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import AnimoituTeksti from '@/components/AnimatedTextbox';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '@/components/loading';
import FlipCard from 'react-native-flip-card';
import { Collapsible } from '@/components/Collapsible';
import * as Animatable from 'react-native-animatable';
import tarotData from '../../tarot.json'; // Import the JSON file

type TarotCard = {
  id: string;
  Name: string;
  Desc: string;
  Money?: string;
  Love?: string;
  Image: string;
  Keywords: string;
} | null;

// Map card IDs to their images using require()
const imageMap: { [key: string]: any } = {
  'The Empress': require('../../assets/images/Tarot/the_empress.jpg'),
  'The Sun': require('../../assets/images/Tarot/the_sun.jpg'),
  "Death" : require('../../assets/images/Tarot/the_death.jpg'),
  'The Tower': require('../../assets/images/Tarot/the_tower.jpg'),
  "Strength" : require('../../assets/images/Tarot/the_strength.jpg'),
  'The Star': require('../../assets/images/Tarot/the_star.jpg'),
  "Judgement" : require('../../assets/images/Tarot/judgement.jpg'),
  'The Hermit': require('../../assets/images/Tarot/the_hermit.jpg'),
  "Justice" : require('../../assets/images/Tarot/justice.jpg'),
  'The Hierophant': require('../../assets/images/Tarot/the_hierophant.jpg'),
  'The Emperor': require('../../assets/images/Tarot/the_empreror.jpg'),
  'The Fool': require('../../assets/images/Tarot/the_fool.jpg'),
  'The Lovers': require('../../assets/images/Tarot/the_lovers.jpg'),
  'The Magician': require('../../assets/images/Tarot/the_magician.jpg'),
  'The High Priestess': require('../../assets/images/Tarot/the_high_priestess.jpg'),
  'The Chariot': require('../../assets/images/Tarot/the_chariot.jpg'),
  'The Devil': require('../../assets/images/Tarot/the_devil.jpg'),
  'The Moon': require('../../assets/images/Tarot/the_moon.jpg'),
  "Temperance" : require('../../assets/images/Tarot/temperance.jpg'),
  'The Hanged Man': require('../../assets/images/Tarot/the_hanged_man.jpg'),
  'The World': require('../../assets/images/Tarot/the_world.jpg'),
  'Wheel of Fortune': require('../../assets/images/Tarot/wheel_of_fortune.jpg'),
  'Ace of Pentacles': require('../../assets/images/Tarot/ace_of_pentacles.jpg'),
  'Two of Pentacles': require('../../assets/images/Tarot/two_of_pentacles.jpg'),
  'Three of Pentacles': require('../../assets/images/Tarot/three_of_pentacles.jpg'),
  'Four of Pentacles': require('../../assets/images/Tarot/four_of_pentacles.jpg'),
  'Five of Pentacles': require('../../assets/images/Tarot/five_of_pentacles.jpg'),
  'Six of Pentacles': require('../../assets/images/Tarot/six_of_pentacles.jpg'),
  'Seven of Pentacles': require('../../assets/images/Tarot/seven_of_pentacles.jpg'),
  'Eight of Pentacles': require('../../assets/images/Tarot/eight_of_pentacles.jpg'),
  'Nine of Pentacles': require('../../assets/images/Tarot/nine_of_pentacles.jpg'),
  'Ten of Pentacles': require('../../assets/images/Tarot/ten_of_pentacles.jpg'),
  'Page of Pentacles': require('../../assets/images/Tarot/page_of_pentacles.jpg'),
  'Knight of Pentacles': require('../../assets/images/Tarot/knight_of_pentacles.jpg'),
  'Queen of Pentacles': require('../../assets/images/Tarot/queen_of_pentacles.jpg'),
  'King of Pentacles': require('../../assets/images/Tarot/king_of_pentacles.jpg'),
  'Ace of Swords': require('../../assets/images/Tarot/ace_of_swords.jpg'),
  'Two of Swords': require('../../assets/images/Tarot/two_of_swords.jpg'),
  'Three of Swords': require('../../assets/images/Tarot/three_of_swords.jpg'),
  'Four of Swords': require('../../assets/images/Tarot/four_of_swords.jpg'),
  'Five of Swords': require('../../assets/images/Tarot/five_of_swords.jpg'),
  'Six of Swords': require('../../assets/images/Tarot/six_of_swords.jpg'),
  'Seven of Swords': require('../../assets/images/Tarot/seven_of_swords.jpg'),
  'Eight of Swords': require('../../assets/images/Tarot/eight_of_swords.jpg'),
  'Nine of Swords': require('../../assets/images/Tarot/nine_of_swords.jpg'),
  'Ten of Swords': require('../../assets/images/Tarot/ten_of_swords.jpg'),
  'Page of Swords': require('../../assets/images/Tarot/page_of_swords.jpg'),
  'Knight of Swords': require('../../assets/images/Tarot/knight_of_swords.jpg'),
  'Queen of Swords': require('../../assets/images/Tarot/queen_of_swords.jpg'),
  'King of Swords': require('../../assets/images/Tarot/king_of_swords.jpg'),
  'Ace of Cups': require('../../assets/images/Tarot/ace_of_cups.jpg'),
  'Two of Cups': require('../../assets/images/Tarot/two_of_cups.jpg'),
  'Three of Cups': require('../../assets/images/Tarot/three_of_cups.jpg'),
  'Four of Cups': require('../../assets/images/Tarot/four_of_cups.jpg'),
  'Five of Cups': require('../../assets/images/Tarot/five_of_cups.jpg'),
  'Six of Cups': require('../../assets/images/Tarot/six_of_cups.jpg'),
  'Seven of Cups': require('../../assets/images/Tarot/seven_of_cups.jpg'),
  'Eight of Cups': require('../../assets/images/Tarot/eight_of_cups.jpg'),
  'Nine of Cups': require('../../assets/images/Tarot/nine_of_cups.jpg'),
  'Ten of Cups': require('../../assets/images/Tarot/ten_of_cups.jpg'),
  'Page of Cups': require('../../assets/images/Tarot/page_of_cups.jpg'),
  'Knight of Cups': require('../../assets/images/Tarot/knight_of_cups.jpg'),
  'Queen of Cups': require('../../assets/images/Tarot/queen_of_cups.jpg'),
  'King of Cups': require('../../assets/images/Tarot/king_of_cups.jpg'),
  'Ace of Wands': require('../../assets/images/Tarot/ace_of_wands.jpg'),
  'Two of Wands': require('../../assets/images/Tarot/two_of_wands.jpg'),
  'Three of Wands': require('../../assets/images/Tarot/three_of_wands.jpg'),
  'Four of Wands': require('../../assets/images/Tarot/four_of_wands.jpg'),
  'Five of Wands': require('../../assets/images/Tarot/five_of_wands.jpg'),
  'Six of Wands': require('../../assets/images/Tarot/six_of_wands.jpg'),
  'Seven of Wands': require('../../assets/images/Tarot/seven_of_wands.jpg'),
  'Eight of Wands': require('../../assets/images/Tarot/eight_of_wands.jpg'),
  'Nine of Wands': require('../../assets/images/Tarot/nine_of_wands.jpg'),
  'Ten of Wands': require('../../assets/images/Tarot/ten_of_wands.jpg'),
  'Page of Wands': require('../../assets/images/Tarot/page_of_wands.jpg'),
  'Knight of Wands': require('../../assets/images/Tarot/knight_of_wands.jpg'),
  'Queen of Wands': require('../../assets/images/Tarot/queen_of_wands.jpg'),
  'King of Wands': require('../../assets/images/Tarot/king_of_wands.jpg'),
};
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
    // Load tarot cards from the JSON file
    const cards = tarotData.Tarot as TarotCard[];
    setTarotCards(cards);
    loadStoredTarotCard(cards);
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleFlipStart = () => {
    setFlipped((prev) => !prev); // Toggle flipped state
  };

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
              source={imageMap[tarotCard.id]} // Use the image map
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
