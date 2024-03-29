import React from "react";
import {splitAppTheme} from "@src/theme";
import ChatIcon from "@assets/icons/chat.svg";
import {View, Text, Platform} from "react-native";
import TableIcon from "@assets/icons/table-ico.svg";
import {RouteProp} from "@react-navigation/native";
import HomeIcon from "@assets/icons/HomeIcon.svg";
import AccountIcon from "@assets/icons/account.svg";
import BookingIcon from "@assets/icons/booking.svg";
import LinearGradient from "react-native-linear-gradient";
import {CustomerBottomTabParamList} from "@src/navigation";
import CommonTabHeader from "@components/CommonTabHeader";
import {CustomerMainBottomTabRoutes} from "@constants/routes";
import HomeScreen from "@screens/CUSTOMER/HomeScreen/HomeScreen";
import BookingListScreen from "@screens/CUSTOMER/BookingListScreen";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import ChatListScreen from "@screens/CUSTOMER/ChatScreen";
import CustomerTableScreen from "@screens/CUSTOMER/CustomerTableScreen";
import CustomerProfileStackNavigator from "./CustomerProfileStackNavigator";
import {CUSTOMER_MAIN_BOTTOM_TAB_NAVIGATOR_ID} from "@constants/navigators";

const CustomerBottomTab =
  createBottomTabNavigator<CustomerBottomTabParamList>();

const CustomerBottomTabNavigator = () => {
  return (
    <CustomerBottomTab.Navigator
      screenOptions={globalScreenOptions}
      id={CUSTOMER_MAIN_BOTTOM_TAB_NAVIGATOR_ID}>
      <CustomerBottomTab.Screen
        component={HomeScreen}
        options={homeScreenOptions}
        name={CustomerMainBottomTabRoutes.HOME}
      />
      <CustomerBottomTab.Screen
        component={BookingListScreen}
        options={bookingScreenOptions}
        name={CustomerMainBottomTabRoutes.BOOKING}
      />
      <CustomerBottomTab.Screen
        options={tableScreenOptions}
        component={CustomerTableScreen}
        name={CustomerMainBottomTabRoutes.TABLE_SCREEN}
      />

      <CustomerBottomTab.Screen
        component={ChatListScreen}
        options={chatScreenOptions}
        name={CustomerMainBottomTabRoutes.CHAT_LIST}
      />

      <CustomerBottomTab.Screen
        options={profileStackScreenOptions}
        component={CustomerProfileStackNavigator}
        name={CustomerMainBottomTabRoutes.PROFILE_STACK}
      />
    </CustomerBottomTab.Navigator>
  );
};

export default CustomerBottomTabNavigator;

const globalScreenOptions:
  | BottomTabNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerBottomTabParamList,
        keyof CustomerBottomTabParamList
      >;
      navigation: any;
    }) => BottomTabNavigationOptions) = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    height: Platform.OS == "ios" ? 85 : 70,
    elevation: 20,
    shadowColor: "#FF3FCB",
    backgroundColor: "#FFFFFF",
  },
};

const homeScreenOptions:
  | BottomTabNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerBottomTabParamList,
        typeof CustomerMainBottomTabRoutes.HOME
      >;
      navigation: any;
    }) => BottomTabNavigationOptions) = {
  tabBarIcon: ({focused}) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <HomeIcon
          width={22}
          height={22}
          fill={
            focused
              ? splitAppTheme.colors.primary[400]
              : splitAppTheme.colors.secondary[400]
          }
        />

        <Text
          style={{
            fontSize: splitAppTheme.fontSizes["xs"],
            fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
            color: focused
              ? splitAppTheme.colors.primary[400]
              : splitAppTheme.colors.secondary[400],
          }}>
          Home
        </Text>
      </View>
    );
  },
};

const bookingScreenOptions:
  | BottomTabNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerBottomTabParamList,
        typeof CustomerMainBottomTabRoutes.BOOKING
      >;
      navigation: any;
    }) => BottomTabNavigationOptions) = {
  headerShown: true,
  header: CommonTabHeader,
  headerTitle: "My Booking",
  tabBarIcon: ({focused}) => (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <BookingIcon
        width={22}
        height={22}
        color={
          focused
            ? splitAppTheme.colors.primary[400]
            : splitAppTheme.colors.secondary[400]
        }
      />

      <Text
        style={{
          fontSize: splitAppTheme.fontSizes["xs"],
          fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
          color: focused
            ? splitAppTheme.colors.primary[400]
            : splitAppTheme.colors.secondary[400],
        }}>
        Booking
      </Text>
    </View>
  ),
};

const tableScreenOptions:
  | BottomTabNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerBottomTabParamList,
        typeof CustomerMainBottomTabRoutes.TABLE_SCREEN
      >;
      navigation: any;
    }) => BottomTabNavigationOptions) = {
  tabBarIcon: ({focused}) => (
    <View
      style={{
        flex: 1,
        height: 100,
        position: "absolute",
        alignItems: "center",
      }}>
      <LinearGradient
        end={{x: 0, y: 0}}
        start={{x: 0, y: 1}}
        colors={["#DF3BC0", "#472BBE"]}
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <TableIcon
          height={30}
          width={30}
          fill={focused ? splitAppTheme.colors.primary[400] : "none"}
        />
      </LinearGradient>

      <Text
        style={{
          fontSize: splitAppTheme.fontSizes["xs"],
          fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
          color: splitAppTheme.colors.black,
        }}>
        Table
      </Text>
    </View>
  ),
};

const profileStackScreenOptions:
  | BottomTabNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerBottomTabParamList,
        typeof CustomerMainBottomTabRoutes.PROFILE_STACK
      >;
      navigation: any;
    }) => BottomTabNavigationOptions) = {
  tabBarIcon: ({focused}) => {
    console.log("focused profile", focused);
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}>
        <AccountIcon
          height={20}
          width={20}
          color={
            focused
              ? splitAppTheme.colors.primary[400]
              : splitAppTheme.colors.secondary[400]
          }
        />

        <Text
          style={{
            color: focused
              ? splitAppTheme.colors.primary[400]
              : splitAppTheme.colors.secondary[400],
            fontSize: splitAppTheme.fontSizes["xs"],
            fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
          }}>
          Account
        </Text>
      </View>
    );
  },
};

const chatScreenOptions:
  | BottomTabNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerBottomTabParamList,
        typeof CustomerMainBottomTabRoutes.CHAT_LIST
      >;
      navigation: any;
    }) => BottomTabNavigationOptions) = {
  headerShown: false,
  tabBarIcon: ({focused}) => (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <ChatIcon
        width={20}
        height={20}
        color={
          focused
            ? splitAppTheme.colors.primary[400]
            : splitAppTheme.colors.secondary[400]
        }
      />

      <Text
        style={{
          fontSize: splitAppTheme.fontSizes["xs"],
          fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
          color: focused
            ? splitAppTheme.colors.primary[400]
            : splitAppTheme.colors.secondary[400],
        }}>
        Chat
      </Text>
    </View>
  ),
};
