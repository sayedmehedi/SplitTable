import React from "react";
import {OwnerStackRoutes} from "@constants/routes";
import useAuthContext from "@hooks/useAuthContext";
import {RouteProp} from "@react-navigation/native";
import {OwnerStackParamList} from "@src/navigation";
import SignUpScreen from "@screens/OWNER/SignUpScreen";
import CommonStackHeader from "@components/CommonStackHeader";
import {OWNER_STACK_NAVIGATOR_ID} from "@constants/navigators";
import OwnerBottomTabNavigator from "./OwnerBottomTabNavigator";
import AddMenuItemScreen from "@screens/OWNER/MenuItemScreen/AddMenuItemScreen";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";

const OwnerStack = createStackNavigator<OwnerStackParamList>();

const globalScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<OwnerStackParamList, keyof OwnerStackParamList>;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: false,
};

const addMenuItemScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        OwnerStackParamList,
        typeof OwnerStackRoutes.ADD_MENU_ITEM
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: true,
  header: CommonStackHeader,
  headerTitle: "Add Menu Items",
};

const signupScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        OwnerStackParamList,
        typeof OwnerStackRoutes.OWNER_SIGN_UP
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: true,
  header: CommonStackHeader,
  headerTitle: "Sign Up",
};

const OwnerStackNavigator = () => {
  const {isAuthenticated} = useAuthContext();

  return (
    <OwnerStack.Navigator
      id={OWNER_STACK_NAVIGATOR_ID}
      screenOptions={globalScreenOptions}>
      {!isAuthenticated ? (
        <OwnerStack.Screen
          component={SignUpScreen}
          options={signupScreenOptions}
          name={OwnerStackRoutes.OWNER_SIGN_UP}
        />
      ) : (
        <React.Fragment>
          <OwnerStack.Screen
            component={OwnerBottomTabNavigator}
            name={OwnerStackRoutes.OWNER_MAIN_TABS}
          />

          <OwnerStack.Screen
            component={AddMenuItemScreen}
            options={addMenuItemScreenOptions}
            name={OwnerStackRoutes.ADD_MENU_ITEM}
          />
        </React.Fragment>
      )}
    </OwnerStack.Navigator>
  );
};

export default OwnerStackNavigator;
