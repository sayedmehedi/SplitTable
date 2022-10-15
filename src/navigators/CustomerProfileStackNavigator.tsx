import {View, Text} from "react-native";
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import AccountScreen from "@screens/CUSTOMER/AccountScreen";
import ProfileScreen from "@screens/CUSTOMER/AccountScreen/ProfileScreen";
import TransactionScreen from "@screens/CUSTOMER/AccountScreen/TransectionScreen";
import AccountSettingScreen from "@screens/CUSTOMER/AccountScreen/AccountSettingScreen";
import FavoriteScreen from "@screens/CUSTOMER/AccountScreen/FavoriteScreen";
import LegalScreen from "@screens/CUSTOMER/AccountScreen/LegalScreen";
import FaqScreen from "@screens/CUSTOMER/AccountScreen/FaqScreen";
import CommonStackHeader from "@components/CommonStackHeader";

const CustomerProfileStack = createStackNavigator();
const CustomerProfileStackNavigator = () => {
  return (
    <CustomerProfileStack.Navigator
      screenOptions={{
        headerShown: true,
        header: CommonStackHeader,
      }}>
      <CustomerProfileStack.Screen
        name="account"
        component={AccountScreen}
        options={{
          headerTitle: "My Account",
        }}
      />
      <CustomerProfileStack.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />

      <CustomerProfileStack.Screen
        name="transection"
        component={TransactionScreen}
        options={{
          headerTitle: "Transaction",
        }}
      />

      <CustomerProfileStack.Screen
        name="accountSetting"
        component={AccountSettingScreen}
        options={{
          headerTitle: "Account Settings",
        }}
      />

      <CustomerProfileStack.Screen
        name="favorite"
        component={FavoriteScreen}
        options={{
          headerTitle: "Favorite",
        }}
      />

      <CustomerProfileStack.Screen
        name="legal"
        component={LegalScreen}
        options={{
          headerTitle: "Legal",
        }}
      />

      <CustomerProfileStack.Screen
        name="faq"
        component={FaqScreen}
        options={{
          headerTitle: "FAQ",
        }}
      />
    </CustomerProfileStack.Navigator>
  );
};

export default CustomerProfileStackNavigator;