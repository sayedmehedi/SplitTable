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
import SignUpScreen from "@screens/CUSTOMER/CustomerAuthScreen/SignUpScreen";

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
        component={SignUpScreen}
        options={registerScreenOptions}
        name={CustomerAuthStackRoutes.SIGNUP}
      />
      <CustomerAuthStack.Screen
        component={EmailVerificationScreen}
        options={emailVerificationScreenOptions}
        name={CustomerAuthStackRoutes.EMAIL_VERIFICATION}
      />
    </CustomerAuthStack.Navigator>
  );
};

export default CustomerAuthStackNavigator;

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

const registerScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerAuthStackParamList,
        typeof CustomerAuthStackRoutes.SIGNUP
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Sign Up",
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
