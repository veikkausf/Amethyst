import { StyleSheet, Pressable, Text, ViewStyle } from 'react-native';
import Teksti from './Textbox';
interface MenuButtonProps {
  title: string;
  text: string;
  onPress: () => void;
  style?: ViewStyle;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  title,
  text,
  onPress,
  style,
}) => {
  const textAlignStyle =
    style?.left !== undefined ? styles.alignLeft : styles.alignRight;
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Teksti style={[styles.box, textAlignStyle]}>
        <Text style={[styles.header, textAlignStyle]}>{title}</Text>
        {text ? (
          <Text style={[styles.text, textAlignStyle]}>{text}</Text>
        ) : null}
      </Teksti>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 35,
    width: 300,
    height: 70,
    margin: 30,
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'Kadwa_400Regular',
  },
  header: {
    color: '#ffffff',
    fontSize: 25,
    fontFamily: 'Kadwa_400Regular',
  },
  box: { alignItems: 'center' },
  alignLeft: {
    textAlign: 'right', // Aligns text to the left
    alignItems: 'flex-end', // Aligns container items to the start (left)
  },
  alignRight: {
    textAlign: 'left', // Aligns text to the right
    alignItems: 'flex-start', // Aligns container items to the end (right)
  },
});
export default MenuButton;
