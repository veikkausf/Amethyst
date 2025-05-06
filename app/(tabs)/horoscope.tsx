import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  Dimensions,
  Vibration,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HoroscopeButton from '@/components/HoroscopeButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';

type BoxItem = {
  id: string;
  image: any;
  dates: {
    startDate: { day: number; month: number };
    endDate: { day: number; month: number };
  };
  date: string;
};

const data: BoxItem[] = [
  {
    id: 'Capricorn',
    image: require('../../assets/images/capricorn.png'),
    dates: {
      startDate: { day: 22, month: 12 },
      endDate: { day: 19, month: 1 },
    },
    date: 'December 22 - January 19',
  },
  {
    id: 'Aquarius',
    image: require('../../assets/images/aquarius.png'),
    dates: {
      startDate: { day: 20, month: 1 },
      endDate: { day: 18, month: 2 },
    },
    date: 'January 20 - February 18',
  },
  {
    id: 'Pisces',
    image: require('../../assets/images/pisces.png'),
    dates: {
      startDate: { day: 19, month: 2 },
      endDate: { day: 20, month: 3 },
    },
    date: 'February 19 - March 20',
  },
  {
    id: 'Aries',
    image: require('../../assets/images/aries.png'),
    dates: {
      startDate: { day: 21, month: 3 },
      endDate: { day: 19, month: 4 },
    },
    date: 'March 21 - April 19',
  },
  {
    id: 'Taurus',
    image: require('../../assets/images/taurus.png'),
    dates: {
      startDate: { day: 20, month: 4 },
      endDate: { day: 20, month: 5 },
    },
    date: 'April 20 - May 20',
  },
  {
    id: 'Gemini',
    image: require('../../assets/images/gemini.png'),
    dates: {
      startDate: { day: 21, month: 5 },
      endDate: { day: 20, month: 6 },
    },
    date: 'May 21 - June 20',
  },
  {
    id: 'Cancer',
    image: require('../../assets/images/cancer.png'),
    dates: {
      startDate: { day: 21, month: 6 },
      endDate: { day: 22, month: 7 },
    },
    date: 'June 21 - July 22',
  },
  {
    id: 'Leo',
    image: require('../../assets/images/leo.png'),
    dates: {
      startDate: { day: 23, month: 7 },
      endDate: { day: 22, month: 8 },
    },
    date: 'July 23 - August 22',
  },
  {
    id: 'Virgo',
    image: require('../../assets/images/virgo.png'),
    dates: {
      startDate: { day: 23, month: 8 },
      endDate: { day: 22, month: 9 },
    },
    date: 'August 23 - September 22',
  },
  {
    id: 'Libra',
    image: require('../../assets/images/libra.png'),
    dates: {
      startDate: { day: 23, month: 9 },
      endDate: { day: 22, month: 10 },
    },
    date: 'September 23 - October 22',
  },
  {
    id: 'Scorpio',
    image: require('../../assets/images/scorpio.png'),
    dates: {
      startDate: { day: 23, month: 10 },
      endDate: { day: 21, month: 11 },
    },
    date: 'October 23 - November 21',
  },
  {
    id: 'Sagittarius',
    image: require('../../assets/images/sagittarius.png'),
    dates: {
      startDate: { day: 22, month: 11 },
      endDate: { day: 21, month: 12 },
    },
    date: 'November 22 - December 21',
  },
];

const { width: screenWidth } = Dimensions.get('window'); // Get screen width
const { height: screenHeight } = Dimensions.get('window'); // Get screen height

type HoroscopeProps = StackScreenProps<RootStackParamList, 'Horoscope'>;

