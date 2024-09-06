import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}
//Log in screen ensimmäinen näkymä
function LoginScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Log in" onPress={() => navigation.navigate('Menu')} />
    </View>
  );
}
//main manu Täältä pääset kaikkeen menu contenttiin aka pää sivu
function MenuScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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

function TarotScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> Täällä on tarot kortteja</Text>
    </View>
  );
}

function MineralsScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> Täällä on mineraaleja</Text>
    </View>
  );
}
function HoroscopeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> Täällä on Horoskooppeja</Text>
    </View>
  );
}
function MeditateScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> Täällä Voit meditoida</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
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
