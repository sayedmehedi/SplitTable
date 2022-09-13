import React from 'react';
import CustomerAuthStack from './CustomerAuthStack';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from '../screens/CUSTOMER/OnboardingScreen';
import CustomerBottomTabNavigator from './CustomerBottomTabNavigator';
import ClubListScreen from '../screens/CUSTOMER/ClubListScreen';
import ClubDetailsScreen from '../screens/CUSTOMER/ClubDetailsScreen';
import CommonHeader from '../components/CommonHeader';
const CustomerStack = createStackNavigator();

const CustomerStackNavigator = () => {
  return (
    <CustomerStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <CustomerStack.Screen name="onBoarding" component={OnboardingScreen} />
      <CustomerStack.Screen name='customerAuth' component={CustomerAuthStack}/>
      <CustomerStack.Screen name='customerMainTab' component={CustomerBottomTabNavigator}/>
      <CustomerStack.Screen name='clubList' component={ClubListScreen}
      options={{
        headerShown:true,
         header: CommonHeader,
        
        headerTitle:'Las Vegas'
      }}
      />
       <CustomerStack.Screen name='clubDetails' component={ClubDetailsScreen}/>
    </CustomerStack.Navigator>
  );
};

export default CustomerStackNavigator;
