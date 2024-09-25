import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore doc and getDoc functions
import { db } from '../../firebaseConfig'; // Import your Firestore config
import Teksti from '@/components/Textbox';

function MineralData({ route, navigation }: { route: any; navigation: any }) {
  const { itemId } = route.params; // Get the itemId from the route params
  const [mineral, setMineral] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch a specific mineral by its ID
    const fetchMineralById = async (id: string) => {
      try {
        // Reference to the specific document using the mineral ID
        const mineralDocRef = doc(db, 'Mineral', id);

        // Fetch the document from Firestore
        const mineralDoc = await getDoc(mineralDocRef);

        // Check if the document exists and set the mineral state
        if (mineralDoc.exists()) {
          setMineral(mineralDoc.data()); // Set the mineral data
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching mineral:', error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    // Fetch the mineral when the component mounts
    fetchMineralById(itemId);
  }, [itemId]);

  // Display a loading spinner while fetching data
  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  // If mineral is null, show an error message
  if (!mineral) {
    return <Text>Mineral data not found!</Text>;
  }

  // Render the mineral data once it's fetched
  return (
    <View style={styles.background}>
      {/* Render the mineral's name */}
      <Image source={require('../../assets/images/mineral_icon.png')}></Image>
      <Text style={styles.headerbig}>{mineral.Name}</Text>

      {/* Render the mineral's Description */}

      {/* Render the mineral's Chakra */}

      <Text style={styles.header}>Chakra: </Text>
      <Text style={styles.headertext}>{mineral.Chakra}</Text>

      {/* Render the mineral's horoscope */}

      <Text style={styles.header}>Horoscope: </Text>
      <Text style={styles.headertext}>{mineral.Horoscope}</Text>

      <Teksti style={styles.box}>
        <Text style={styles.normalFont}>{mineral.Desc}</Text>
      </Teksti>
    </View>
  );
}

// Styling

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#3F3154',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerbig: {
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    paddingBottom: 40,
  },
  header: {
    fontSize: 25,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    alignSelf: 'center',
  },
  headertext: {
    fontSize: 23,
    fontFamily: 'Kadwa_400Regular',
    color: 'white',
    textAlign: 'center',
    width: '85%',
    alignSelf: 'center',
    marginHorizontal: 10,
    paddingBottom: 30,
  },
  normalFont: {
    fontFamily: 'Kadwa_400Regular',
    color: 'white',
    fontSize: 17,
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    textAlign: 'center',
  },
  box: { width: '95%' },
});

export default MineralData;
