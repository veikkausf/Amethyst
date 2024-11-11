import React, { useEffect, useState } from 'react';
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

interface DiaryEntry {
  header: string;
  text: string;
  timestamp: string;
}

const DiaryPrevious: React.FC = () => {
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

      setEntries(diaryEntries); // Päivitetään state ladatuilla merkinnöillä
    } catch (e) {
      console.error('Could not load diary entries', e);
    }
  };

  useEffect(() => {
    loadEntries(); // Ladataan useEffectillä merkinnät
  }, []);

  // Tehdään timeStampista luettavampaa historia-sivulla (olis pitänyt käyttää moment.js)
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    // Saatetaan muokata vielä
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', // Viikonpäivä
      year: 'numeric', // Vuosi
      month: 'long', // Kuukauden nimi
      day: 'numeric', // Päivä numerona
    };
    return date.toLocaleDateString('en-US', options); // Tapa merkata pvm
  };

  // Handle press on a diary entry
  const handlePress = (entry: DiaryEntry) => {
    setSelectedEntry(entry); // Modaaliin näytettävä sisältö
    setModalVisible(true); // Modaalin näyttö
  };

  // Merkinnän poistaminen tietokannasta
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
            <Text style={styles.modalText}>{selectedEntry?.text}</Text>
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
// IHAN KESKEN TYYLIT
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F3154',
    paddingHorizontal: width * 0.05,
  },
  scrollView: {
    marginTop: 20,
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
    fontWeight: 'bold',
    fontFamily: 'Kadwa_400Regular',
    flex: 1, // Make header text take available space
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
    marginLeft: 10,
  },

  noEntriesText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: width * 0.8,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#bbb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
});

export default DiaryPrevious;
