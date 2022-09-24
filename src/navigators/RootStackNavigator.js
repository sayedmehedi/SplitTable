import React from 'react';
import InitialScreen from '../screens/InitialScreen';
import CommonHeader from '../components/CommonHeader';
import ThemeProvider from '../Providers/ThemeProvider';
import OwnerStackNavigator from './OwnerStackNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import CustomerStackNavigator from './CustomerStackNavigator';

const RootStack = createStackNavigator();

const RootStackNavigator = () => {
  return (
    <ThemeProvider>
      <RootStack.Navigator
      initialRouteName={"custom"}
        screenOptions={{
           headerShown: false,
         
        }}>
        <RootStack.Screen name="initial" component={InitialScreen} />
        <RootStack.Screen name="customer" component={CustomerStackNavigator} />
        <RootStack.Screen name="owner" component={OwnerStackNavigator} />
      </RootStack.Navigator>
    </ThemeProvider>
  );
};

export default RootStackNavigator;
