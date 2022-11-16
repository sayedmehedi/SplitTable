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
import InitialSelectLocationScreen from "@screens/CUSTOMER/CustomerAuthScreen/InitialSelectLocationScreen";
import BookingSelectLocationScreen from "@screens/CUSTOMER/BookTableScreen/BookingSelectLocationScreen";
import PaymentGatewayScreen from "@screens/CUSTOMER/BookTableScreen/PaymentGatewayScreen";
import JoinTableDetailsScreen from "@screens/CUSTOMER/JoinTableDetailsScreen";
import {AppTableListTypes} from "@constants/table";

const CustomerStack = createStackNavigator<CustomerStackParamList>();

type NavitaionProps = CompositeNavigationProp<
  StackNavigationProp<CustomerStackParamList>,
  StackNavigationProp<RootStackParamList>
>;

const CustomerStackNavigator = () => {
  const {data: authData} = useGetAuthDataQuery();

  console.log("auth data in CustomerStackNavigator", authData);

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
              component={InitialSelectLocationScreen}
              name={CustomerStackRoutes.INITIAL_SELECT_LOCATION}
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
            component={JoinTableDetailsScreen}
            options={joinTableDetailsScreenOptions}
            name={CustomerStackRoutes.JOIN_TABLE_DETAILS}
          />

          <CustomerStack.Screen
            component={ClubDetailsScreen}
            name={CustomerStackRoutes.CLUB_DETAILS}
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
              component={BookingSelectLocationScreen}
              options={bookingSelectLocationScreenOptions}
              name={CustomerStackRoutes.BOOKING_SELECT_LOCATION}
            />

            <CustomerStack.Screen
              component={PaymentScreen}
              options={paymentScreenOptions}
              name={CustomerStackRoutes.PAYMENT_AMOUNT}
            />

            <CustomerStack.Screen
              component={PaymentMethodScreen}
              options={paymentMethodScreenOptions}
              name={CustomerStackRoutes.PAYMENT_METHOD}
            />

            <CustomerStack.Screen
              component={PaymentGatewayScreen}
              options={paymentGatewayScreenOptions}
              name={CustomerStackRoutes.PAYMENT_GATEWAY}
            />
          </CustomerStack.Group>

          <CustomerStack.Group
            screenOptions={{
              headerShown: true,
              header: CommonStackHeader,
              headerTitleAlign: "center",
            }}>
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
  headerTitle: "Select a Payment Method",
};

const paymentScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.PAYMENT_AMOUNT
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
        typeof CustomerStackRoutes.INITIAL_SELECT_LOCATION
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

const joinTableDetailsScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.JOIN_TABLE_DETAILS
      >;
      navigation: NavitaionProps;
    }) => StackNavigationOptions) = ({route, navigation}) => ({
  headerShown: true,
  header: CommonStackHeader,
  headerTitleAlign: "center",
  title: "Join Table",
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
        if (route.params.listType === AppTableListTypes.BY_CLUB_ID) {
          navigation.navigate(CustomerStackRoutes.TABLE_SEARCH, {
            listType: route.params.listType,
            initialSearchTerms: route.params.searchTerm,
            listScreenHeaderTitle: route.params.headerTitle,
          });
        } else if (route.params.listType === AppTableListTypes.BY_LOCATION) {
          navigation.navigate(CustomerStackRoutes.TABLE_SEARCH, {
            listType: route.params.listType,
            initialSearchTerms: route.params.searchTerm,
            listScreenHeaderTitle: route.params.headerTitle,
          });
        } else if (route.params.listType === AppTableListTypes.SEARCH_RESULT) {
          navigation.navigate(CustomerStackRoutes.TABLE_SEARCH, {
            listType: route.params.listType,
            initialSearchTerms: route.params.searchTerm,
            listScreenHeaderTitle: route.params.headerTitle,
          });
        } else {
          navigation.navigate(CustomerStackRoutes.TABLE_SEARCH, {
            listScreenHeaderTitle: route.params.headerTitle,
            initialSearchTerms: route.params.searchTerm,
            listType: route.params.listType,
          });
        }
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

const bookingSelectLocationScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.BOOKING_SELECT_LOCATION
      >;
      navigation: NavitaionProps;
    }) => StackNavigationOptions) = {
  headerTitle: "Select Location",
};

const paymentGatewayScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerStackParamList,
        typeof CustomerStackRoutes.PAYMENT_GATEWAY
      >;
      navigation: NavitaionProps;
    }) => StackNavigationOptions) = {
  headerShown: false,
};
