import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import HoroscopeButton from '@/components/HoroscopeButton';
import Teksti from '@/components/Textbox';

// Type for horoscope items
type BoxItem = {
  id: string;
  image: any;
  dates: string;
};

// Names and images for horoscope buttons
const data: BoxItem[] = [
  {
    id: 'Capricorn',
    image: require('../../assets/images/capricorn.png'),
    dates: 'December 22 - January 19',
  },
  {
    id: 'Aquarius',
    image: require('../../assets/images/aquarius.png'),
    dates: 'January 20 - February 18',
  },
  {
    id: 'Pisces',
    image: require('../../assets/images/pisces.png'),
    dates: 'February 19 - March 20',
  },
  {
    id: 'Aries',
    image: require('../../assets/images/aries.png'),
    dates: 'March 21 - April 19',
  },
  {
    id: 'Taurus',
    image: require('../../assets/images/taurus.png'),
    dates: 'April 20 - May 20',
  },
  {
    id: 'Gemini',
    image: require('../../assets/images/gemini.png'),
    dates: 'May 21 - June 20',
  },
  {
    id: 'Cancer',
    image: require('../../assets/images/cancer.png'),
    dates: 'June 21 - July 22',
  },
  {
    id: 'Leo',
    image: require('../../assets/images/leo.png'),
    dates: 'July 23 - August 22',
  },
  {
    id: 'Virgo',
    image: require('../../assets/images/virgo.png'),
    dates: 'August 23 - September 22',
  },
  {
    id: 'Libra',
    image: require('../../assets/images/libra.png'),
    dates: 'September 23 - October 22',
  },
  {
    id: 'Scorpio',
    image: require('../../assets/images/scorpio.png'),
    dates: 'October 23 - November 21',
  },
  {
    id: 'Sagittarius',
    image: require('../../assets/images/sagittarius.png'),
    dates: 'November 22 - December 21',
  },
];
const { width: screenWidth } = Dimensions.get('window'); // Get screen width

function Horoscopes({ navigation }: { navigation: any }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedHoroscope, setSelectedHoroscope] = useState<BoxItem | null>(
    null
  );
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // Function to handle closing of modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.grid}>
        <Text style={styles.header}>
          What's <Text style={styles.normalFont}>your sun sign?</Text>
        </Text>
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

              // Calculate modal position, adjusting for screen bounds
              const modalX = Math.min(pageX - 40, screenWidth - 210); // 200 is the width of the modal, adjust as needed
              const modalY = pageY - 100; // Adjust as needed

              setSelectedHoroscope(item);
              setModalPosition({ x: modalX, y: modalY });
              setIsModalVisible(true);
            }}
            onPressOut={closeModal} // Pass closeModal to onPressOut
          />
        ))}
      </ScrollView>

      {/* Modal to show horoscope dates */}
      <Modal transparent={true} visible={isModalVisible} animationType="fade">
        <View style={[{ top: modalPosition.y, left: modalPosition.x }]}>
          <View>
            {selectedHoroscope && (
              <>
                <Teksti style={styles.box}>
                  <Text>{selectedHoroscope.id}</Text>
                  <Text>{selectedHoroscope.dates}</Text>
                </Teksti>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  header: {
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    marginHorizontal: 40,
  },
  normalFont: {
    fontFamily: 'Kadwa_400Regular',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Horoscopes;