const Horoscope = ({ route, navigation }: HoroscopeProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedHoroscope, setSelectedHoroscope] = useState<BoxItem | null>(
    null
  );

  useEffect(() => {
    const checkFirstTime = async () => {
      const hasSeenPopup = await AsyncStorage.getItem('hasSeenPopup');
      if (!hasSeenPopup) {
        setIsModalVisible(true); // Show the modal if it's the first time
      } else {
        const savedHoroscope = await AsyncStorage.getItem('selectedHoroscope');
        if (savedHoroscope) {
          const parsedHoroscope = JSON.parse(savedHoroscope);
          setSelectedHoroscope(parsedHoroscope);
        }
      }
    };
    checkFirstTime();
  }, []);

  // Function to handle the selection of a horoscope
  const handleSelectHoroscope = async (horoscope: BoxItem) => {
    setSelectedHoroscope(horoscope); // Update the state with the selected horoscope
    await AsyncStorage.setItem('selectedHoroscope', JSON.stringify(horoscope)); // Save the selected horoscope to AsyncStorage
    await AsyncStorage.setItem('hasSeenPopup', 'true'); // Set a flag in AsyncStorage to indicate the popup has been seen
    setIsModalVisible(false); // Close the modal after selection
  };

  // Function to reset the selected horoscope
  const handleResetHoroscope = async () => {
    await AsyncStorage.removeItem('selectedHoroscope'); // Remove the saved horoscope from AsyncStorage
    await AsyncStorage.removeItem('hasSeenPopup'); // Remove the popup flag from AsyncStorage
    setSelectedHoroscope(null); // Reset the state to indicate no horoscope is selected
    setIsModalVisible(true); // Reopen the modal to allow the user to select a new horoscope
  };
  return (
    <View style={styles.background}>
      <ScrollView>
        <Text style={styles.header}>
          Your <Text style={styles.normalFont}>sun sign:</Text>
        </Text>
        {selectedHoroscope && (
          <HoroscopeButton
            key={selectedHoroscope.id}
            title={selectedHoroscope.id}
            img={selectedHoroscope.image}
            onPress={() =>
              navigation.navigate('HoroscopeData', {
                itemId: selectedHoroscope.id,
                itemImage: selectedHoroscope.image,
              })
            }
          />
        )}
        <View style={[styles.rowContainer]}>
          <Text style={styles.smallheader}>Other signs:</Text>
          <Image
            style={styles.image}
            source={require('../../assets/images/Icon_crystal.png')}
          ></Image>
        </View>
        {data.map((item) => (
          <HoroscopeButton
            key={item.id}
            title={item.id}
            img={item.image}
            onPress={() =>
              navigation.navigate('HoroscopeData', {
                itemId: item.id,
                itemImage: item.image,
              })
            }
          />
        ))}
        <TouchableOpacity style={styles.reset} onPress={handleResetHoroscope}>
          <Text style={styles.resettext}>Reset Your Horoscope</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* Modal to select horoscope */}
      <Modal transparent={true} visible={isModalVisible} animationType="slide">
        {/* Overlay to dim the background */}
        <View style={styles.modalOverlay}>
          {/* Box containing the modal content */}
          <View style={styles.box}>
            {/* Header text for the modal */}
            <Text style={styles.header}>Select your horoscope:</Text>
            {/* FlatList to render the list of horoscopes */}
            <FlatList
              data={data} // Data source for the list
              keyExtractor={(item) => item.id} // Unique key for each item
              renderItem={({ item }) => (
                // Render each horoscope as a button
                <HoroscopeButton
                  key={item.id} // Unique key for the button
                  title={item.id} // Horoscope name
                  img={item.image} // Horoscope image
                  onPress={() => handleSelectHoroscope(item)} // Function to handle selection
                />
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#3F3154',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: '#3F3154',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    fontFamily: 'Kadwa_400Regular',
    marginBottom: screenHeight * 0.1,
    marginTop: screenHeight * 0.1,
  },
  reset: {
    backgroundColor: '#3F3154',
    width: '95%',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#918998',
    borderWidth: 2,
  },
  resettext: {
    fontFamily: 'Kadwa_400Regular',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    textAlign: 'center',
  },
  header: {
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    marginBottom: 10,
  },
  smallheader: {
    fontSize: 24,
    fontFamily: 'Kadwa_400Regular',
    color: 'white',
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 10,
  },
  normalFont: {
    fontFamily: 'Kadwa_400Regular',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  horoscopeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  selectedItem: {
    backgroundColor: '#FFD700',
  },
  horoscopeImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  horoscopeText: {
    fontSize: 18,
    fontFamily: 'Kadwa_400Regular',
  },
  image: {
    alignSelf: 'flex-end',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Horoscope;
