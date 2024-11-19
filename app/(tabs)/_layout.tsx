import * as React from 'react';
import { Image, View, ActivityIndicator } from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

const Stack = createStackNavigator<RootStackParamList>();

function MyStack() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const checkAuthenticationStatus = async () => {
      try {
        const userBirthday = await AsyncStorage.getItem('userBirthday');
        const isGuestLoggedIn = await AsyncStorage.getItem('isGuestLoggedIn');
        const givenName = await AsyncStorage.getItem('givenName'); // Check if givenName exists
        console.warn('Retrieved values:', {
          userBirthday,
          isGuestLoggedIn,
          givenName,
        });
        if (
          givenName !== null ||
          userBirthday !== null ||
          isGuestLoggedIn !== null
        ) {
          setIsAuthenticated(true);
          console.warn('Authenticated');
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setIsAuthenticated(false); // Default to unauthenticated on error
      } finally {
        setLoading(false); // Set loading to false once async check is done
      }
    };

    checkAuthenticationStatus();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3F3154" />
      </View>
    );
  }

  if (isAuthenticated) {
    return (
      <Stack.Navigator
        initialRouteName={'Menu'}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3F3154',
            shadowColor: 'transparent',
          },
          animationEnabled: false,
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
        <Stack.Screen name="MeditationData" component={MeditationData} />
        <Stack.Screen name="DreamDiary" component={DreamDiary} />
        <Stack.Screen name="DiaryList" component={DiaryList} />
        <Stack.Screen name="DreamSymbols" component={DreamSymbols} />
        <Stack.Screen name="NewDiary" component={NewDiary} />
        <Stack.Screen name="SymbolData" component={SymbolData} />
        <Stack.Screen name="diaryPrevious" component={diaryPrevious} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3F3154',
          shadowColor: 'transparent',
        },
        animationEnabled: false,
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
      <Stack.Screen name="MeditationData" component={MeditationData} />
      <Stack.Screen name="DreamDiary" component={DreamDiary} />
      <Stack.Screen name="DiaryList" component={DiaryList} />
      <Stack.Screen name="DreamSymbols" component={DreamSymbols} />
      <Stack.Screen name="NewDiary" component={NewDiary} />
      <Stack.Screen name="SymbolData" component={SymbolData} />
      <Stack.Screen name="diaryPrevious" component={diaryPrevious} />
    </Stack.Navigator>
  );
}

export default function App() {
  return <MyStack />; // Make sure to call MyStack here to render the Navigator
}
