import { StyleSheet, Pressable, Text, Image, View } from 'react-native';
import Teksti from './Textbox';
//meditation button
interface MedButtonProps {
  title: string;
  img?: any;
  onPress: () => void;
}

const MedButton: React.FC<MedButtonProps> = ({ title, img, onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <View>
        <Teksti style={styles.box}>
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
    marginLeft: 20,
    fontFamily: 'Kadwa_400Regular',
    height: 200,
    width: 170,
    borderRadius: 40,
  },
  text: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Kadwa_400Regular',
    top: 30,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    top: 20,
  },
  box: {
    height: 190,
    borderRadius: 40,
  },
});
export default MedButton;
