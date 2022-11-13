import React from "react";
import {splitAppTheme} from "@src/theme";
import {TouchableOpacity, View} from "react-native";
import {CustomerStackRoutes} from "@constants/routes";
import BookingStackNavigator from "./BookingStackNavigator";
import useGetAuthDataQuery from "@hooks/useGetAuthDataQuery";
import CommonStackHeader from "@components/CommonStackHeader";
import TableListScreen from "@screens/CUSTOMER/TableListScreen";
import OnboardingScreen from "@screens/CUSTOMER/OnboardingScreen";
import {CUSTOMER_STACK_NAVIGATOR_ID} from "@constants/navigators";
import TableSearchScreen from "@screens/CUSTOMER/TableSearchScreen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ClubDetailsScreen from "@screens/CUSTOMER/ClubDetailsScreen";
import CustomerBottomTabNavigator from "./CustomerBottomTabNavigator";
import CustomerAuthStackNavigator from "./CustomerAuthStackNavigator";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import {CompositeNavigationProp, RouteProp} from "@react-navigation/native";
import NotificationListScreen from "@screens/CUSTOMER/NotificationListScreen";
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from "@react-navigation/stack";
import {isSplitTableDetails} from "@utils/table";
import FaqScreen from "@screens/CUSTOMER/AccountScreen/FaqScreen";
import TableDetailsScreen from "@screens/CUSTOMER/TableDetailsScreen";
import LegalScreen from "@screens/CUSTOMER/AccountScreen/LegalScreen";
import ProfileScreen from "@screens/CUSTOMER/AccountScreen/ProfileScreen";
import FavoriteScreen from "@screens/CUSTOMER/AccountScreen/FavoriteScreen";
import PaymentScreen from "@screens/CUSTOMER/BookTableScreen/PaymentScreen";
import TransactionScreen from "@screens/CUSTOMER/AccountScreen/TransactionScreen";
import AddMenuItemScreen from "@screens/CUSTOMER/BookTableScreen/AddMenuItemScreen";
import AccountSettingScreen from "@screens/CUSTOMER/AccountScreen/AccountSettingScreen";
import PaymentMethodScreen from "@screens/CUSTOMER/BookTableScreen/PaymentMethodScreen";
import BookingDetailsScreen from "@screens/CUSTOMER/BookTableScreen/BookingDetailsScreen";
import GuestAndOfferMenuScreen from "@screens/CUSTOMER/BookTableScreen/GuestAndOfferMenuScreen";
import LocationEnablePromptScreen from "@screens/CUSTOMER/CustomerAuthScreen/LocationEnablePromptScreen";

const CustomerStack = createStackNavigator<CustomerStackParamList>();

type NavitaionProps = CompositeNavigationProp<
  StackNavigationProp<CustomerStackParamList>,
  StackNavigationProp<RootStackParamList>
>;

const CustomerStackNavigator = () => {
  const {data: authData} = useGetAuthDataQuery();

  const showLocationScreen =
    !authData?.location && !authData?.latitude && !authData?.longitude;

  return (
    <CustomerStack.Navigator
      id={CUSTOMER_STACK_NAVIGATOR_ID}
      screenOptions={globalScreenOptions}>
      {!authData ? (
        <React.Fragment>
          <CustomerStack.Screen
            component={OnboardingScreen}
            name={CustomerStackRoutes.ONBOARDING}
          />

          <CustomerStack.Screen
            component={CustomerAuthStackNavigator}
            name={CustomerStackRoutes.CUSTOMER_AUTH}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {showLocationScreen && (
            <CustomerStack.Screen
              options={locationEnableScreenOptions}
              component={LocationEnablePromptScreen}
              name={CustomerStackRoutes.LOCATION_ENABLE}
            />
          )}

          <CustomerStack.Screen
            component={CustomerBottomTabNavigator}
            name={CustomerStackRoutes.CUSTOMER_MAIN_TAB}
          />

          <CustomerStack.Screen
            component={TableListScreen}
            options={tableListScreenOptions}
            name={CustomerStackRoutes.TABLE_LIST}
          />

          <CustomerStack.Screen
            component={TableDetailsScreen}
            options={tableDetailsScreenOptions}
            name={CustomerStackRoutes.TABLE_DETAILS}
          />

          <CustomerStack.Screen
            component={ClubDetailsScreen}
            name={CustomerStackRoutes.CLUB_DETAILS}
          />

          {/* <CustomerStack.Screen
            component={BookingStackNavigator}
            name={CustomerStackRoutes.BOOKING}
          /> */}

          <CustomerStack.Screen
            component={NotificationListScreen}
            options={notificationListScreenOptions}
            name={CustomerStackRoutes.NOTIFICATIONS}
          />

          <CustomerStack.Screen
            component={TableSearchScreen}
            options={clubSearchScreenOptions}
            name={CustomerStackRoutes.TABLE_SEARCH}
          />

          <CustomerStack.Group>
            <CustomerStack.Screen
              component={GuestAndOfferMenuScreen}
              options={guestNOfferMenuScreenOptions}
              name={CustomerStackRoutes.GUEST_N_MENU}
            />

            <CustomerStack.Screen
              component={AddMenuItemScreen}
              options={addMenuItemScreenOptions}
              name={CustomerStackRoutes.ADD_MENU_ITEM}
            />

            <CustomerStack.Screen
              component={BookingDetailsScreen}
              name={CustomerStackRoutes.BOOKING_DETAILS}
            />

            <CustomerStack.Screen
              component={PaymentScreen}
              options={paymentScreenOptions}
              name={CustomerStackRoutes.PAYMENT}
            />

            <CustomerStack.Screen
              component={PaymentMethodScreen}
              options={paymentMethodScreenOptions}
              name={CustomerStackRoutes.PAYMENT_METHOD}
            />
          </CustomerStack.Group>

          <CustomerStack.Group>
            <CustomerStack.Screen
              component={ProfileScreen}
              options={profileScreenOptions}
              name={CustomerStackRoutes.PROFILE}
            />

            <CustomerStack.Screen
              component={TransactionScreen}
              options={transactionScreenOptions}
              name={CustomerStackRoutes.TRANSACTION}
            />

            <CustomerStack.Screen
              component={AccountSettingScreen}
              options={accountSettingScreenOptions}
              name={CustomerStackRoutes.ACCOUNT_SETTING}
            />

            <CustomerStack.Screen
              component={FavoriteScreen}
              options={favoriteScreenOptions}
              name={CustomerStackRoutes.FAVORITE}
            />

            <CustomerStack.Screen
              component={LegalScreen}
              options={legalScreenOptions}
              name={CustomerStackRoutes.LEGAL}
            />

            <CustomerStack.Screen
              component={FaqScreen}
              options={faqScreenOptions}
              name={CustomerStackRoutes.FAQ}
            />
          </CustomerStack.Group>
        </React.Fragment>
      )}
    </CustomerStack.Navigator>
  );
};

