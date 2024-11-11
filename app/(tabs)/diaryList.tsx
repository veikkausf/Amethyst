import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Teksti from '@/components/Textbox';

interface DiaryListProps {
  navigation: any;
}

const DiaryList: React.FC<DiaryListProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('diaryPrevious')}
      >
        <Teksti>
          <Text style={styles.header}>History</Text>
        </Teksti>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('NewDiary')}
      >
        <Teksti>
          <Text style={styles.header}>New Page</Text>
        </Teksti>
      </Pressable>
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
    gap: 20,
  },
  header: {
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'Kadwa_400Regular',
    textAlign: 'center', // Center-align text to fit better on screen
  },
  button: { width: '80%' },
});

export default DiaryList;
