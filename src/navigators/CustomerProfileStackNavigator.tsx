import React from "react";
import {CustomerProfileStackParamList} from "@src/types";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import AccountScreen from "@screens/CUSTOMER/AccountScreen";
import {CustomerProfileStackRoutes} from "@constants/routes";
import CommonStackHeader from "@components/CommonStackHeader";
import FaqScreen from "@screens/CUSTOMER/AccountScreen/FaqScreen";
import LegalScreen from "@screens/CUSTOMER/AccountScreen/LegalScreen";
import ProfileScreen from "@screens/CUSTOMER/AccountScreen/ProfileScreen";
import FavoriteScreen from "@screens/CUSTOMER/AccountScreen/FavoriteScreen";
import {CUSTOMER_PROFILE_STACK_NAVIGATOR_ID} from "@constants/navigators";
import TransactionScreen from "@screens/CUSTOMER/AccountScreen/TransactionScreen";
import AccountSettingScreen from "@screens/CUSTOMER/AccountScreen/AccountSettingScreen";

const CustomerProfileStack =
  createStackNavigator<CustomerProfileStackParamList>();

const CustomerProfileStackNavigator = () => {
  return (
    <CustomerProfileStack.Navigator
      screenOptions={globalScreenOptions}
      id={CUSTOMER_PROFILE_STACK_NAVIGATOR_ID}>
      <CustomerProfileStack.Screen
        component={AccountScreen}
        options={accountScreenOptions}
        name={CustomerProfileStackRoutes.ACCOUNT}
      />

      <CustomerProfileStack.Screen
        component={ProfileScreen}
        options={profileScreenOptions}
        name={CustomerProfileStackRoutes.PROFILE}
      />

      <CustomerProfileStack.Screen
        component={TransactionScreen}
        options={transactionScreenOptions}
        name={CustomerProfileStackRoutes.TRANSACTION}
      />

      <CustomerProfileStack.Screen
        component={AccountSettingScreen}
        options={accountSettingScreenOptions}
        name={CustomerProfileStackRoutes.ACCOUNT_SETTING}
      />

      <CustomerProfileStack.Screen
        component={FavoriteScreen}
        options={favoriteScreenOptions}
        name={CustomerProfileStackRoutes.FAVORITE}
      />

      <CustomerProfileStack.Screen
        component={LegalScreen}
        options={legalScreenOptions}
        name={CustomerProfileStackRoutes.LEGAL}
      />

      <CustomerProfileStack.Screen
        component={FaqScreen}
        options={faqScreenOptions}
        name={CustomerProfileStackRoutes.FAQ}
      />
    </CustomerProfileStack.Navigator>
  );
};

export default CustomerProfileStackNavigator;

const globalScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerProfileStackParamList,
        keyof CustomerProfileStackParamList
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: true,
  header: CommonStackHeader,
};

const accountScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerProfileStackParamList,
        typeof CustomerProfileStackRoutes.ACCOUNT
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "My Account",
};
const profileScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerProfileStackParamList,
        typeof CustomerProfileStackRoutes.PROFILE
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: false,
};
const transactionScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerProfileStackParamList,
        typeof CustomerProfileStackRoutes.TRANSACTION
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Transaction",
};
const accountSettingScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerProfileStackParamList,
        typeof CustomerProfileStackRoutes.ACCOUNT_SETTING
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Account Settings",
};
const favoriteScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerProfileStackParamList,
        typeof CustomerProfileStackRoutes.FAVORITE
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Favorite",
};
const legalScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerProfileStackParamList,
        typeof CustomerProfileStackRoutes.LEGAL
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Legal",
};
const faqScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerProfileStackParamList,
        typeof CustomerProfileStackRoutes.FAQ
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "FAQ",
};
