import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  Modal,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
interface DiaryScreenProps {
  navigation: any;
}
interface DiaryEntry {
  header: string;
  text: string;
  timestamp: string;
}

const DiaryPrevious: React.FC<DiaryScreenProps> = ({ navigation }) => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

  // Ladataan päiväkirjamerkinnät asyncStoragesta
  const loadEntries = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys(); // Otetaan avaimet AsyncStoragesta
      const diaryEntries: DiaryEntry[] = [];

      // Iteroidaan avaimet ja löydetään oikea per merkintä
      for (let key of allKeys) {
        if (key.startsWith('diaryHeader_')) {
          // Vaan avaimet, jotka alkaa "diaryHeader"
          const header = await AsyncStorage.getItem(key);
          const textKey = key.replace('diaryHeader_', 'diaryText_'); // Löydetään sopiva key
          const text = await AsyncStorage.getItem(textKey);

          if (header && text) {
            diaryEntries.push({
              header: header,
              text: text,
              timestamp: key.replace('diaryHeader_', ''), // Timestamppi avaimesta
            });
          }
        }
      }
      diaryEntries.sort((a, b) => {
        return (
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      });
      setEntries(diaryEntries); // Päivitetään state ladatuilla merkinnöillä
    } catch (e) {
      console.error('Could not load diary entries', e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadEntries(); // Load diary entries when screen is focused
    }, [])
  );

  // Tehdään timeStampista luettavampaa historia-sivulla (olis pitänyt käyttää moment.js)
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    // Saatetaan muokata vielä
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', // Viikonpäivä
      year: 'numeric', // Vuosi
      month: 'numeric', // Kuukauden nimi
      day: 'numeric', // Päivä numerona
    };
    return date.toLocaleDateString('en-US', options); // Tapa merkata pvm
  };

  // Handle press on a diary entry
  const handlePress = (entry: DiaryEntry) => {
    setSelectedEntry(entry); // Modaaliin näytettävä sisältö
    setModalVisible(true); // Modaalin näyttö
  };

  // Merkinnän poistaminen
  const handleDelete = async (timestamp: string) => {
    // Kysytään, ollaanko varmoja
    Alert.alert('Are you sure?', 'Do you really want to delete this entry?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          try {
            // Poistetaan
            await AsyncStorage.removeItem(`diaryHeader_${timestamp}`);
            await AsyncStorage.removeItem(`diaryText_${timestamp}`);

            // Päivitetään merkinnät poiston jälkeen
            loadEntries();
          } catch (e) {
            console.error('Error deleting the entry:', e);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image
          source={require('../../assets/images/book2.png')}
          style={styles.image}
        ></Image>
        {/* Jos ei merkintöjä */}
        {entries.length === 0 ? (
          <Text style={styles.noEntriesText}>
            Your diary entries will appear here
          </Text>
        ) : (
          entries.map((entry) => (
            <Pressable
              key={entry.timestamp}
              style={styles.entryBox}
              onPress={() => handlePress(entry)}
            >
              <View style={styles.entryHeaderContainer}>
                {/* Merkinnän otsikko listan itemissä */}
                <Text style={styles.entryHeader}>{entry.header}</Text>
                <Pressable onPress={() => handleDelete(entry.timestamp)}>
                  <Image
                    source={require('../../assets/images/trash-can.png')} // Poisto asyncStoragesta
                    style={styles.trashIcon}
                  />
                </Pressable>
              </View>
              {/* PVM */}
              <Text style={styles.entryText}>
                {formatDate(entry.timestamp)}
              </Text>
            </Pressable>
          ))
        )}
      </ScrollView>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('NewDiary')}
      >
        <Text style={styles.header}>New Page</Text>
      </Pressable>

      {/* Modaali, jossa näytetään itse merkintä */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>{selectedEntry?.header}</Text>
            <ScrollView style={styles.scroll}>
              <Text style={styles.modalText}>{selectedEntry?.text}</Text>
            </ScrollView>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F3154',
    paddingHorizontal: width * 0.05,
    justifyContent: 'center',
  },
  scrollView: {
    marginTop: 20,
    flex: 1,
    marginBottom: 120,
  },
  entryBox: {
    backgroundColor: 'rgba(145, 137, 152, 0.5)',
    borderColor: '#ACA3AF',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
  },
  entryHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  entryHeader: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Kadwa_400Regular',
    flex: 1,
  },
  entryText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Kadwa_400Regular',
    lineHeight: 22,
  },
  trashIcon: {
    width: 35,
    height: 35,
    marginLeft: '2%',
    top: '50%',
  },

  noEntriesText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 30,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    backgroundColor: '#3F3154',
    borderRadius: 10,
    padding: 20,
    width: width * 0.8,
    alignItems: 'center',
    maxHeight: '75%',
    justifyContent: 'center',
  },
  modalHeader: {
    fontSize: 24,
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Kadwa_700Bold',
  },
  scroll: {
    borderWidth: 3,
    borderColor: '#ACA3AF',
    borderRadius: 10,
  },
  modalText: {
    padding: 20,
    backgroundColor: 'rgba(145, 137, 152, 0.4)',
    alignItems: 'center',
    color: 'white',
    minWidth: '80%',
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
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: '#918998',
    position: 'absolute',
    bottom: 5,
    borderColor: '#B88EEE',
    borderRadius: 10,
    borderWidth: 3,
    height: 100,
    justifyContent: 'center',
  },
  header: {
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'Kadwa_400Regular',
    textAlign: 'center', // Center-align text to fit better on screen
    textShadowColor: 'black',
    textShadowOffset: { width: -2, height: 1 },
    textShadowRadius: 15,
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default DiaryPrevious;
