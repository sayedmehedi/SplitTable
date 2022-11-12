import React from "react";
import {RouteProp} from "@react-navigation/native";
import {CustomerStackParamList} from "@src/navigation";
import {CustomerStackRoutes} from "@constants/routes";
import BookingStackNavigator from "./BookingStackNavigator";
import useGetAuthDataQuery from "@hooks/useGetAuthDataQuery";
import CommonStackHeader from "@components/CommonStackHeader";
import OnboardingScreen from "@screens/CUSTOMER/OnboardingScreen";
import {CUSTOMER_STACK_NAVIGATOR_ID} from "@constants/navigators";
import ClubSearchScreen from "@screens/CUSTOMER/ClubSearchScreen";
import ClubDetailsScreen from "@screens/CUSTOMER/ClubDetailsScreen";
import CustomerBottomTabNavigator from "./CustomerBottomTabNavigator";
import CustomerAuthStackNavigator from "./CustomerAuthStackNavigator";
import NotificationListScreen from "@screens/CUSTOMER/NotificationListScreen";
import ClubListScreen from "@screens/CUSTOMER/ClubListScreen/ClubListScreen";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import FaqScreen from "@screens/CUSTOMER/AccountScreen/FaqScreen";
import LegalScreen from "@screens/CUSTOMER/AccountScreen/LegalScreen";
import ProfileScreen from "@screens/CUSTOMER/AccountScreen/ProfileScreen";
import FavoriteScreen from "@screens/CUSTOMER/AccountScreen/FavoriteScreen";
import TransactionScreen from "@screens/CUSTOMER/AccountScreen/TransactionScreen";
import AccountSettingScreen from "@screens/CUSTOMER/AccountScreen/AccountSettingScreen";

const CustomerStack = createStackNavigator<CustomerStackParamList>();

const CustomerStackNavigator = () => {
  const {data: authData} = useGetAuthDataQuery();

  return (
    <CustomerStack.Navigator
      id={CUSTOMER_STACK_NAVIGATOR_ID}
      screenOptions={globalScreenOptions}>
      {!authData ? (
        <React.Fragment>
          <CustomerStack.Screen
            component={OnboardingScreen}
            name={CustomerStackRoutes.ONBOARDING}
          />

          <CustomerStack.Screen
            component={CustomerAuthStackNavigator}
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

          <CustomerStack.Screen
            component={ProfileScreen}
            options={profileScreenOptions}
            name={CustomerStackRoutes.PROFILE}
          />

          <CustomerStack.Screen
            component={TransactionScreen}
            options={transactionScreenOptions}
            name={CustomerStackRoutes.TRANSACTION}
          />

          <CustomerStack.Screen
            component={AccountSettingScreen}
            options={accountSettingScreenOptions}
            name={CustomerStackRoutes.ACCOUNT_SETTING}
          />

          <CustomerStack.Screen
            component={FavoriteScreen}
            options={favoriteScreenOptions}
            name={CustomerStackRoutes.FAVORITE}
          />

          <CustomerStack.Screen
            component={LegalScreen}
            options={legalScreenOptions}
            name={CustomerStackRoutes.LEGAL}
          />

          <CustomerStack.Screen
            component={FaqScreen}
            options={faqScreenOptions}
            name={CustomerStackRoutes.FAQ}
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

const profileScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.PROFILE
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: false,
};
const transactionScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.TRANSACTION
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Transaction",
};
const accountSettingScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.ACCOUNT_SETTING
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Account Settings",
};
const favoriteScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.FAVORITE
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Favorite",
};
const legalScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.LEGAL
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Legal",
};
const faqScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<CustomerStackParamList, typeof CustomerStackRoutes.FAQ>;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "FAQ",
};
