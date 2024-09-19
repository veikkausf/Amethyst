import {
  StyleSheet,
  Pressable,
  Text,
  ViewStyle,
  Image,
  View,
} from 'react-native';
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
  const isAlignLeft = style?.left !== undefined;
  const textAlignStyle = isAlignLeft
    ? styles.alignLeftText
    : styles.alignRightText;

  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Teksti style={styles.content}>
        {/* Conditionally render image based on alignment */}
        {isAlignLeft && img && <Image source={img} style={styles.imageleft} />}
        <View>
          <Text style={[styles.header, textAlignStyle]}>{title}</Text>
          {text ? (
            <Text style={[styles.text, textAlignStyle]}>{text}</Text>
          ) : null}
        </View>
        {!isAlignLeft && img && <Image source={img} style={styles.image} />}
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'Kadwa_400Regular',
    marginBottom: 5,
    right: 10,
  },
  header: {
    color: '#ffffff',
    fontSize: 25,
    fontFamily: 'Kadwa_400Regular',
    right: 10,
  },
  alignLeftText: {
    textAlign: 'right',
  },
  alignRightText: {
    textAlign: 'left',
  },
  image: {
    width: 60,
    height: 60,
    borderColor: '#3F3154',
    borderWidth: 5,
    borderRadius: 30,
    left: 20,
  },
  imageleft: {
    width: 60,
    height: 60,
    borderColor: '#3F3154',
    borderWidth: 5,
    borderRadius: 30,
    right: 50,
  },
});

export default MenuButton;
