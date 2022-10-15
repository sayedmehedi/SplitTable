import {View, Text} from "react-native";
import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "@screens/CUSTOMER/HomeScreen";
import BookingListScreen from "@screens/CUSTOMER/BookingListScreen";
import CustomerTableScreen from "@screens/CUSTOMER/CustomerTableScreen";
import ChatScreen from "@screens/CUSTOMER/ChatScreen";
import HomeIcon from "@assets/icons/HomeIcon.svg";
import BookingIcon from "@assets/icons/booking.svg";
import TableIcon from "@assets/icons/table.svg";
import ChatIcon from "@assets/icons/chat.svg";
import AccountIcon from "@assets/icons/account.svg";
import {useTheme} from "@providers/ThemeProvider";
import LinearGradient from "react-native-linear-gradient";
import CommonStackHeader from "@components/CommonStackHeader";

import CustomerProfileStackNavigator from "./CustomerProfileStackNavigator";
//import homeIcon from '@constants/iconPath/homeIcon'
const Tab = createBottomTabNavigator();

const CustomerBottomTabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          height: 60,
          elevation: 20,
          backgroundColor: "#FFFFFF",
          shadowColor: "#FF3FCB",
        },
      }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}>
              <HomeIcon
                height={30}
                width={30}
                fill={
                  focused
                    ? theme.colors.primary[900]
                    : theme.colors.secondary[900]
                }
              />

              <Text
                style={{
                  color: focused
                    ? theme.colors.primary[900]
                    : theme.colors.secondary[900],
                  fontSize: 10,
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="booking"
        component={BookingListScreen}
        options={{
          header: CommonStackHeader,
          headerShown: true,
          headerTitle: "My Booking",
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}>
              <BookingIcon
                height={30}
                width={30}
                style={{
                  color: focused
                    ? theme.colors.primary[900]
                    : theme.colors.secondary[900],
                }}
              />

              <Text
                style={{
                  color: focused
                    ? theme.colors.primary[900]
                    : theme.colors.secondary[900],
                  fontSize: 10,
                }}>
                Booking
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="tableScreen"
        component={CustomerTableScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                flex: 1,

                height: 100,
                position: "absolute",
                alignItems: "center",
              }}>
              <LinearGradient
                colors={["#DF3BC0", "#472BBE"]}
                start={{x: 0, y: 1}}
                end={{x: 0, y: 0}}
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <TableIcon
                  height={30}
                  width={30}
                  fill={focused ? theme.colors.primary[900] : "none"}
                />
              </LinearGradient>

              <Text
                style={{
                  color: focused
                    ? theme.colors.primary[900]
                    : theme.colors.secondary[900],
                  fontSize: 10,
                }}>
                Table
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}>
              <ChatIcon
                height={30}
                width={30}
                style={{
                  color: focused
                    ? theme.colors.primary[900]
                    : theme.colors.secondary[900],
                }}
                //stroke={focused ? theme.colors.primary[900] : "none"}
                //fill={focused ? "red" : 'none'}
              />

              <Text
                style={{
                  color: focused
                    ? theme.colors.primary[900]
                    : theme.colors.secondary[900],
                  fontSize: 10,
                }}>
                Chat
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="profileStack"
        component={CustomerProfileStackNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}>
              <AccountIcon
                height={30}
                width={30}
                style={{
                  color: focused
                    ? theme.colors.primary[900]
                    : theme.colors.secondary[900],
                }}
                //stroke={focused ? theme.colors.primary[900] : "none"}
                // fill={focused ? theme.colors.primary[900] : theme.colors.secondary[900]}
              />

              <Text
                style={{
                  color: focused
                    ? theme.colors.primary[900]
                    : theme.colors.secondary[900],
                  fontSize: 10,
                }}>
                Account
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomerBottomTabNavigator;
