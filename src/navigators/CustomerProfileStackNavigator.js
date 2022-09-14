import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AccountScreen from '../screens/CUSTOMER/AccountScreen'
import ProfileScreen from '../screens/CUSTOMER/AccountScreen/ProfileScreen'
import TransectionScreen from '../screens/CUSTOMER/AccountScreen/TransectionScreen'
import AccountSettingScreen from '../screens/CUSTOMER/AccountScreen/AccountSettingScreen'
import FavoriteScreen from '../screens/CUSTOMER/AccountScreen/FavoriteScreen'
import CommonHeader from '../components/CommonHeader'


const CustomerProfileStack = createStackNavigator();
const CustomerProfileStackNavigator = () => {
  return (
    <CustomerProfileStack.Navigator screenOptions={{
        headerShown:true,
        header: CommonHeader
    }}>
        <CustomerProfileStack.Screen name='account' component={AccountScreen} options={{
            headerTitle:'My Account',
            
        }}/>
        <CustomerProfileStack.Screen name='profile' component={ProfileScreen}
        options={{
            headerShown:false
        }}
        />

<CustomerProfileStack.Screen name='transection' component={TransectionScreen} options={{
            headerTitle:'Transaction',
            
        }}/>

<CustomerProfileStack.Screen name='accountSetting' component={AccountSettingScreen} options={{
            headerTitle:'Account Settings',
            
        }}/>

<CustomerProfileStack.Screen name='favorite' component={FavoriteScreen} options={{
            headerTitle:'Favorite',
            
        }}/>
    </CustomerProfileStack.Navigator>
  )
}

export default CustomerProfileStackNavigator