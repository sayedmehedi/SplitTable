import {NavigatorScreenParams} from "@react-navigation/native";
import {
  RootStackRoutes,
  OwnerStackRoutes,
  CustomerStackRoutes,
  OwnerProfileStackRoutes,
  OwnerMainBottomTabRoutes,
  CustomerAuthStackRoutes,
  CustomerProfileStackRoutes,
  CustomerMainBottomTabRoutes,
  CustomerBookingStackRoutes,
} from "@constants/routes";
import {ClubListTypes} from "@constants/club";

type CustomerAuthStackParamList = {
  [CustomerAuthStackRoutes.SIGNIN]: undefined;
  [CustomerAuthStackRoutes.LOGIN_PROMPT]: undefined;
  [CustomerAuthStackRoutes.LOCATION_ENABLE]: undefined;
  [CustomerAuthStackRoutes.EMAIL_VERIFICATION]: undefined;
};

type CustomerBookingStackParamList = {
  [CustomerBookingStackRoutes.PAYMENT]: undefined;
  [CustomerBookingStackRoutes.SELECT_TABLE]: undefined;
  [CustomerBookingStackRoutes.ADD_MENU_ITEM]: undefined;
  [CustomerBookingStackRoutes.DATE_AND_TIME]: undefined;
  [CustomerBookingStackRoutes.PAYMENT_METHOD]: undefined;
  [CustomerBookingStackRoutes.GUEST_AND_OFFER]: undefined;
  [CustomerBookingStackRoutes.BOOKING_DETAILS]: undefined;
};

type CustomerProfileStackParamList = {
  [CustomerProfileStackRoutes.FAQ]: undefined;
  [CustomerProfileStackRoutes.LEGAL]: undefined;
  [CustomerProfileStackRoutes.ACCOUNT]: undefined;
  [CustomerProfileStackRoutes.PROFILE]: undefined;
  [CustomerProfileStackRoutes.FAVORITE]: undefined;
  [CustomerProfileStackRoutes.TRANSACTION]: undefined;
  [CustomerProfileStackRoutes.ACCOUNT_SETTING]: undefined;
};

type CustomerBottomTabParamList = {
  [CustomerMainBottomTabRoutes.HOME]: undefined;
  [CustomerMainBottomTabRoutes.CHAT]: undefined;
  [CustomerMainBottomTabRoutes.TABLE_SCREEN]: undefined;
  [CustomerMainBottomTabRoutes.BOOKING]: NavigatorScreenParams<CustomerBookingStackParamList>;
  [CustomerMainBottomTabRoutes.PROFILE_STACK]: NavigatorScreenParams<CustomerProfileStackParamList>;
};

type ClubListScreenCommon = {
  headerTitle: string;
};

export type ClubListScreenTypeByLocation = ClubListScreenCommon & {
  locationId: number;
  listType: typeof ClubListTypes["BY_LOCATION"];
};

export type ClubListScreenTypeSearchResult = ClubListScreenCommon & {
  listType: typeof ClubListTypes["SEARCH_RESULT"];
  searchTerm: string;
};

export type ClubListScreenTypeRest = ClubListScreenCommon & {
  listType:
    | typeof ClubListTypes["ALL"]
    | typeof ClubListTypes["NEAR"]
    | typeof ClubListTypes["POPULAR"]
    | typeof ClubListTypes["RECENT_VISIT"];
};

type CustomerStackParamList = {
  [CustomerStackRoutes.CLUB_LIST]:
    | ClubListScreenTypeByLocation
    | ClubListScreenTypeSearchResult
    | ClubListScreenTypeRest;
  [CustomerStackRoutes.ONBOARDING]: undefined;
  [CustomerStackRoutes.NOTIFICATIONS]: undefined;
  [CustomerStackRoutes.CLUB_DETAILS]: {
    clubId: number;
  };
  [CustomerStackRoutes.BOOKING]: NavigatorScreenParams<CustomerBookingStackParamList>;
  [CustomerStackRoutes.CUSTOMER_AUTH]: NavigatorScreenParams<CustomerAuthStackParamList>;
  [CustomerStackRoutes.CUSTOMER_MAIN_TAB]: NavigatorScreenParams<CustomerBottomTabParamList>;
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
