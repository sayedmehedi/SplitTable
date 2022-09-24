import React from 'react';
import CustomerAuthStack from './CustomerAuthStack';
import CommonHeader from '../components/CommonHeader';
import BookingStackNavigator from "./BookingStackNavigator"
import {createStackNavigator} from '@react-navigation/stack';
import ClubListScreen from '../screens/CUSTOMER/ClubListScreen';
import OnboardingScreen from '../screens/CUSTOMER/OnboardingScreen';
import CustomerBottomTabNavigator from './CustomerBottomTabNavigator';
import ClubDetailsScreen from '../screens/CUSTOMER/ClubDetailsScreen';

const CustomerStack = createStackNavigator();

const CustomerStackNavigator = () => {
  return (
    <CustomerStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <CustomerStack.Screen name="onBoarding" component={OnboardingScreen} />
      <CustomerStack.Screen name="customerAuth" component={CustomerAuthStack} />
      <CustomerStack.Screen
        name="customerMainTab"
        component={CustomerBottomTabNavigator}
      />
      <CustomerStack.Screen
        name="clubList"
        component={ClubListScreen}
        options={{
          headerShown: true,
          header: CommonHeader,

          headerTitle: 'Las Vegas',
        }}
      />
      <CustomerStack.Screen name="clubDetails" component={ClubDetailsScreen} />
      <CustomerStack.Screen name="booking" component={BookingStackNavigator} />
    </CustomerStack.Navigator>
  );
};

export default CustomerStackNavigator;
