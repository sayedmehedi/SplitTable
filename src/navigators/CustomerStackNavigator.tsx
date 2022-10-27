import React from "react";
import CustomerAuthStack from "./CustomerAuthStack";
import {RouteProp} from "@react-navigation/native";
import useAuthContext from "@hooks/useAuthContext";
import {CustomerStackParamList} from "@src/navigation";
import {CustomerStackRoutes} from "@constants/routes";
import BookingStackNavigator from "./BookingStackNavigator";
import CommonStackHeader from "@components/CommonStackHeader";
import OnboardingScreen from "@screens/CUSTOMER/OnboardingScreen";
import {CUSTOMER_STACK_NAVIGATOR_ID} from "@constants/navigators";
import ClubDetailsScreen from "@screens/CUSTOMER/ClubDetailsScreen";
import CustomerBottomTabNavigator from "./CustomerBottomTabNavigator";
import NotificationListScreen from "@screens/CUSTOMER/NotificationListScreen";
import ClubListScreen from "@screens/CUSTOMER/ClubListScreen/ClubListScreen";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import ClubSearchScreen from "@screens/CUSTOMER/ClubSearchScreen";

const CustomerStack = createStackNavigator<CustomerStackParamList>();

const CustomerStackNavigator = () => {
  const {isAuthenticated} = useAuthContext();

  return (
    <CustomerStack.Navigator
      id={CUSTOMER_STACK_NAVIGATOR_ID}
      screenOptions={globalScreenOptions}>
      {!isAuthenticated ? (
        <React.Fragment>
          <CustomerStack.Screen
            component={OnboardingScreen}
            name={CustomerStackRoutes.ONBOARDING}
          />

          <CustomerStack.Screen
            component={CustomerAuthStack}
            name={CustomerStackRoutes.CUSTOMER_AUTH}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
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

          <CustomerStack.Screen
            component={NotificationListScreen}
            options={notificationListScreenOptions}
            name={CustomerStackRoutes.NOTIFICATIONS}
          />

          <CustomerStack.Screen
            component={ClubSearchScreen}
            options={clubSearchScreenOptions}
            name={CustomerStackRoutes.CLUB_SEARCH}
          />
        </React.Fragment>
      )}
    </CustomerStack.Navigator>
  );
};

export default CustomerStackNavigator;

const clubSearchScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.CLUB_SEARCH
      >;
      navigation: any;
    }) => StackNavigationOptions) = () => ({
  headerShown: false,
});

const notificationListScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.NOTIFICATIONS
      >;
      navigation: any;
    }) => StackNavigationOptions) = () => ({
  headerShown: true,
  header: CommonStackHeader,
  headerTitle: "Notification",
});

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
