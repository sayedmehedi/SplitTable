import React from 'react';
import CommonHeader from '../components/CommonHeader';
import {createStackNavigator} from '@react-navigation/stack';
import EmailLoginScreen from '../screens/CUSTOMER/CustomerAuthScreen/EmailLoginScreen';
import LoginPromptScreen from '../screens/CUSTOMER/CustomerAuthScreen/LoginPromptScreen';
import EmailVerificationScreen from '../screens/CUSTOMER/CustomerAuthScreen/EmailVerificationScreen'
import LocationEnablePromptScreen from '../screens/CUSTOMER/CustomerAuthScreen/LocationEnablePromptScreen'

const CustomerAuth = createStackNavigator();

const CustomerAuthStack = () => {
  return (
    <CustomerAuth.Navigator
      screenOptions={{
        headerShown:true,
         header: CommonHeader 
      }}
      >
      <CustomerAuth.Screen name="loginPrompt" component={LoginPromptScreen} options={{
        headerShown:false
      }}
        />
      <CustomerAuth.Screen name="signin" component={EmailLoginScreen}
      options={{
        headerTitle:'Sign in'
      }}
      />
      <CustomerAuth.Screen name="emailVerification" component={EmailVerificationScreen}
      options={{
        headerTitle:'Email Verification'
      }}
      />
      <CustomerAuth.Screen name="locationEnable" component={LocationEnablePromptScreen}
      options={{
        headerTitle:'Select Location'
      }}
      />
    </CustomerAuth.Navigator>
  );
};

export default CustomerAuthStack;
