import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore'; // Firestore importit
import { db } from '../../firebaseConfig';
import Teksti from '@/components/Textbox';
import Loader from '@/components/loading';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

function MineralData({ route, navigation }: { route: any; navigation: any }) {
  const { itemId } = route.params;
  const { itemImage } = route.params;
  const [mineral, setMineral] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleInfo = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const fetchMineralById = async (id: string) => {
      try {
        const mineralDocRef = doc(db, 'Mineral', id);
        const mineralDoc = await getDoc(mineralDocRef);
        if (mineralDoc.exists()) {
          setMineral(mineralDoc.data());
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching mineral:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMineralById(itemId);
  }, [itemId]);

  if (loading) {
    return <Loader />;
  }

  if (!mineral) {
    return <Text>Mineral data not found!</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Image with proper resizing */}
        <Image
          source={{
            uri: mineral.Image,
          }}
          style={styles.image}
        ></Image>
        <Text style={styles.headerbig}>{mineral.Name}</Text>
        <View style={styles.imagebox}>
          <Image
            source={require('../../assets/images/Icon_crystal_left.png')}
          ></Image>
          <Pressable onPress={handleInfo}>
            <Text style={styles.info}>ⓘ</Text>
            <Text style={styles.header}>Chakra: </Text>
          </Pressable>
          <Image
            source={require('../../assets/images/Icon_crystal_right.png')}
          ></Image>
        </View>
        <Text style={styles.headertext}>{mineral.Chakra}</Text>

        <Text style={styles.header}>Horoscope: </Text>
        <Text style={styles.headertext}>{mineral.Horoscope}</Text>

        <Teksti style={styles.box}>
          <Text style={styles.normalFont}>{mineral.Desc}</Text>
        </Teksti>
      </ScrollView>
      <Modal
        visible={showModal}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}> What are chakras?</Text>
            <Text style={styles.modalText}>
              Crystals connect with chakras and zodiac signs to support energy
              healing and balance. Each chakra corresponds to specific crystals
              (e.g., Amethyst for the Crown Chakra) to restore energy flow. In
              astrology, crystals align with zodiac traits (e.g., Aquamarine
              enhances Pisces' intuition). By combining chakra work and
              astrological insights, crystals help harmonize your energy and
              amplify personal strengths. Perfect for spiritual growth and
              balance!
            </Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F3154',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    width: width * 0.4, // Käytetään dimensions-kirjastoa responsiivisuuteen
    height: width * 0.4,
    maxWidth: 200,
    maxHeight: 200,
    minWidth: 100,
    minHeight: 100,
  },
  info: {
    fontSize: 30,
    fontFamily: 'Kadwa_400Regular',
    color: 'white',
    textAlign: 'center',
  },
  headerbig: {
    fontSize: 35,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    textAlign: 'center',
  },
  header: {
    fontSize: 25,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    textAlign: 'center',
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
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  box: {
    width: '95%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContainer: {
    backgroundColor: '#3F3154',
    borderRadius: 10,
    padding: 20,
    width: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeader: {
    fontSize: 24,
    color: 'white',
    marginBottom: 15,
    fontFamily: 'Kadwa_700Bold',
  },
  modalText: {
    padding: 20,
    borderWidth: 3,
    borderColor: '#ACA3AF',
    borderRadius: 10,
    backgroundColor: 'rgba(145, 137, 152, 0.4)',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Kadwa_400Regular',
  },
  closeButton: {
    backgroundColor: '#3F3154',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20,
    borderWidth: 3,
    borderColor: '#ACA3AF',
  },
  closeButtonText: {
    color: '#fff',
    fontFamily: 'Kadwa_400Regular',
  },
  imagebox: {
    flex: 1,
    resizeMode: 'contain',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});

export default MineralData;
