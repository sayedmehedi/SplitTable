import React from "react";
import {OwnerStackRoutes} from "@constants/routes";
import {RouteProp} from "@react-navigation/native";
import {OwnerStackParamList} from "@src/navigation";
import useGetAuthDataQuery from "@hooks/useGetAuthDataQuery";
import CommonStackHeader from "@components/CommonStackHeader";
import {OWNER_STACK_NAVIGATOR_ID} from "@constants/navigators";
import OwnerAuthStackNavigator from "./OwnerAuthStackNavigator";
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

const OwnerStackNavigator = () => {
  const {data: authData} = useGetAuthDataQuery();

  return (
    <OwnerStack.Navigator
      id={OWNER_STACK_NAVIGATOR_ID}
      screenOptions={globalScreenOptions}>
      {!authData ? (
        <OwnerStack.Screen
          component={OwnerAuthStackNavigator}
          name={OwnerStackRoutes.OWNER_AUTH}
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
