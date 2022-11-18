import React from "react";
import {RootStackParamList} from "@src/navigation";
import {RootStackRoutes} from "@constants/routes";
import InitialScreen from "@screens/InitialScreen";
import {RouteProp} from "@react-navigation/native";
import {AuthTypeNum, AuthTypes} from "@constants/auth";
import OwnerStackNavigator from "./OwnerStackNavigator";
import useGetAuthDataQuery from "@hooks/useGetAuthDataQuery";
import CommonStackHeader from "@components/CommonStackHeader";
import {AuthTypeContext} from "@providers/AuthTypeProvider";
import CustomerStackNavigator from "./CustomerStackNavigator";
import {ROOT_STACK_NAVIGATOR_ID} from "@constants/navigators";
import NotificationListScreen from "@screens/CUSTOMER/NotificationListScreen";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import ProfileScreen from "@screens/ProfileScreen";

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

      <RootStack.Screen
        component={NotificationListScreen}
        name={RootStackRoutes.NOTIFICATIONS}
        options={notificationListScreenOptions}
      />

      <RootStack.Screen
        component={ProfileScreen}
        options={profileScreenOptions}
        name={RootStackRoutes.PROFILE}
      />
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

const notificationListScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        RootStackParamList,
        typeof RootStackRoutes.NOTIFICATIONS
      >;
      navigation: any;
    }) => StackNavigationOptions) = () => ({
  headerShown: true,
  header: CommonStackHeader,
  headerTitle: "Notification",
});

const profileScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<RootStackParamList, typeof RootStackRoutes.PROFILE>;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: false,
};
