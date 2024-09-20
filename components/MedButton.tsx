import { StyleSheet, Pressable, Text, Image, View } from 'react-native';
import Teksti from './Textbox';

interface MedButtonProps {
  title: string;
  img?: any;
  onPress: () => void;
}

const MedButton: React.FC<MedButtonProps> = ({ title, img, onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <View>
        <Teksti>
          <Image source={img} style={styles.image}></Image>
          <Text style={styles.text} numberOfLines={1}>
            {title}
          </Text>
        </Teksti>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 35,
    width: '33%',
    padding: 10,
    fontFamily: 'Kadwa_400Regular',
    borderColor: 'red',
    borderWidth: 5,
  },
  text: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Kadwa_400Regular',
    textAlign: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
});
export default MedButton;
