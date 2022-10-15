import React from "react";
import {RootStackParamList} from "@src/types";
import {RootStackRoutes} from "@constants/routes";
import InitialScreen from "@screens/InitialScreen";
import ThemeProvider from "@providers/ThemeProvider";
import OwnerStackNavigator from "./OwnerStackNavigator";
import {createStackNavigator} from "@react-navigation/stack";
import CustomerStackNavigator from "./CustomerStackNavigator";
import {ROOT_STACK_NAVIGATOR_ID} from "@constants/navigators";

const RootStack = createStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <ThemeProvider>
      <RootStack.Navigator
        id={ROOT_STACK_NAVIGATOR_ID}
        initialRouteName={RootStackRoutes.CUSTOMER}
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen
          component={InitialScreen}
          name={RootStackRoutes.INITIAL}
        />
        <RootStack.Screen
          name={RootStackRoutes.CUSTOMER}
          component={CustomerStackNavigator}
        />
        <RootStack.Screen
          name={RootStackRoutes.OWNER}
          component={OwnerStackNavigator}
        />
      </RootStack.Navigator>
    </ThemeProvider>
  );
};

export default RootStackNavigator;
