import React from "react";
import {View, Text} from "react-native";
import BookingIcon from "@assets/icons/booking.svg";
import {OwnerBottomTabParamList} from "@src/navigation";
import AccountIcon from "@assets/icons/account.svg";
import {RouteProp} from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";
import {RedTable, MenuIcon} from "@constants/iconPath";
import CommonTabHeader from "@components/CommonTabHeader";
import LinearGradient from "react-native-linear-gradient";
import MenuItemScreen from "@screens/OWNER/MenuItemScreen/MenuItemScreen";
import {OwnerMainBottomTabRoutes} from "@constants/routes";
import OwnerTableScreen from "@screens/OWNER/OwnerTableScreen";
import OwnerProfileStackNavigator from "./OwnerProfileStackNavigator";
import {OWNER_MAIN_BOTTOM_TAB_NAVIGATOR_ID} from "@constants/navigators";
import OwnerBookingListScreen from "@screens/OWNER/OwnerBookingListScreen/OwnerBookingListScreen";
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import {splitAppTheme} from "@src/theme";

const OwnerMainBotoomTab = createBottomTabNavigator<OwnerBottomTabParamList>();

const OwnerBottomTabNavigator = () => {
  const ownerAccountScreenOptions:
    | BottomTabNavigationOptions
    | ((props: {
        route: RouteProp<
          OwnerBottomTabParamList,
          typeof OwnerMainBottomTabRoutes.OWNER_ACCOUNT
        >;
        navigation: any;
      }) => BottomTabNavigationOptions) = React.useMemo(() => {
    return {
      tabBarIcon: ({focused}) => (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <AccountIcon
            height={30}
            width={30}
            color={
              focused
                ? splitAppTheme.colors.primary[900]
                : splitAppTheme.colors.secondary[900]
            }
          />

          <Text
            style={{
              fontSize: 10,
              color: focused
                ? splitAppTheme.colors.primary[900]
                : splitAppTheme.colors.secondary[900],
            }}>
            Account
          </Text>
        </View>
      ),
    };
  }, [splitAppTheme.colors.primary[900], splitAppTheme.colors.secondary[900]]);

  const menuScreenOptions:
    | BottomTabNavigationOptions
    | ((props: {
        route: RouteProp<
          OwnerBottomTabParamList,
          typeof OwnerMainBottomTabRoutes.MENU
        >;
        navigation: any;
      }) => BottomTabNavigationOptions) = React.useMemo(() => {
    return {
      headerShown: true,
      header: CommonTabHeader,
      headerTitle: "Menu Items",
      tabBarIcon: ({focused}) => (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <MenuIcon
            width={30}
            height={30}
            color={
              focused
                ? splitAppTheme.colors.primary[900]
                : splitAppTheme.colors.secondary[900]
            }
          />

          <Text
            style={{
              fontSize: 10,
              color: focused
                ? splitAppTheme.colors.primary[900]
                : splitAppTheme.colors.secondary[900],
            }}>
            Menu
          </Text>
        </View>
      ),
    };
  }, [splitAppTheme.colors.primary[900], splitAppTheme.colors.secondary[900]]);

  const tableAddScreenOptions:
    | BottomTabNavigationOptions
    | ((props: {
        route: RouteProp<
          OwnerBottomTabParamList,
          typeof OwnerMainBottomTabRoutes.TABLE_ADD
        >;
        navigation: any;
      }) => BottomTabNavigationOptions) = React.useMemo(() => {
    return {
      tabBarIcon: () => (
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
            <Entypo name="plus" size={30} color={"white"} />
          </LinearGradient>
        </View>
      ),
    };
  }, []);

  const ownerTableScreenOptions:
    | BottomTabNavigationOptions
    | ((props: {
        route: RouteProp<
          OwnerBottomTabParamList,
          typeof OwnerMainBottomTabRoutes.OWNER_TABLE
        >;
        navigation: any;
      }) => BottomTabNavigationOptions) = React.useMemo(() => {
    return {
      tabBarIcon: ({focused}) => (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <RedTable
            width={30}
            height={30}
            color={
              focused
                ? splitAppTheme.colors.primary[900]
                : splitAppTheme.colors.secondary[900]
            }
          />

          <Text
            style={{
              fontSize: 10,
              color: focused
                ? splitAppTheme.colors.primary[900]
                : splitAppTheme.colors.secondary[900],
            }}>
            Home
          </Text>
        </View>
      ),
    };
  }, [splitAppTheme.colors.primary[900], splitAppTheme.colors.secondary[900]]);

  const ownerBookingScreenOptions:
    | BottomTabNavigationOptions
    | ((props: {
        route: RouteProp<
          OwnerBottomTabParamList,
          typeof OwnerMainBottomTabRoutes.OWNER_BOOKING
        >;
        navigation: any;
      }) => BottomTabNavigationOptions) = React.useMemo(() => {
    return {
      headerShown: true,
      headerTitle: "Booking",
      header: CommonTabHeader,
      tabBarIcon: ({focused}) => (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <BookingIcon
            height={30}
            width={30}
            color={
              focused
                ? splitAppTheme.colors.primary[900]
                : splitAppTheme.colors.secondary[900]
            }
          />

          <Text
            style={{
              fontSize: 10,
              color: focused
                ? splitAppTheme.colors.primary[900]
                : splitAppTheme.colors.secondary[900],
            }}>
            Booking
          </Text>
        </View>
      ),
    };
  }, [splitAppTheme.colors.primary[900], splitAppTheme.colors.secondary[900]]);

  const globalScreenOptions:
    | BottomTabNavigationOptions
    | ((props: {
        route: RouteProp<
          OwnerBottomTabParamList,
          keyof OwnerBottomTabParamList
        >;
        navigation: any;
      }) => BottomTabNavigationOptions) = React.useMemo(() => {
    return {
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 60,
        elevation: 20,
        shadowColor: "#FF3FCB",
        backgroundColor: "#FFFFFF",
      },
    };
  }, []);

  return (
    <OwnerMainBotoomTab.Navigator
      id={OWNER_MAIN_BOTTOM_TAB_NAVIGATOR_ID}
      screenOptions={globalScreenOptions}>
      <OwnerMainBotoomTab.Screen
        component={OwnerTableScreen}
        options={ownerTableScreenOptions}
        name={OwnerMainBottomTabRoutes.OWNER_TABLE}
      />
      <OwnerMainBotoomTab.Screen
        component={OwnerBookingListScreen}
        options={ownerBookingScreenOptions}
        name={OwnerMainBottomTabRoutes.OWNER_BOOKING}
      />
      <OwnerMainBotoomTab.Screen
        component={OwnerTableScreen}
        options={tableAddScreenOptions}
        name={OwnerMainBottomTabRoutes.TABLE_ADD}
      />
      <OwnerMainBotoomTab.Screen
        component={MenuItemScreen}
        options={menuScreenOptions}
        name={OwnerMainBottomTabRoutes.MENU}
      />
      <OwnerMainBotoomTab.Screen
        options={ownerAccountScreenOptions}
        component={OwnerProfileStackNavigator}
        name={OwnerMainBottomTabRoutes.OWNER_ACCOUNT}
      />
    </OwnerMainBotoomTab.Navigator>
  );
};

export default OwnerBottomTabNavigator;
