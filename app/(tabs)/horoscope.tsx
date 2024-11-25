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
} from 'react-native';
import HoroscopeButton from '@/components/HoroscopeButton';
import Teksti from '@/components/Textbox';
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
    date: 'March 21 - April 19',
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
  const { userBirthday } = route.params || {}; // Safely access route params
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedHoroscope, setSelectedHoroscope] = useState<BoxItem | null>(
    null
  );
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [horoscopeText, setHoroscopeText] = useState<string>(''); // State for the horoscope text
  const [horoscopeImage, setHoroscopeImage] = useState<any>(
    require('../../assets/images/virgo.png') //placeholder image
  );

  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Check if userBirthday is valid
  if (!userBirthday) {
    console.error('User birthday data is missing');
    return (
      <View>
        <Text>Error: Missing birthday data.</Text>
      </View>
    );
  }

  // Safely handle userBirthday before destructuring
  let birthday = { day: 0, month: 0 }; // Default values if userBirthday is invalid

  if (userBirthday) {
    if (typeof userBirthday === 'string') {
      // If it's a string (e.g., "1998-05-20"), parse it into a Date object
      const date = new Date(userBirthday);
      birthday = { day: date.getDate(), month: date.getMonth() + 1 }; // Convert to day and month
    } else {
      // If it's already an object with day and month
      birthday = userBirthday;
    }
  }

  const { day, month } = birthday;

  // Function to check if the user's birthday is within the date range
  const isBirthdayInRange = (
    startDate: { day: number; month: number },
    endDate: { day: number; month: number }
  ): boolean => {
    if (
      startDate.month < endDate.month ||
      (startDate.month === endDate.month && startDate.day <= endDate.day)
    ) {
      return (
        (month > startDate.month ||
          (month === startDate.month && day >= startDate.day)) &&
        (month < endDate.month ||
          (month === endDate.month && day <= endDate.day))
      );
    }

    return (
      month > startDate.month ||
      (month === startDate.month && day >= startDate.day) ||
      month < endDate.month ||
      (month === endDate.month && day <= endDate.day)
    );
  };

  // Find the matching horoscope based on the user's birthday
  // Find the matching horoscope based on the user's birthday
  useEffect(() => {
    const matchingHoroscope = data.find((item) =>
      isBirthdayInRange(item.dates.startDate, item.dates.endDate)
    );
    if (matchingHoroscope) {
      setHoroscopeText(matchingHoroscope.id);
      setHoroscopeImage(matchingHoroscope.image);
    } else {
      setHoroscopeText('No matching horoscope found');
      setHoroscopeImage(null);
    }
  }, [day, month]);

  return (
    <View style={styles.background}>
      <ScrollView>
        <Text style={styles.header}>
          Your <Text style={styles.normalFont}>sun sign:</Text>
        </Text>
        <HoroscopeButton
          key={horoscopeText}
          title={horoscopeText} // Passing the ID of the matched horoscope
          img={horoscopeImage} // Passing the image of the matched horoscope
          onPress={() =>
            navigation.navigate('HoroscopeData', {
              itemId: horoscopeText, // Pass the ID to the next screen
              itemImage: horoscopeImage, // Pass the image to the next screen
            })
          }
        />
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
            onLongPress={(event) => {
              const { pageX, pageY } = event.nativeEvent;

              // Laskelmoidaan modaalin position, ettei overlappaa "ruudun ohi"
              const modalX = Math.min(pageX - 40, screenWidth - 210);
              const modalY = Math.min(pageY - 175, screenHeight - 110);

              Vibration.vibrate(100);

              setSelectedHoroscope(item);
              setModalPosition({ x: modalX, y: modalY });
              setIsModalVisible(true);
            }}
            onPressOut={closeModal} // Kun käyttäjä ei pidä nappia phjassa modaali sulkeutuu
          />
        ))}
      </ScrollView>

      {/* Moddaali joka näyttää päivämäärän */}
      <Modal transparent={true} visible={isModalVisible} animationType="fade">
        <View style={[{ top: modalPosition.y, left: modalPosition.x }]}>
          <View>
            {selectedHoroscope && (
              <Teksti style={styles.box}>
                <Text>{selectedHoroscope.id}</Text>
                <Text>{selectedHoroscope.date}</Text>
              </Teksti>
            )}
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
    backgroundColor: '#918998',
    width: '50%',
  },
  header: {
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    marginLeft: 10,
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
  },
  image: {
    alignSelf: 'flex-end',
  },
  rowContainer: {
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center', // Align items vertically in the center
  },
});

export default Horoscope;
