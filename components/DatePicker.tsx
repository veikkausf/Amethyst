// BirthdayModal.tsx
import React, { useState } from 'react';
import { View, Modal, Pressable, StyleSheet, Text } from 'react-native';
import DatePicker from 'react-native-date-picker';

// Rajapintaluokka modaalille
interface BirthdayModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (birthday: { day: number; month: number }) => void;
}

const BirthdayModal: React.FC<BirthdayModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleConfirm = () => {
    const birthday = {
      day: selectedDate.getDate(),
      month: selectedDate.getMonth() + 1,
    };
    onSubmit(birthday); // Annetaan syntymäpäivä
    onClose();
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <DatePicker
            date={selectedDate}
            mode="date"
            onDateChange={setSelectedDate}
            maximumDate={new Date()}
          />
          <Pressable onPress={handleConfirm}>
            <Text>Confirm</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default BirthdayModal;
