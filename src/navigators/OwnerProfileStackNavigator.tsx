import React from "react";
import {RouteProp} from "@react-navigation/native";
import {OwnerAccountStackParamList} from "@src/navigation";
import {OwnerProfileStackRoutes} from "@constants/routes";
import CommonStackHeader from "@components/CommonStackHeader";
import OwnerAccountScreen from "@screens/OWNER/OwnerAccountScreen";
import FaqScreen from "@screens/OWNER/OwnerAccountScreen/FaqScreen";
import LegalScreen from "@screens/OWNER/OwnerAccountScreen/LegalScreen";
import {OWNER_PROFILE_STACK_NAVIGATOR_ID} from "@constants/navigators";
import ProfileScreen from "@screens/OWNER/OwnerAccountScreen/ProfileScreen";
import ReviewsScreen from "@screens/OWNER/OwnerAccountScreen/ReviewsScreen";
import TransactionScreen from "@screens/OWNER/OwnerAccountScreen/TransactionScreen";
import AccountSettingScreen from "@screens/OWNER/OwnerAccountScreen/AccountSettingScreen";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";

const OwnerProfileStack = createStackNavigator<OwnerAccountStackParamList>();

const OwnerProfileStackNavigator = () => {
  return (
    <OwnerProfileStack.Navigator
      id={OWNER_PROFILE_STACK_NAVIGATOR_ID}
      screenOptions={globalScreenOptions}>
      <OwnerProfileStack.Screen
        component={OwnerAccountScreen}
        options={accountScreenOptions}
        name={OwnerProfileStackRoutes.ACCOUNT}
      />

      <OwnerProfileStack.Screen
        component={ProfileScreen}
        options={profileScreenOptions}
        name={OwnerProfileStackRoutes.PROFILE}
      />

      <OwnerProfileStack.Screen
        component={TransactionScreen}
        options={transactionScreenOptions}
        name={OwnerProfileStackRoutes.TRANSACTION}
      />

      <OwnerProfileStack.Screen
        component={AccountSettingScreen}
        options={accountSettingScreenOptions}
        name={OwnerProfileStackRoutes.ACCOUNT_SETTING}
      />

      <OwnerProfileStack.Screen
        component={ReviewsScreen}
        options={favoriteScreenOptions}
        name={OwnerProfileStackRoutes.FAVORITE}
      />

      <OwnerProfileStack.Screen
        component={LegalScreen}
        options={legalScreenOptions}
        name={OwnerProfileStackRoutes.LEGAL}
      />

      <OwnerProfileStack.Screen
        component={FaqScreen}
        options={faqScreenOptions}
        name={OwnerProfileStackRoutes.FAQ}
      />
    </OwnerProfileStack.Navigator>
  );
};

export default OwnerProfileStackNavigator;

const globalScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        OwnerAccountStackParamList,
        keyof OwnerAccountStackParamList
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
        OwnerAccountStackParamList,
        typeof OwnerProfileStackRoutes.ACCOUNT
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "My Account",
};
const profileScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        OwnerAccountStackParamList,
        typeof OwnerProfileStackRoutes.PROFILE
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: false,
};
const transactionScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        OwnerAccountStackParamList,
        typeof OwnerProfileStackRoutes.TRANSACTION
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Transaction",
};
const accountSettingScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        OwnerAccountStackParamList,
        typeof OwnerProfileStackRoutes.ACCOUNT_SETTING
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Account Settings",
};
const favoriteScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        OwnerAccountStackParamList,
        typeof OwnerProfileStackRoutes.FAVORITE
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Favorite",
};
const legalScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        OwnerAccountStackParamList,
        typeof OwnerProfileStackRoutes.LEGAL
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Legal",
};
const faqScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        OwnerAccountStackParamList,
        typeof OwnerProfileStackRoutes.FAQ
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "FAQ",
};
