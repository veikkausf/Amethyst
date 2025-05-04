import React, { useCallback, useEffect } from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { RootStackParamList } from '../Types';
import Horoscope from './horoscope';
import Tarot from './tarot';
import Minerals from './minerals';

import MenuScreen from './menu';
import HoroscopeData from './horoscope-data';
import MineralData from './mineral-data';
import DreamDiary from './dreamDiary';
import NewDiary from './newDiary';
import DreamSymbols from './dreamSymbols';
import diaryPrevious from './diaryPrevious';
import {
  useFonts,
  Kadwa_400Regular,
  Kadwa_700Bold,
} from '@expo-google-fonts/kadwa';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); // Ensure splash screen doesn't auto-hide

const Stack = createStackNavigator<RootStackParamList>();

function MyStack() {
  let [fontsLoaded] = useFonts({
    Kadwa_400Regular,
    Kadwa_700Bold,
  });

  // Debugging font loading
  useEffect(() => {
    console.log('Fonts loaded:', fontsLoaded);
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      console.log('Hiding splash screen');
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3F3154',
          shadowColor: 'transparent',
        },
        headerTitle: '',
        animationEnabled: true,
        ...TransitionPresets.SlideFromRightIOS, // Slide animation
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
        name="Menu"
        component={MenuScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Tarot" component={Tarot} />
      <Stack.Screen name="Minerals" component={Minerals} />
      <Stack.Screen name="Horoscope" component={Horoscope} />
      <Stack.Screen name="HoroscopeData" component={HoroscopeData} />
      <Stack.Screen
        name="MineralData"
        component={MineralData}
        options={{ headerTransparent: true }}
      />
      <Stack.Screen
        name="DreamDiary"
        component={DreamDiary}
        options={{ headerTransparent: true }}
      ></Stack.Screen>
      <Stack.Screen
        name="DreamSymbols"
        component={DreamSymbols}
        options={{
          headerTitle: () => <Text style={styles.header}>Symbols</Text>,
          headerTitleAlign: 'center',
        }}
      ></Stack.Screen>
      <Stack.Screen name="NewDiary" component={NewDiary}></Stack.Screen>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3F3154',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Kadwa_400Regular',
  },
});

export default function App() {
  return <MyStack />;
}
