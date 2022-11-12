import React from "react";
import {OwnerAuthStackParamList} from "@src/navigation";
import CommonStackHeader from "@components/CommonStackHeader";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import {OwnerAuthStackRoutes} from "@constants/routes";
import {OWNER_AUTH_STACK_NAVIGATOR_ID} from "@constants/navigators";
import SignUpScreen from "@screens/OWNER/OwnerAuthScreen/SignUpScreen";
import SignInScreen from "@screens/OWNER/OwnerAuthScreen/SignInScreen";
import EmailVerificationScreen from "@screens/OWNER/OwnerAuthScreen/EmailVerificationScreen";
import LocationEnablePromptScreen from "@screens/OWNER/OwnerAuthScreen/LocationEnablePromptScreen";

const OwnerAuthStack = createStackNavigator<OwnerAuthStackParamList>();

const OwnerAuthStackNavigator = () => {
  return (
    <OwnerAuthStack.Navigator
      id={OWNER_AUTH_STACK_NAVIGATOR_ID}
      screenOptions={globalScreenOptions}>
      <OwnerAuthStack.Screen
        component={SignInScreen}
        options={loginScreenOptions}
        name={OwnerAuthStackRoutes.SIGNIN}
      />
      <OwnerAuthStack.Screen
        component={SignUpScreen}
        options={signupScreenOptions}
        name={OwnerAuthStackRoutes.SIGNUP}
      />
      <OwnerAuthStack.Screen
        component={EmailVerificationScreen}
        options={emailVerificationScreenOptions}
        name={OwnerAuthStackRoutes.EMAIL_VERIFICATION}
      />
      <OwnerAuthStack.Screen
        options={locationEnableScreenOptions}
        component={LocationEnablePromptScreen}
        name={OwnerAuthStackRoutes.LOCATION_ENABLE}
      />
    </OwnerAuthStack.Navigator>
  );
};

export default OwnerAuthStackNavigator;

const signupScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        OwnerAuthStackParamList,
        typeof OwnerAuthStackRoutes.SIGNUP
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: true,
  header: CommonStackHeader,
  headerTitle: "Sign Up",
};

const locationEnableScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        OwnerAuthStackParamList,
        typeof OwnerAuthStackRoutes.LOCATION_ENABLE
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Select Location",
};

const emailVerificationScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        OwnerAuthStackParamList,
        typeof OwnerAuthStackRoutes.EMAIL_VERIFICATION
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Email Verification",
};

const loginScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        OwnerAuthStackParamList,
        typeof OwnerAuthStackRoutes.SIGNIN
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Sign in",
};

const globalScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<OwnerAuthStackParamList, keyof OwnerAuthStackParamList>;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: true,
  header: CommonStackHeader,
};
