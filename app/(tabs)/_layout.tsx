import * as React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import Horoscope from './horoscope';
import Tarot from './tarot';
import Meditate from './meditate';
import Minerals from './minerals';
import LoginScreen from './Login';
import MenuScreen from './menu';
import HoroscopeData from './horoscope-data';

const Stack = createStackNavigator<RootStackParamList>();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
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
      <Stack.Screen name="Tarot" component={Tarot} />
      <Stack.Screen name="Minerals" component={Minerals} />
      <Stack.Screen name="Horoscope" component={Horoscope} />
      <Stack.Screen name="HoroscopeData" component={HoroscopeData} />
      <Stack.Screen name="Meditate" component={Meditate} />
    </Stack.Navigator>
  );
}

export default function App() {
  return <MyStack />;
}
