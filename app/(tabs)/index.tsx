import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native'; // Import RouteProp
import { RootStackParamList } from '../Types';
import Menu from './menu';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Menu'
>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Menu'>;

interface MenuScreenProps {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp; // Add route type
}

// Load the Menu screen as the starting screen
const LoginScreen: React.FC<MenuScreenProps> = ({ navigation, route }) => {
  return <Menu navigation={navigation} route={route} />; // Pass both navigation and route
};

export default LoginScreen;
