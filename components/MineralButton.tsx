import { StyleSheet, Pressable, Text, View, Image } from 'react-native';

interface MineralButtonProps {
  title?: string;
  img?: any; // It can be either a local image (from require) or URI
  onPress: () => void;
}

const MineralButton: React.FC<MineralButtonProps> = ({
  title,
  img,
  onPress,
}) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        <Image source={img} style={styles.image} resizeMode="cover" />
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 35,
    width: '33%',
    height: 100,
    marginVertical: 10,
    fontFamily: 'Kadwa_400Regular',
  },
  text: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'Kadwa_400Regular',
    textAlign: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  content: {
    alignItems: 'center',
  },
});

export default MineralButton;
