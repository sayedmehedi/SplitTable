import React from "react";
import {RouteProp} from "@react-navigation/native";
import {CustomerBookingStackParamList} from "@src/navigation";
import CommonStackHeader from "@components/CommonStackHeader";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import {CustomerBookingStackRoutes} from "@constants/routes";
import {CUSTOMER_BOOKING_STACK_NAVIGATOR_ID} from "@constants/navigators";
import PaymentScreen from "@screens/CUSTOMER/BookTableScreen/PaymentScreen";
import DateAndTimeScreen from "@screens/CUSTOMER/BookTableScreen/DateAndTimeScreen";
import SelectTableScreen from "@screens/CUSTOMER/BookTableScreen/SelectTableScreen";
import AddMenuItemScreen from "@screens/CUSTOMER/BookTableScreen/AddMenuItemScreen";
import PaymentMethodScreen from "@screens/CUSTOMER/BookTableScreen/PaymentMethodScreen";
import BookingDetailsScreen from "@screens/CUSTOMER/BookTableScreen/BookingDetailsScreen";
import GuestAndOfferMenuScreen from "@screens/CUSTOMER/BookTableScreen/GuestAndOfferMenuScreen";

const BookingStack = createStackNavigator<CustomerBookingStackParamList>();

export default function BookingStackNavigator() {
  return (
    <BookingStack.Navigator
      screenOptions={globalScreenOptions}
      id={CUSTOMER_BOOKING_STACK_NAVIGATOR_ID}>
      <BookingStack.Screen
        component={DateAndTimeScreen}
        options={dateAndTimeScreenOptions}
        name={CustomerBookingStackRoutes.DATE_AND_TIME}
      />

      <BookingStack.Screen
        component={SelectTableScreen}
        options={selectTableScreenOptions}
        name={CustomerBookingStackRoutes.SELECT_TABLE}
      />

      <BookingStack.Screen
        options={guestScreenOptions}
        component={GuestAndOfferMenuScreen}
        name={CustomerBookingStackRoutes.GUEST_AND_OFFER}
      />

      <BookingStack.Screen
        component={AddMenuItemScreen}
        options={addMenuItemScreenOptions}
        name={CustomerBookingStackRoutes.ADD_MENU_ITEM}
      />

      <BookingStack.Screen
        component={BookingDetailsScreen}
        options={bookingDetailsScreenOptions}
        name={CustomerBookingStackRoutes.BOOKING_DETAILS}
      />

      <BookingStack.Screen
        component={PaymentScreen}
        options={paymentScreenOptions}
        name={CustomerBookingStackRoutes.PAYMENT}
      />

      <BookingStack.Screen
        component={PaymentMethodScreen}
        options={paymentMethodScreenOptions}
        name={CustomerBookingStackRoutes.PAYMENT_METHOD}
      />
    </BookingStack.Navigator>
  );
}

const globalScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerBookingStackParamList,
        keyof CustomerBookingStackParamList
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: true,
  header: CommonStackHeader,
};

const dateAndTimeScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerBookingStackParamList,
        typeof CustomerBookingStackRoutes.DATE_AND_TIME
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Select Date & Time",
};

const paymentMethodScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerBookingStackParamList,
        typeof CustomerBookingStackRoutes.PAYMENT_METHOD
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Select a payment method",
};

const paymentScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerBookingStackParamList,
        typeof CustomerBookingStackRoutes.PAYMENT
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Payment",
};

const bookingDetailsScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerBookingStackParamList,
        typeof CustomerBookingStackRoutes.BOOKING_DETAILS
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: false,
};

const addMenuItemScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerBookingStackParamList,
        typeof CustomerBookingStackRoutes.ADD_MENU_ITEM
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Add Menu Item",
};

const guestScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerBookingStackParamList,
        typeof CustomerBookingStackRoutes.GUEST_AND_OFFER
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Guest & Offer Menu",
};

const selectTableScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerBookingStackParamList,
        typeof CustomerBookingStackRoutes.SELECT_TABLE
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Select Table",
};
