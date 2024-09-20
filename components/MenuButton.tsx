import {
  StyleSheet,
  Pressable,
  Text,
  ViewStyle,
  Image,
  View,
} from 'react-native';
import Teksti from './Textbox';

// Rajapinta, joka määrittelee MenuButton-komponentin propit
interface MenuButtonProps {
  title: string; //Otsikko
  text: string; //Sisältö
  onPress: () => void;
  style?: ViewStyle; //Lisätyyli joka lisätään menu.tsx
  img?: any; //Kuva
}

const MenuButton: React.FC<MenuButtonProps> = ({
  title,
  text,
  onPress,
  style,
  img,
}) => {
  //Määäritetään onko nappi vasemmalla vai oikealla
  const isAlignLeft = style?.left !== undefined;
  const textAlignStyle = isAlignLeft
    ? styles.alignLeftText //Tyyli vasemmalla olevalla napilla
    : styles.alignRightText; //Tyyli oikealla olevalla napilla

  return (
    //Nappi jossa on onPress()-funktio
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Teksti style={styles.content}>
        {isAlignLeft && img && (
          <View style={styles.borderleft}>
            <Image source={img} style={styles.imageleft} />
          </View>
        )}
        <View>
          <Text style={[styles.header, textAlignStyle]}>{title}</Text>
          {text ? (
            <Text style={[styles.text, textAlignStyle]}>{text}</Text>
          ) : null}
        </View>
        {!isAlignLeft && img && (
          <View style={styles.borderright}>
            <Image source={img} style={styles.imageright} />
          </View>
        )}
      </Teksti>
    </Pressable>
  );
};
//tyylit
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
    right: 18,
  },
  header: {
    color: '#ffffff',
    fontSize: 25,
    fontFamily: 'Kadwa_400Regular',
    right: 18,
  },
  alignLeftText: {
    textAlign: 'right',
  },
  alignRightText: {
    textAlign: 'left',
  },
  imageright: {
    width: 60,
    height: 60,
    borderColor: '#ACA3AF',
    borderWidth: 3,
    borderRadius: 30,
  },
  imageleft: {
    width: 60,
    height: 60,
    borderColor: '#ACA3AF',
    borderWidth: 3,
    borderRadius: 30,
  },
  borderleft: {
    borderColor: '#3F3154',
    borderWidth: 5,
    borderRadius: 40,
    right: 55,
  },
  borderright: {
    borderColor: '#3F3154',
    borderWidth: 5,
    borderRadius: 40,
    left: 16,
  },
});

export default MenuButton;
