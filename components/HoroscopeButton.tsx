// Omanlaisensa button horoskooppi listaa varten
import { StyleSheet, Pressable, Text, Image, View } from 'react-native';

interface HoroscopeButtonProps {
  title: string;
  img?: any;
  onPress: () => void;
  onLongPress?: (event: any) => void;
  onPressOut?: () => void;
}

const HoroscopeButton: React.FC<HoroscopeButtonProps> = ({
  title,
  img,
  onPress,
  onLongPress,
  onPressOut,
}) => {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressOut={onPressOut}
    >
      <View style={styles.content}>
        <Text style={styles.text}>{title}</Text>
        <Image source={img} style={styles.image}></Image>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    borderRadius: 20,
    width: '85%',
    height: 100,
    marginVertical: 10,
    borderColor: '#ACA3AF',
    borderWidth: 2,
    fontFamily: 'Kadwa_400Regular',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    position: 'absolute',
    left: 50,
    fontSize: 20,
    fontFamily: 'Kadwa_400Regular',
    textAlign: 'center',
  },
  image: {
    position: 'absolute',
    width: 35,
    height: 35,
    // scam
    left: 250,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default HoroscopeButton;
