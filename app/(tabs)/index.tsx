import * as React from 'react';
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
import Horoscope from './horoscope';
import Tarot from './tarot';
import Meditate from './meditate';
import Minerals from './minerals';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}
//Log in screen ensimmäinen näkymä
function LoginScreen({ navigation }: HomeScreenProps) {
  return (
    <ImageBackground
      source={require('../../assets/images/background.jpg')} // Relative path to the background image
      style={styles.background}
      resizeMode="cover" // Adjusts how the image is resized to fit the background (options: cover, contain, stretch, etc.)
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Nappi title="Login" onPress={() => navigation.navigate('Menu')} />
      </View>
    </ImageBackground>
  );
}
//main manu Täältä pääset kaikkeen menu contenttiin aka pää sivu
function MenuScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Button title="Tarot" onPress={() => navigation.navigate('Tarot')} />
      <Button
        title="Minerals"
        onPress={() => navigation.navigate('Minerals')}
      />
      <Button
        title="Horoscope"
        onPress={() => navigation.navigate('Horoscope')}
      />
      <Button
        title="Meditate"
        onPress={() => navigation.navigate('Meditate')}
      />
    </View>
  );
}

function TarotScreen({}: HomeScreenProps) {
  return <Tarot />;
}
function MineralsScreen({}: HomeScreenProps) {
  return <Minerals />;
}
function HoroscopeScreen({}: HomeScreenProps) {
  return <Horoscope />;
}
function MeditateScreen({}: HomeScreenProps) {
  return <Meditate />;
}

const Stack = createStackNavigator();
//Header
function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        headerBackImage: () => (
          <Image
            source={require('../../assets/images/backbt.png')}
            style={{ width: 75, height: 75 }}
          />
        ),
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Tarot" component={TarotScreen} />
      <Stack.Screen name="Minerals" component={MineralsScreen} />
      <Stack.Screen name="Horoscope" component={HoroscopeScreen} />
      <Stack.Screen name="Meditate" component={MeditateScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return <MyStack />;
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
