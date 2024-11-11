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
import MineralData from './mineral-data';
import MeditationData from './meditation-data';
import DreamDiary from './dreamDiary';
import DiaryList from './diaryList';
import NewDiary from './newDiary';
import DreamSymbols from './dreamSymbols';
import SymbolData from './symbolData';
import diaryPrevious from './diaryPrevious';

const Stack = createStackNavigator<RootStackParamList>();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3F3154',
          shadowColor: 'transparent',
        },
        headerTitle: '',
        headerBackImage: () => (
          <Image
            source={require('../../assets/images/backbt.png')}
            style={{ width: 75, height: 75 }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="Tarot" component={Tarot} />
      <Stack.Screen name="Minerals" component={Minerals} />
      <Stack.Screen name="Horoscope" component={Horoscope} />
      <Stack.Screen
        name="HoroscopeData"
        component={HoroscopeData}
        options={{ headerTransparent: true }}
      />
      <Stack.Screen name="Meditate" component={Meditate} />
      <Stack.Screen
        name="MineralData"
        component={MineralData}
        options={{ headerTransparent: true }}
      />
      <Stack.Screen
        name="MeditationData"
        component={MeditationData}
      ></Stack.Screen>

      <Stack.Screen name="DreamDiary" component={DreamDiary}></Stack.Screen>

      <Stack.Screen name="DiaryList" component={DiaryList}></Stack.Screen>

      <Stack.Screen name="DreamSymbols" component={DreamSymbols}></Stack.Screen>

      <Stack.Screen name="NewDiary" component={NewDiary}></Stack.Screen>

      <Stack.Screen name="SymbolData" component={SymbolData}></Stack.Screen>
      <Stack.Screen
        name="diaryPrevious"
        component={diaryPrevious}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  return <MyStack />;
}
