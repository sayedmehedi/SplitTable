import React from 'react';
import { StatusBar } from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigator from './src/navigators/RootStackNavigator';

const App = () => {
  return (
      <NavigationContainer>
        <StatusBar barStyle={"dark-content"} />
        <RootStackNavigator />
      </NavigationContainer>
  );
};

export default App;
