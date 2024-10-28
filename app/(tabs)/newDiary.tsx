import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Teksti from '@/components/Textbox';

interface NewDiaryProps {
  navigation: any;
}

const NewDiary: React.FC<NewDiaryProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>New diary</Text>
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
});

export default NewDiary;
