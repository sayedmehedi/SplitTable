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
import MyTablesScreen from "@screens/OWNER/MyTablesScreen";
import OwnerAccountScreen from "@screens/OWNER/OwnerAccountScreen";
import FaqScreen from "@screens/OWNER/OwnerAccountScreen/FaqScreen";
import LegalScreen from "@screens/OWNER/OwnerAccountScreen/LegalScreen";
import ProfileScreen from "@screens/OWNER/OwnerAccountScreen/ProfileScreen";
import FavoriteScreen from "@screens/OWNER/OwnerAccountScreen/FavoriteScreen";
import TransactionScreen from "@screens/OWNER/OwnerAccountScreen/TransactionScreen";
import AccountSettingScreen from "@screens/OWNER/OwnerAccountScreen/AccountSettingScreen";
import LocationEnablePromptScreen from "@screens/OWNER/OwnerAuthScreen/LocationEnablePromptScreen";

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

  const showLocationScreen =
    !authData?.location && !authData?.latitude && !authData?.longitude;

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
          {showLocationScreen && (
            <OwnerStack.Screen
              options={locationEnableScreenOptions}
              component={LocationEnablePromptScreen}
              name={OwnerStackRoutes.LOCATION_ENABLE}
            />
          )}

          <OwnerStack.Screen
            component={OwnerBottomTabNavigator}
            name={OwnerStackRoutes.OWNER_MAIN_TABS}
          />

          <OwnerStack.Screen
            component={AddMenuItemScreen}
            options={addMenuItemScreenOptions}
            name={OwnerStackRoutes.ADD_MENU_ITEM}
          />

          <OwnerStack.Screen
            component={MyTablesScreen}
            options={addMenuItemScreenOptions}
            name={OwnerStackRoutes.MY_TABLES}
          />

          <OwnerStack.Group>
            <OwnerStack.Screen
              component={OwnerAccountScreen}
              options={accountScreenOptions}
              name={OwnerStackRoutes.ACCOUNT}
            />

            <OwnerStack.Screen
              component={ProfileScreen}
              options={profileScreenOptions}
              name={OwnerStackRoutes.PROFILE}
            />

            <OwnerStack.Screen
              component={TransactionScreen}
              options={transactionScreenOptions}
              name={OwnerStackRoutes.TRANSACTION}
            />

            <OwnerStack.Screen
              component={AccountSettingScreen}
              options={accountSettingScreenOptions}
              name={OwnerStackRoutes.ACCOUNT_SETTING}
            />

            <OwnerStack.Screen
              component={FavoriteScreen}
              options={favoriteScreenOptions}
              name={OwnerStackRoutes.FAVORITE}
            />

            <OwnerStack.Screen
              component={LegalScreen}
              options={legalScreenOptions}
              name={OwnerStackRoutes.LEGAL}
            />

            <OwnerStack.Screen
              component={FaqScreen}
              options={faqScreenOptions}
              name={OwnerStackRoutes.FAQ}
            />
          </OwnerStack.Group>
        </React.Fragment>
      )}
    </OwnerStack.Navigator>
  );
};

export default OwnerStackNavigator;

const locationEnableScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        OwnerStackParamList,
        typeof OwnerStackRoutes.LOCATION_ENABLE
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Select Location",
};

const accountScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<OwnerStackParamList, typeof OwnerStackRoutes.ACCOUNT>;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "My Account",
};
const profileScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<OwnerStackParamList, typeof OwnerStackRoutes.PROFILE>;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: false,
};
const transactionScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        OwnerStackParamList,
        typeof OwnerStackRoutes.TRANSACTION
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Transaction",
};
const accountSettingScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        OwnerStackParamList,
        typeof OwnerStackRoutes.ACCOUNT_SETTING
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Account Settings",
};
const favoriteScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<OwnerStackParamList, typeof OwnerStackRoutes.FAVORITE>;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Favorite",
};
const legalScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<OwnerStackParamList, typeof OwnerStackRoutes.LEGAL>;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "Legal",
};
const faqScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<OwnerStackParamList, typeof OwnerStackRoutes.FAQ>;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerTitle: "FAQ",
};
