import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignUpScreen from '../screens/OWNER/SignUpScreen';
import CommonHeader from '../components/CommonHeader';
import OwnerButtomTabNavigator from './OwnerButtomTabNavigator';

const OwnerStack = createStackNavigator();

const OwnerStackNavigator = () => {
  return (
    <OwnerStack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <OwnerStack.Screen name='ownerSignUp' component={SignUpScreen}
      options={{
        headerShown:true,
        header: CommonHeader,
        headerTitle:'Sign Up'
      }}
      />

<OwnerStack.Screen name='ownerMainTabs' component={OwnerButtomTabNavigator}
     
      />

    </OwnerStack.Navigator>
  )
}

export default OwnerStackNavigator