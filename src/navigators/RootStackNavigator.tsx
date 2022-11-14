import React from "react";
import {AuthTypeNum, AuthTypes} from "@constants/auth";
import {RootStackParamList} from "@src/navigation";
import {RootStackRoutes} from "@constants/routes";
import InitialScreen from "@screens/InitialScreen";
import {RouteProp} from "@react-navigation/native";
import OwnerStackNavigator from "./OwnerStackNavigator";
import CustomerStackNavigator from "./CustomerStackNavigator";
import {ROOT_STACK_NAVIGATOR_ID} from "@constants/navigators";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import useGetAuthDataQuery from "@hooks/useGetAuthDataQuery";
import useGetAuthTypeQuery from "@hooks/useGetAuthTypeQuery";
import {Text} from "react-native";
import {AuthTypeContext} from "@providers/AuthTypeProvider";

const RootStack = createStackNavigator<RootStackParamList>();

const globalScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<RootStackParamList, keyof RootStackParamList>;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: false,
};

const RootStackNavigator = () => {
  const {data: authData} = useGetAuthDataQuery();
  const {authType} = React.useContext(AuthTypeContext);

  console.log("auth data", authData);

  const authenticatedScreens = (
    <React.Fragment>
      {authData?.user_type === AuthTypeNum.CUSTOMER && (
        <RootStack.Screen
          name={RootStackRoutes.CUSTOMER}
          component={CustomerStackNavigator}
        />
      )}

      {authData?.user_type === AuthTypeNum.OWNER && (
        <RootStack.Screen
          name={RootStackRoutes.OWNER}
          component={OwnerStackNavigator}
        />
      )}
    </React.Fragment>
  );

  const unauthenticatedScreens = (
    <React.Fragment>
      {authType === null && (
        <RootStack.Screen
          component={InitialScreen}
          name={RootStackRoutes.INITIAL}
        />
      )}

      {authType === AuthTypes.CUSTOMER && (
        <RootStack.Screen
          name={RootStackRoutes.CUSTOMER}
          component={CustomerStackNavigator}
        />
      )}

      {authType === AuthTypes.OWNER && (
        <RootStack.Screen
          name={RootStackRoutes.OWNER}
          component={OwnerStackNavigator}
        />
      )}
    </React.Fragment>
  );

  return (
    <RootStack.Navigator
      id={ROOT_STACK_NAVIGATOR_ID}
      screenOptions={globalScreenOptions}
      initialRouteName={RootStackRoutes.INITIAL}>
      {!!authData ? authenticatedScreens : unauthenticatedScreens}
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
