import React from "react";
import {CustomerProfileStackParamList} from "@src/navigation";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import AccountScreen from "@screens/CUSTOMER/AccountScreen";
import {CustomerProfileStackRoutes} from "@constants/routes";
import CommonStackHeader from "@components/CommonStackHeader";

import {CUSTOMER_PROFILE_STACK_NAVIGATOR_ID} from "@constants/navigators";

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
