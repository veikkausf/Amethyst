import React from 'react';
import { Button } from 'react-native';

interface NappiProps {
  title: string;
}

const Nappi: React.FC<NappiProps> = ({ title }) => {
  return <Button title={title} onPress={() => alert('Button Pressed!')} />;
};
export default Nappi;
