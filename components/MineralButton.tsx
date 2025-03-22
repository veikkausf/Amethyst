import { StyleSheet, Pressable, Text, View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';

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
  const isLocalImage = typeof img !== 'string'; // Check if the image is a local asset

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        {isLocalImage ? (
          // If it's a local image (from require), use Image component
          <Image source={img} style={styles.image} resizeMode="cover" />
        ) : (
          // If it's a URI (remote image), use FastImage
          <FastImage
            source={{
              uri: img, // img should be a string URI for remote images
              priority: FastImage.priority.normal,
            }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
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
