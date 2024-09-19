import { StyleSheet, Pressable, Text, ViewStyle, Image } from 'react-native';
import Teksti from './Textbox';
interface MenuButtonProps {
  title: string;
  text: string;
  onPress: () => void;
  style?: ViewStyle;
  img?: any;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  title,
  text,
  onPress,
  style,
  img,
}) => {
  const textAlignStyle =
    style?.left !== undefined ? styles.alignLeft : styles.alignRight;
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Teksti style={textAlignStyle}>
        <Text style={[styles.header, textAlignStyle]}>{title}</Text>
        {text ? (
          <Text style={[styles.text, textAlignStyle]}>{text}</Text>
        ) : null}
        <Image source={img} style={styles.image}></Image>
      </Teksti>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 35,
    width: 300,
    height: 99,
    margin: 30,
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'Kadwa_400Regular',
    marginBottom: 45,
  },
  header: {
    color: '#ffffff',
    fontSize: 25,
    fontFamily: 'Kadwa_400Regular',
  },
  alignLeft: {
    // Aligns text to the left
    alignItems: 'flex-end', // Aligns container items to the start (left)
  },
  alignRight: {
    // Aligns text to the right
    alignItems: 'flex-start', // Aligns container items to the end (right)
  },
  image: {
    position: 'absolute',
    width: 35,
    height: 35,
    // scam
    left: 250,
  },
});
export default MenuButton;
