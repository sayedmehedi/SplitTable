import React from "react";
import {AuthTypeNum} from "@constants/auth";
import {RootStackParamList} from "@src/navigation";
import {RootStackRoutes} from "@constants/routes";
import InitialScreen from "@screens/InitialScreen";
import {RouteProp} from "@react-navigation/native";
import OwnerStackNavigator from "./OwnerStackNavigator";
import useGetAuthDataQuery from "@hooks/useGetAuthDataQuery";
import CommonStackHeader from "@components/CommonStackHeader";
import CustomerStackNavigator from "./CustomerStackNavigator";
import {ROOT_STACK_NAVIGATOR_ID} from "@constants/navigators";
import NotificationListScreen from "@screens/CUSTOMER/NotificationListScreen";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import SignUpScreen from "@screens/SignUpScreen";
import ProfileScreen from "@screens/ProfileScreen";
import EmailLoginScreen from "@screens/EmailLoginScreen";
import ResetPasswordScreen from "@screens/ResetPasswordScreen";
import ForgotPasswordScreen from "@screens/ForgotPasswordScreen";
import OnboardingScreen from "@screens/CUSTOMER/OnboardingScreen";
import EmailVerificationScreen from "@screens/EmailVerificationScreen";
import LoginPromptScreen from "@screens/CUSTOMER/LoginPromptScreen";

const RootStack = createStackNavigator<RootStackParamList>();

const globalScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<RootStackParamList, keyof RootStackParamList>;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: false,
};

const RootStackNavigator = () => {
  const {data: authData} = useGetAuthDataQuery();

  const authenticatedScreens = (
    <RootStack.Group>
      {authData?.user_type === AuthTypeNum.CUSTOMER && (
        <RootStack.Screen
          name={RootStackRoutes.CUSTOMER}
          component={CustomerStackNavigator}
        />
      )}

      {authData?.user_type === AuthTypeNum.OWNER && (
        <RootStack.Screen
          name={RootStackRoutes.OWNER}
          component={OwnerStackNavigator}
        />
      )}

      <RootStack.Screen
        component={NotificationListScreen}
        name={RootStackRoutes.NOTIFICATIONS}
        options={notificationListScreenOptions}
      />

      <RootStack.Screen
        component={ProfileScreen}
        options={profileScreenOptions}
        name={RootStackRoutes.PROFILE}
      />
    </RootStack.Group>
  );

  const unauthenticatedScreens = (
    <RootStack.Group>
      <RootStack.Screen
        component={InitialScreen}
        name={RootStackRoutes.INITIAL}
      />

      <RootStack.Screen
        component={OnboardingScreen}
        name={RootStackRoutes.CUSTOMER_ONBOARDING}
      />

      <RootStack.Screen
        component={LoginPromptScreen}
        options={loginPromptScreenOptions}
        name={RootStackRoutes.CUSTOMER_LOGIN_PROMPT}
      />

      <RootStack.Group screenOptions={authGroupScreenOptions}>
        <RootStack.Screen
          options={loginScreenOptions}
          component={EmailLoginScreen}
          name={RootStackRoutes.SIGNIN}
        />

        <RootStack.Screen
          component={SignUpScreen}
          name={RootStackRoutes.SIGNUP}
          options={registerScreenOptions}
        />

        <RootStack.Screen
          component={EmailVerificationScreen}
          options={emailVerificationScreenOptions}
          name={RootStackRoutes.EMAIL_VERIFICATION}
        />

        <RootStack.Screen
          component={ForgotPasswordScreen}
          options={forgotPasswordScreenOptions}
          name={RootStackRoutes.FORGOT_PASSWORD}
        />

        <RootStack.Screen
          component={ResetPasswordScreen}
          options={resetPasswordScreenOptions}
          name={RootStackRoutes.RESET_PASSWORD}
        />
      </RootStack.Group>
    </RootStack.Group>
  );

  return (
    <RootStack.Navigator
      id={ROOT_STACK_NAVIGATOR_ID}
      screenOptions={globalScreenOptions}
      initialRouteName={RootStackRoutes.INITIAL}>
      {!!authData ? authenticatedScreens : unauthenticatedScreens}
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;

const authGroupScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<RootStackParamList, keyof RootStackParamList>;
      navigation: any;
    }) => StackNavigationOptions)
  | undefined = {
  headerShown: true,
  header: CommonStackHeader,
};

const notificationListScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        RootStackParamList,
        typeof RootStackRoutes.NOTIFICATIONS
      >;
      navigation: any;
    }) => StackNavigationOptions) = () => ({
  headerShown: true,
  header: CommonStackHeader,
  headerTitle: "Notification",
});

const profileScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<RootStackParamList, typeof RootStackRoutes.PROFILE>;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: false,
};

const emailVerificationScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        RootStackParamList,
        typeof RootStackRoutes.EMAIL_VERIFICATION
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Email Verification",
};

const loginScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<RootStackParamList, typeof RootStackRoutes.SIGNIN>;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Sign In",
};

const forgotPasswordScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        RootStackParamList,
        typeof RootStackRoutes.FORGOT_PASSWORD
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Forget Password",
};

const resetPasswordScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        RootStackParamList,
        typeof RootStackRoutes.RESET_PASSWORD
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Reset Password",
};

const registerScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<RootStackParamList, typeof RootStackRoutes.SIGNUP>;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Sign Up",
};

const loginPromptScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        RootStackParamList,
        typeof RootStackRoutes.CUSTOMER_LOGIN_PROMPT
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: false,
};
