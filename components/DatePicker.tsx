import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface BirthdayModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (birthday: { day: number; month: number }) => void;
}

const BirthdayModal: React.FC<BirthdayModalProps> = ({ onClose, onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(true); // Show date picker initially

  // Handle the date change and confirm action
  const handleDateChange = (event: any, date?: Date) => {
    if (event.type === 'set' && date) {
      setSelectedDate(date); // Update selected date when user picks a date
      // If the user pressed OK, confirm the selection
      const birthday = {
        day: date.getDate(),
        month: date.getMonth() + 1,
      };
      onSubmit(birthday); // Pass the selected birthday to the parent
      onClose(); // Close the modal immediately after confirming
    } else if (event.type === 'dismissed') {
      onClose(); // If picker is dismissed, close the modal
    }
  };

  return (
    <View style={styles.modalContainer}>
      {/* DateTimePicker inside the modal */}
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display="spinner" // Show the spinner view for scrolling dates
        onChange={handleDateChange}
        maximumDate={new Date()}
        style={styles.datePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    maxWidth: 350,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5, // Adds shadow on Android
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  datePicker: {
    width: '100%',
    marginBottom: 20,
  },
});

export default BirthdayModal;