export default CustomerStackNavigator;

const paymentMethodScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.PAYMENT_METHOD
      >;
      navigation: NavitaionProps;
    }) => StackNavigationOptions) = {
  headerShown: true,
  header: CommonStackHeader,
  headerTitleAlign: "center",
  headerTitle: "Select a payment method",
};

const paymentScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.PAYMENT
      >;
      navigation: NavitaionProps;
    }) => StackNavigationOptions) = {
  headerShown: true,
  headerTitle: "Payment",
  header: CommonStackHeader,
  headerTitleAlign: "center",
};

const addMenuItemScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.ADD_MENU_ITEM
      >;
      navigation: NavitaionProps;
    }) => StackNavigationOptions) = {
  headerShown: true,
  header: CommonStackHeader,
  headerTitleAlign: "center",
  headerTitle: "Add Menu Item",
};

const locationEnableScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.LOCATION_ENABLE
      >;
      navigation: NavitaionProps;
    }) => StackNavigationOptions) = {
  headerShown: true,
  header: CommonStackHeader,
  headerTitleAlign: "center",
  headerTitle: "Select Location",
};

const guestNOfferMenuScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.GUEST_N_MENU
      >;
      navigation: NavitaionProps;
    }) => StackNavigationOptions) = ({route}) => ({
  headerShown: true,
  header: CommonStackHeader,
  headerTitle: isSplitTableDetails(route.params.tableDetails)
    ? "Join Now"
    : "Book Table",
});

const clubSearchScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.TABLE_SEARCH
      >;
      navigation: NavitaionProps;
    }) => StackNavigationOptions) = () => ({
  headerShown: true,
  header: CommonStackHeader,
  headerTitleAlign: "center",
  title: "Search Table & Events",
});

const notificationListScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.NOTIFICATIONS
      >;
      navigation: NavitaionProps;
    }) => StackNavigationOptions) = () => ({
  headerShown: true,
  header: CommonStackHeader,
  headerTitle: "Notification",
});

const tableDetailsScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.TABLE_DETAILS
      >;
      navigation: NavitaionProps;
    }) => StackNavigationOptions) = ({route, navigation}) => ({
  headerShown: false,
});

const tableListScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.TABLE_LIST
      >;
      navigation: NavitaionProps;
    }) => StackNavigationOptions) = ({route, navigation}) => ({
  headerShown: true,
  header: CommonStackHeader,
  headerTitle: route.params.headerTitle,
  headerRight: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(CustomerStackRoutes.TABLE_SEARCH);
      }}>
      <View>
        <MaterialIcons
          size={30}
          name={"search"}
          color={splitAppTheme.colors.black}
        />
      </View>
    </TouchableOpacity>
  ),
  headerRightContainerStyle: {
    paddingRight: splitAppTheme.space[6],
  },
});

const globalScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<CustomerStackParamList, keyof CustomerStackParamList>;
      navigation: NavitaionProps;
    }) => StackNavigationOptions) = {
  headerShown: false,
};

const profileScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.PROFILE
      >;
      navigation: NavitaionProps;
    }) => StackNavigationOptions) = {
  headerShown: false,
};
const transactionScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.TRANSACTION
      >;
      navigation: NavitaionProps;
    }) => StackNavigationOptions) = {
  headerTitle: "Transaction",
};
const accountSettingScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.ACCOUNT_SETTING
      >;
      navigation: NavitaionProps;
    }) => StackNavigationOptions) = {
  headerTitle: "Account Settings",
};
const favoriteScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.FAVORITE
      >;
      navigation: NavitaionProps;
    }) => StackNavigationOptions) = {
  headerTitle: "Favorite",
};
const legalScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.LEGAL
      >;
      navigation: NavitaionProps;
    }) => StackNavigationOptions) = {
  headerTitle: "Legal",
};
const faqScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<CustomerStackParamList, typeof CustomerStackRoutes.FAQ>;
      navigation: NavitaionProps;
    }) => StackNavigationOptions) = {
  headerTitle: "FAQ",
};
