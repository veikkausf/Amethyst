import React, { useCallback, useEffect } from 'react';
import { Image, Text, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

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
import {
  useFonts,
  Kadwa_400Regular,
  Kadwa_700Bold,
} from '@expo-google-fonts/kadwa';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createStackNavigator<RootStackParamList>();

function MyStack() {
  let [fontsLoaded] = useFonts({
    Kadwa_400Regular,
    Kadwa_700Bold,
  });

  // Splash screen piilotetaan, kun fontit ovat ladattu a
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  //
  if (!fontsLoaded) {
    return null;
  }

  // Esimerkki

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3F3154',
          shadowColor: 'transparent',
        },
        headerTitle: '',
        animationEnabled: true,
        ...TransitionPresets.SlideFromRightIOS, // Sivusuuunnasta liikkuva animaatio
        headerBackImage: () => (
          <Image
            source={require('../../assets/images/backbt.png')}
            style={{
              width: 75,
              height: 75,
            }}
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
        options={{ headerShown: false }}
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

      <Stack.Screen
        name="DreamDiary"
        component={DreamDiary}
        options={{ headerTransparent: true }}
      ></Stack.Screen>

      <Stack.Screen name="DiaryList" component={DiaryList}></Stack.Screen>

      <Stack.Screen
        name="DreamSymbols"
        component={DreamSymbols}
        options={{
          headerTitle: () => <Text style={styles.header}>Symbols</Text>,
          headerTitleAlign: 'center',
        }}
      ></Stack.Screen>

      <Stack.Screen name="NewDiary" component={NewDiary}></Stack.Screen>

      <Stack.Screen name="SymbolData" component={SymbolData}></Stack.Screen>
      <Stack.Screen
        name="diaryPrevious"
        component={diaryPrevious}
        options={{
          headerTitle: () => <Text style={styles.header}>Previous pages</Text>,
          headerTitleAlign: 'center',
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
    textAlign: 'center', // Center-align text to fit better on screen
  },
});

export default function App() {
  return <MyStack />;
}
