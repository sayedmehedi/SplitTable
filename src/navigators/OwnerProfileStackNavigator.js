import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OwnerAccountScreen from '../screens/OWNER/OwnerAccountScreen';
import ProfileScreen from '../screens/CUSTOMER/AccountScreen/ProfileScreen';
import TransectionScreen from '../screens/CUSTOMER/AccountScreen/TransectionScreen';
import AccountSettingScreen from '../screens/CUSTOMER/AccountScreen/AccountSettingScreen';
import FavoriteScreen from '../screens/CUSTOMER/AccountScreen/FavoriteScreen';
import LegalScreen from '../screens/CUSTOMER/AccountScreen/LegalScreen';
import FaqScreen from '../screens/CUSTOMER/AccountScreen/FaqScreen';
import CommonHeader from '../components/CommonHeader';

const OwnerProfileStack = createStackNavigator();
const OwnerProfileStackNavigator = () => {
  return (
    <OwnerProfileStack.Navigator
      screenOptions={{
        headerShown: true,
        header: CommonHeader,
      }}>
      <OwnerProfileStack.Screen
        name="account"
        component={OwnerAccountScreen}
        options={{
          headerTitle: 'My Account',
        }}
      />
      <OwnerProfileStack.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />

      <OwnerProfileStack.Screen
        name="transection"
        component={TransectionScreen}
        options={{
          headerTitle: 'Transaction',
        }}
      />

      <OwnerProfileStack.Screen
        name="accountSetting"
        component={AccountSettingScreen}
        options={{
          headerTitle: 'Account Settings',
        }}
      />

      <OwnerProfileStack.Screen
        name="favorite"
        component={FavoriteScreen}
        options={{
          headerTitle: 'Favorite',
        }}
      />

      <OwnerProfileStack.Screen
        name="legal"
        component={LegalScreen}
        options={{
          headerTitle: 'Legal',
        }}
      />

<OwnerProfileStack.Screen
        name="faq"
        component={FaqScreen}
        options={{
          headerTitle: 'FAQ',
        }}
      />
    </OwnerProfileStack.Navigator>
  );
};

export default OwnerProfileStackNavigator;
