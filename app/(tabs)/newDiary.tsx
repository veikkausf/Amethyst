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

      // Naviogoidaan takaisin, kun tallennettu
      navigation.goBack();
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
        placeholderTextColor={'white'}
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
          placeholderTextColor={'white'}
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
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
  },
  textInputBig: {
    padding: 10,
    backgroundColor: 'transparent',
    color: 'white',
    width: width * 0.8,
    fontSize: width < 360 ? 13 : 15,
    height: height * 0.5,
  },
  textInputSmall: {
    padding: 10,
    backgroundColor: 'rgba(145, 137, 152, 0.4)',
    borderColor: '#ACA3AF',
    color: 'white',
    borderWidth: 3,
    width: width * 0.9,
    marginBottom: 20,
    fontSize: width < 360 ? 18 : 20,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: width * 0.05,
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: 'rgba(145, 137, 152, 0.5)',
    borderColor: '#B88EEE',
    borderWidth: 3,
    borderRadius: 10,
    height: height * 0.08,
    width: width * 0.6,
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
    height: height * 0.07,
    width: width * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default NewDiary;
