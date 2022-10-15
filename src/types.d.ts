import {NavigatorScreenParams} from "@react-navigation/native";
import {
  RootStackRoutes,
  OwnerStackRoutes,
  CustomerStackRoutes,
  OwnerProfileStackRoutes,
  OwnerMainBottomTabRoutes,
} from "@constants/routes";

type CustomerStackParamList = {
  [CustomerStackRoutes.BOOKING]: undefined;
  [CustomerStackRoutes.CLUB_LIST]: undefined;
  [CustomerStackRoutes.ONBOARDING]: undefined;
  [CustomerStackRoutes.CLUB_DETAILS]: undefined;
  [CustomerStackRoutes.CUSTOMER_AUTH]: undefined;
  [CustomerStackRoutes.CUSTOMER_MAIN_TAB]: undefined;
};

type OwnerAccountStackParamList = {
  [OwnerProfileStackRoutes.FAQ]: undefined;
  [OwnerProfileStackRoutes.LEGAL]: undefined;
  [OwnerProfileStackRoutes.ACCOUNT]: undefined;
  [OwnerProfileStackRoutes.PROFILE]: undefined;
  [OwnerProfileStackRoutes.FAVORITE]: undefined;
  [OwnerProfileStackRoutes.TRANSACTION]: undefined;
  [OwnerProfileStackRoutes.ACCOUNT_SETTING]: undefined;
};

type OwnerBottomTabParamList = {
  [OwnerMainBottomTabRoutes.MENU]: undefined;
  [OwnerMainBottomTabRoutes.TABLE_ADD]: undefined;
  [OwnerMainBottomTabRoutes.OWNER_TABLE]: undefined;
  [OwnerMainBottomTabRoutes.OWNER_BOOKING]: undefined;
  [OwnerMainBottomTabRoutes.OWNER_ACCOUNT]: NavigatorScreenParams<OwnerAccountStackParamList>;
};

type OwnerStackParamList = {
  [OwnerStackRoutes.OWNER_SIGN_UP]: undefined;
  [OwnerStackRoutes.ADD_MENU_ITEM]: undefined;
  [OwnerStackRoutes.OWNER_MAIN_TABS]: NavigatorScreenParams<OwnerBottomTabParamList>;
};

type RootStackParamList = {
  [RootStackRoutes.INITIAL]: undefined;
  [RootStackRoutes.OWNER]: NavigatorScreenParams<OwnerStackParamList>;
  [RootStackRoutes.CUSTOMER]: NavigatorScreenParams<CustomerStackParamList>;
};
