import React from 'react';
import {View, Text} from 'react-native';
import CommonHeader from '../components/CommonHeader';
import {createStackNavigator} from '@react-navigation/stack';
import PaymentScreen from '../screens/CUSTOMER/ClubDetailsScreen/PaymentScreen';
import DateAndTimeScreen from '../screens/CUSTOMER/ClubDetailsScreen/DateAndTimeScreen';
import SelectTableScreen from '../screens/CUSTOMER/ClubDetailsScreen/SelectTableScreen';
import AddMenuItemScreen from '../screens/CUSTOMER/ClubDetailsScreen/AddMenuItemScreen';
import PaymentMethodScreen from '../screens/CUSTOMER/ClubDetailsScreen/PaymentMethodScreen';
import BookingDetailsScreen from '../screens/CUSTOMER/ClubDetailsScreen/BookingDetailsScreen';
import GuestAndOfferMenuScreen from '../screens/CUSTOMER/ClubDetailsScreen/GuestAndOfferMenuScreen';
import PaymentSuccessPromtScreen from '../screens/CUSTOMER/ClubDetailsScreen/PaymentSuccessPromtScreen';

const BookingStack = createStackNavigator();

export default function BookingStackNavigator() {
  return (
    <BookingStack.Navigator
      screenOptions={{
        headerShown: true,
        header: CommonHeader,
      }}>
      <BookingStack.Screen
        name="dateAndTime"
        component={DateAndTimeScreen}
        options={{
          headerTitle: 'Select Date & Time',
        }}
      />

      <BookingStack.Screen
        name="selectTable"
        component={SelectTableScreen}
        options={{
          headerTitle: 'Select Table',
        }}
      />
      <BookingStack.Screen
        name="guestAndOffer"
        component={GuestAndOfferMenuScreen}
        options={{
          headerTitle: 'Guest & Offer Menu',
        }}
      />
      <BookingStack.Screen
        name="addMenuItem"
        component={AddMenuItemScreen}
        options={{
          headerTitle: 'Add Menu Item',
        }}
      />
       <BookingStack.Screen
        name="bookingDetails"
        component={BookingDetailsScreen}
        options={{
          headerShown:false
        }}
      />
      <BookingStack.Screen
        name="payment"
        component={PaymentScreen}
        options={{
          headerTitle: 'Payment',
        }}
      />
      <BookingStack.Screen
        name="paymentMethod"
        component={PaymentMethodScreen}
        options={{
          headerTitle: 'Select a payment method',
        }}
      />
    </BookingStack.Navigator>
  );
}
