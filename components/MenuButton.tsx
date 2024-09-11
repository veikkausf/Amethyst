import { StyleSheet, Pressable, Text } from 'react-native';
interface MenuButtonProps {
  title: string;
  onPress: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ title, onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 35,
    backgroundColor: '#918998',
    width: 300,
    height: 70,
    margin: 20,
  },
  text: {
    color: '#ffffff',
    fontSize: 35,
    fontFamily: 'Kadwa_400Regular',
    textAlign: 'center',
  },
});
export default MenuButton;
