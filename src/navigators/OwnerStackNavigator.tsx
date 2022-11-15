import React from "react";
import {OwnerStackRoutes} from "@constants/routes";
import {RouteProp} from "@react-navigation/native";
import {OwnerStackParamList} from "@src/navigation";
import useGetAuthDataQuery from "@hooks/useGetAuthDataQuery";
import CommonStackHeader from "@components/CommonStackHeader";
import {OWNER_STACK_NAVIGATOR_ID} from "@constants/navigators";
import OwnerAuthStackNavigator from "./OwnerAuthStackNavigator";
import OwnerBottomTabNavigator from "./OwnerBottomTabNavigator";
import UpsertMenuScreen from "@screens/OWNER/MenuItemScreen/UpsertMenuScreen";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import MyTablesScreen from "@screens/OWNER/MyTablesScreen";
import OwnerAccountScreen from "@screens/OWNER/OwnerAccountScreen";
import FaqScreen from "@screens/OWNER/OwnerAccountScreen/FaqScreen";
import LegalScreen from "@screens/OWNER/OwnerAccountScreen/LegalScreen";
import InformationScreen from "@screens/OWNER/OwnerAccountScreen/InformationScreen";
import ReviewsScreen from "@screens/OWNER/OwnerAccountScreen/ReviewsScreen";
import TransactionScreen from "@screens/OWNER/OwnerAccountScreen/TransactionScreen";
import AccountSettingScreen from "@screens/OWNER/OwnerAccountScreen/AccountSettingScreen";
import LocationEnablePromptScreen from "@screens/OWNER/OwnerAuthScreen/LocationEnablePromptScreen";
import UpsertTableScreen from "@screens/OWNER/UpsertTableScreen";
import TableDetailsScreen from "@screens/OWNER/TableDetailsScreen";
import ClubSliderImages from "@screens/OWNER/OwnerAccountScreen/ClubSliderImages";

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
        typeof OwnerStackRoutes.UPSERT_MENU
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: true,
  header: CommonStackHeader,
  headerTitle: "Add Menu Items",
};

const tableDetailsScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        OwnerStackParamList,
        typeof OwnerStackRoutes.TABLE_DETAILS
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: true,
  header: CommonStackHeader,
  headerTitle: "Booking/Joining",
};

const myTablesScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<OwnerStackParamList, typeof OwnerStackRoutes.MY_TABLES>;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: true,
  header: CommonStackHeader,
  headerTitle: "My Table",
};

const upsertTableScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        OwnerStackParamList,
        typeof OwnerStackRoutes.UPSERT_TABLE
      >;
      navigation: any;
    }) => StackNavigationOptions) = ({route}) => ({
  headerShown: true,
  header: CommonStackHeader,
  headerTitle:
    route.params.actionMode === "create" ? "Create Table" : "Update Table",
});

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
            component={UpsertMenuScreen}
            options={addMenuItemScreenOptions}
            name={OwnerStackRoutes.UPSERT_MENU}
          />

          <OwnerStack.Screen
            component={TableDetailsScreen}
            options={tableDetailsScreenOptions}
            name={OwnerStackRoutes.TABLE_DETAILS}
          />

          <OwnerStack.Screen
            component={UpsertTableScreen}
            options={upsertTableScreenOptions}
            name={OwnerStackRoutes.UPSERT_TABLE}
          />

          <OwnerStack.Screen
            component={MyTablesScreen}
            options={myTablesScreenOptions}
            name={OwnerStackRoutes.MY_TABLES}
          />

          <OwnerStack.Group
            screenOptions={{
              headerShown: true,
              header: CommonStackHeader,
            }}>
            <OwnerStack.Screen
              component={OwnerAccountScreen}
              options={accountScreenOptions}
              name={OwnerStackRoutes.ACCOUNT}
            />

            <OwnerStack.Screen
              component={InformationScreen}
              options={informationScreenOptions}
              name={OwnerStackRoutes.INFORMATION}
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
              component={ReviewsScreen}
              options={reviewScreenOptions}
              name={OwnerStackRoutes.REVIEWS}
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

            <OwnerStack.Screen
              component={ClubSliderImages}
              options={sliderImagesScreenOptions}
              name={OwnerStackRoutes.SLIDER_IMAGES}
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
const informationScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        OwnerStackParamList,
        typeof OwnerStackRoutes.INFORMATION
      >;
      navigation: any;
    }) => StackNavigationOptions) = {};
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
const reviewScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<OwnerStackParamList, typeof OwnerStackRoutes.REVIEWS>;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: true,
  headerTitle: "Reviews",
  header: CommonStackHeader,
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

const sliderImagesScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        OwnerStackParamList,
        typeof OwnerStackRoutes.SLIDER_IMAGES
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: true,
  header: CommonStackHeader,
  headerTitle: "Slider Images",
};
