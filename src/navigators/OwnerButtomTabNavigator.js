import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/CUSTOMER/HomeScreen';
import BookingListScreen from '../screens/CUSTOMER/BookingListScreen';
import CustomerTableScreen from '../screens/CUSTOMER/CustomerTableScreen';
import ChatScreen from '../screens/CUSTOMER/ChatScreen';
import HomeIcon from '../assets/icons/HomeIcon.svg';
import BookingIcon from '../assets/icons/booking.svg';
import TableIcon from '../assets/icons/table.svg';
import ChatIcon from '../assets/icons/chat.svg'
import { RedTable,MenuIcon } from '../Constants/iconPath';
import AccountIcon from '../assets/icons/account.svg'
import {useTheme} from '../Providers/ThemeProvider';
import LinearGradient from 'react-native-linear-gradient';
import CommonHeader from '../components/CommonHeader';
import OwnerTableScreen from '../screens/OWNER/OwnerTableScreen';
import Entypo from 'react-native-vector-icons/Entypo'
//import homeIcon from '../Constants/iconPath/homeIcon'
const Tab = createBottomTabNavigator();

const OwnerButtomTabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          height: 60,
          elevation: 20,
          backgroundColor: '#FFFFFF',
          shadowColor: '#FF3FCB',
        },
      }}>
      <Tab.Screen
        name="ownerTable"
        component={OwnerTableScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              {/* <HomeIcon
                height={30}
                width={30}
                fill={focused ? theme.colors.primary[900] : theme.colors.secondary[900]}
              /> */}
              <RedTable
                  height={30}
                  width={30}
                  style={{color:focused?theme.colors.primary[900]:theme.colors.secondary[900]}}
                />

              <Text
                style={{
                  color: focused ? theme.colors.primary[900] : theme.colors.secondary[900],
                  fontSize: 10,
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ownerBooking"
        component={OwnerTableScreen}
        options={{
          header:CommonHeader,
          headerShown:true,
          headerTitle:'My Booking',
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <BookingIcon
                height={30}
                width={30}
                style={{color:focused?theme.colors.primary[900]:theme.colors.secondary[900]}}
              />

              <Text
                style={{
                  color: focused ? theme.colors.primary[900] : theme.colors.secondary[900],
                  fontSize: 10,
                }}>
                Booking
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="tableAdd"
        component={OwnerTableScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                
                flex: 1,
                
                height:100,
                position:'absolute',
                alignItems:'center',
                
                
              }}>
              <LinearGradient
              colors={['#DF3BC0', '#472BBE']}
              start={{x: 0, y: 1}}
              end={{x: 0, y: 0}}
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  justifyContent:'center',
                  alignItems:'center',
                 
                  
                }}>
                <Entypo name='plus' size={30} color={'white'}/>
                {/* <TableIcon
                  height={30}
                  width={30}
                  fill={focused ? theme.colors.primary[900] : 'none'}
                /> */}
              </LinearGradient>

              
            </View>
          ),
        }}
      />
      <Tab.Screen name="menu" component={OwnerTableScreen}
       options={{
        tabBarIcon: ({focused}) => (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <MenuIcon
              height={30}
              width={30}
             // style={{color:'#ccc'}}
              //color={'#111'}
              style={{color:focused?theme.colors.primary[900]:theme.colors.secondary[900]}}
              //stroke={focused ? theme.colors.primary[900] : "none"}
              //fill={focused ? "red" : 'green'}
            />

            <Text
              style={{
                color: focused ? theme.colors.primary[900] : theme.colors.secondary[900],
                fontSize: 10,
              }}>
              Menu
            </Text>
          </View>
        ),
      }}
      />
      <Tab.Screen name="ownerAccount" component={OwnerTableScreen}
       options={{
        tabBarIcon: ({focused}) => (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <AccountIcon
              height={30}
              width={30}
              style={{color:focused?theme.colors.primary[900]:theme.colors.secondary[900]}}
              //stroke={focused ? theme.colors.primary[900] : "none"}
             // fill={focused ? theme.colors.primary[900] : theme.colors.secondary[900]}
            />

            <Text
              style={{
                color: focused ? theme.colors.primary[900] : theme.colors.secondary[900],
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

export default OwnerButtomTabNavigator;
