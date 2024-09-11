import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import Login from './Login';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  return <Login navigation={navigation} />;
};

export default LoginScreen;
