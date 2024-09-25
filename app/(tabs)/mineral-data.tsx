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
      <Text style={styles.header}>{mineral.Name}</Text>

      {/* Render the mineral's Description */}

      {/* Render the mineral's Chakra */}
      <Text style={styles.header}>Chakra:</Text>
      <Text style={styles.normalFont}>{mineral.Chakra}</Text>

      {/* Render the mineral's horoscope */}
      <Text style={styles.header}>Horoscope:</Text>
      <Text style={styles.normalFont}>{mineral.Horoscope}</Text>

      <Teksti>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  stonebox: {
    backgroundColor: '#918998',
    borderColor: '#ACA3AF',
    borderWidth: 4,
    height: '65%',
    width: '90%',
    margin: 15,
  },
  header: {
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    marginHorizontal: 40,
    height: '20%',
  },
  normalFont: {
    fontFamily: 'Kadwa_400Regular',
    color: 'white',
  },
});

export default MineralData;
