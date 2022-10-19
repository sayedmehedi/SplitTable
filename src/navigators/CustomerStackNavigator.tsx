import React from "react";
import {CustomerStackParamList} from "@src/navigation";
import CustomerAuthStack from "./CustomerAuthStack";
import {RouteProp} from "@react-navigation/native";
import {CustomerStackRoutes} from "@constants/routes";
import BookingStackNavigator from "./BookingStackNavigator";
import CommonStackHeader from "@components/CommonStackHeader";
import ClubListScreen from "@screens/CUSTOMER/ClubListScreen";
import OnboardingScreen from "@screens/CUSTOMER/OnboardingScreen";
import {CUSTOMER_STACK_NAVIGATOR_ID} from "@constants/navigators";
import ClubDetailsScreen from "@screens/CUSTOMER/ClubDetailsScreen";
import CustomerBottomTabNavigator from "./CustomerBottomTabNavigator";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";

const CustomerStack = createStackNavigator<CustomerStackParamList>();

const CustomerStackNavigator = () => {
  return (
    <CustomerStack.Navigator
      id={CUSTOMER_STACK_NAVIGATOR_ID}
      screenOptions={globalScreenOptions}>
      <CustomerStack.Screen
        component={OnboardingScreen}
        name={CustomerStackRoutes.ONBOARDING}
      />
      <CustomerStack.Screen
        component={CustomerAuthStack}
        name={CustomerStackRoutes.CUSTOMER_AUTH}
      />
      <CustomerStack.Screen
        component={CustomerBottomTabNavigator}
        name={CustomerStackRoutes.CUSTOMER_MAIN_TAB}
      />
      <CustomerStack.Screen
        component={ClubListScreen}
        options={clubListScreenOptions}
        name={CustomerStackRoutes.CLUB_LIST}
      />
      <CustomerStack.Screen
        component={ClubDetailsScreen}
        name={CustomerStackRoutes.CLUB_DETAILS}
      />
      <CustomerStack.Screen
        component={BookingStackNavigator}
        name={CustomerStackRoutes.BOOKING}
      />
    </CustomerStack.Navigator>
  );
};

export default CustomerStackNavigator;

const clubListScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.CLUB_LIST
      >;
      navigation: any;
    }) => StackNavigationOptions) = ({route}) => ({
  headerShown: true,
  header: CommonStackHeader,
  headerTitle: route.params.headerTitle,
});

const globalScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<CustomerStackParamList, keyof CustomerStackParamList>;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: false,
};
