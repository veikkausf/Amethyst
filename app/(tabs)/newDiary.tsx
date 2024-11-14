import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  Alert,
  BackHandler,
} from 'react-native';
import Teksti from '@/components/Textbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface NewDiaryProps {
  navigation: any;
}

const NewDiary: React.FC<NewDiaryProps> = ({ navigation }) => {
  // Tilat
  const [header, setHeader] = React.useState('');
  const [text, setText] = React.useState('');
  // Jos koitetaan mennä takaisin puhelimen back-buttonilla, mutta ei tallennettu merkintää
  const handleBackPress = () => {
    // Jos tekstit kesken
    if (header || text) {
      // Varoitus
      Alert.alert(
        'Warning',
        'You have unsaved changes. Are you sure you want to cancel this diary entry?',
        [
          { text: 'Yes', onPress: () => navigation.goBack(), style: 'cancel' },
          { text: 'No', style: 'destructive' },
        ]
      );
      return true;
    }
    return false;
  };

  // Add the back handler when the screen is focused
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress
      );

      return () => backHandler.remove(); // Otetaan pois käytöstä event listener, kun unmountantaan
    }, [header, text])
  );

  // Alert, jos aikoo cancellaa
  const showAlert = () =>
    Alert.alert(
      'Warning',
      'Are you sure you want to cancel this diary entry?',
      [
        {
          text: 'Yes',
          onPress: () => navigation.goBack(),
          style: 'cancel',
        },
        { text: 'No' },
      ]
    );

  // Tallennetaan kirjoitetut tekstit asyncStorageen
  const saveDiary = async () => {
    if (!header || !text) {
      // Ei tallenneta, jos kentät tyhjiä
      Alert.alert('Error', 'Both header and text must be filled');
      return;
    }

    try {
      // Tallennetaan merkinnän aika
      const timestamp = new Date().toISOString(); // "yksilöllinen" aika per merkintä
      await AsyncStorage.setItem(`diaryHeader_${timestamp}`, header);
      await AsyncStorage.setItem(`diaryText_${timestamp}`, text);

      setHeader(''); // Tyhjät fieldit
      setText('');

      // Navigate back or to the Diary screen after saving
      navigation.goBack(); // use navigation.navigate('Diary') if you have a specific diary screen
    } catch (e) {
      console.error('Could not save diary data', e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        editable
        maxLength={20}
        style={styles.textInputSmall}
        placeholder="Header..."
        autoCapitalize="sentences"
        value={header}
        onChangeText={(text) => setHeader(text)}
      />

      <Teksti>
        <TextInput
          editable
          multiline
          autoCapitalize="sentences"
          numberOfLines={25}
          maxLength={10000}
          onChangeText={(text) => setText(text)}
          value={text}
          style={styles.textInputBig}
          placeholder="Write here about your dreams..."
          textAlignVertical={'top'}
          allowFontScaling
          scrollEnabled={true}
        />
      </Teksti>
      <View style={styles.buttonContainer}>
        <Pressable onPress={saveDiary} style={styles.saveButton}>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              fontFamily: 'Kadwa_400Regular',
            }}
          >
            Save
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3F3154',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: width * 0.05, // Responsive padding based on width
    paddingTop: height * 0.05, // Optional: Adjusts padding from the top, remove if you want it flush with the top
  },
  textInputBig: {
    padding: 10,
    backgroundColor: 'transparent',
    color: 'white',
    width: width * 0.8, // Width adjusted to screen size
    fontSize: width < 360 ? 13 : 15, // Smaller font on smaller screens
    height: height * 0.5, // Height adjusted to screen size
  },
  textInputSmall: {
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#ACA3AF',
    borderWidth: 3,
    width: width * 0.9, // 90% of screen width
    marginBottom: 20,
    fontSize: width < 360 ? 18 : 20, // Adjust font size
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: width * 0.05, // Adjust gap based on width
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: 'rgba(145, 137, 152, 0.5)',
    borderColor: 'green',
    borderWidth: 3,
    borderRadius: 10,
    height: height * 0.08, // Set height as a percentage of screen height
    width: width * 0.6, // Width set to 40% of screen width
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    position: 'absolute',
  },
  cancelButton: {
    backgroundColor: 'rgba(145, 137, 152, 0.5)',
    borderColor: 'red',
    borderWidth: 3,
    borderRadius: 10,
    height: height * 0.07, // Same as save button height
    width: width * 0.4, // Same width as save button
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default NewDiary;
