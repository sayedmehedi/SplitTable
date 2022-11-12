import React from "react";
import {CustomerAuthStackParamList} from "@src/navigation";
import CommonStackHeader from "@components/CommonStackHeader";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import {CustomerAuthStackRoutes} from "@constants/routes";
import {CUSTOMER_AUTH_STACK_NAVIGATOR_ID} from "@constants/navigators";
import EmailLoginScreen from "@screens/CUSTOMER/CustomerAuthScreen/EmailLoginScreen";
import LoginPromptScreen from "@screens/CUSTOMER/CustomerAuthScreen/LoginPromptScreen";
import EmailVerificationScreen from "@screens/CUSTOMER/CustomerAuthScreen/EmailVerificationScreen";
import LocationEnablePromptScreen from "@screens/CUSTOMER/CustomerAuthScreen/LocationEnablePromptScreen";

const CustomerAuthStack = createStackNavigator<CustomerAuthStackParamList>();

const CustomerAuthStackNavigator = () => {
  return (
    <CustomerAuthStack.Navigator
      id={CUSTOMER_AUTH_STACK_NAVIGATOR_ID}
      screenOptions={globalScreenOptions}>
      <CustomerAuthStack.Screen
        component={LoginPromptScreen}
        options={loginPromptScreenOptions}
        name={CustomerAuthStackRoutes.LOGIN_PROMPT}
      />
      <CustomerAuthStack.Screen
        component={EmailLoginScreen}
        options={loginScreenOptions}
        name={CustomerAuthStackRoutes.SIGNIN}
      />
      <CustomerAuthStack.Screen
        component={EmailVerificationScreen}
        options={emailVerificationScreenOptions}
        name={CustomerAuthStackRoutes.EMAIL_VERIFICATION}
      />
      <CustomerAuthStack.Screen
        options={locationEnableScreenOptions}
        component={LocationEnablePromptScreen}
        name={CustomerAuthStackRoutes.LOCATION_ENABLE}
      />
    </CustomerAuthStack.Navigator>
  );
};

export default CustomerAuthStackNavigator;

const locationEnableScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerAuthStackParamList,
        typeof CustomerAuthStackRoutes.LOCATION_ENABLE
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Select Location",
};

const emailVerificationScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerAuthStackParamList,
        typeof CustomerAuthStackRoutes.EMAIL_VERIFICATION
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Email Verification",
};

const loginScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerAuthStackParamList,
        typeof CustomerAuthStackRoutes.SIGNIN
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Sign in",
};

const loginPromptScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerAuthStackParamList,
        typeof CustomerAuthStackRoutes.LOGIN_PROMPT
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: false,
};

const globalScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerAuthStackParamList,
        keyof CustomerAuthStackParamList
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: true,
  header: CommonStackHeader,
};
