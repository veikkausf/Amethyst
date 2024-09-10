import {
  Button,
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import Nappi from '@/components/Button';
import Teksti from '@/components/Textbox';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

function HoroscopeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Teksti>
        <Text> Täällä on Horoskooppeja</Text>
      </Teksti>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#3F3154',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
