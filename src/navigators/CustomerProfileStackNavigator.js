import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AccountScreen from '../screens/CUSTOMER/AccountScreen'
import ProfileScreen from '../screens/CUSTOMER/AccountScreen/ProfileScreen'
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
    </CustomerProfileStack.Navigator>
  )
}

export default CustomerProfileStackNavigator