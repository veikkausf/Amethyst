import React from 'react';
import { View, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import Teksti from '@/components/Textbox';

interface NewDiaryProps {
  navigation: any;
}

const NewDiary: React.FC<NewDiaryProps> = ({ navigation }) => {
  const [value, onChangeText] = React.useState('');

  return (
    <View style={styles.container}>
      <TextInput
        editable
        maxLength={20}
        style={styles.textInputSmall}
        placeholder="Header..."
      ></TextInput>

      <Teksti>
        <TextInput
          editable
          multiline
          numberOfLines={25}
          maxLength={120}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          style={styles.textInputBig}
          placeholder="Write here about your dreams..."
          textAlignVertical={'top'}
        />
      </Teksti>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.saveButton}>
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
        <Pressable style={styles.deleteButton}>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              fontFamily: 'Kadwa_400Regular',
            }}
          >
            Delete
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
    justifyContent: 'center',
    paddingHorizontal: 20, // Add padding to avoid content being cut off on smaller screens
  },
  textInputBig: {
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#ACA3AF',
    borderWidth: 3,
    minWidth: '100%',
  },
  textInputSmall: {
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#ACA3AF',
    borderWidth: 3,
    minWidth: '100%',
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  saveButton: {
    backgroundColor: 'rgba(145, 137, 152, 0.5)',
    borderColor: 'green',
    borderWidth: 3,
    borderRadius: 10,
    height: '40%',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: 'rgba(145, 137, 152, 0.5)',
    borderColor: 'red',
    borderWidth: 3,
    borderRadius: 10,
    height: '40%',
    width: '40 %',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default NewDiary;
