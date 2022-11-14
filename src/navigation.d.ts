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
  OwnerAuthStackRoutes,
} from "@constants/routes";
import {AppTableListTypes} from "@constants/table";
import {
  BookedTable,
  BookedTableDetails as BookingTableDetails,
  ClubMenuItem,
  SplitTableDetails,
  TableCommonSearchParams,
} from "./models";

type CustomerAuthStackParamList = {
  [CustomerAuthStackRoutes.SIGNIN]: undefined;
  [CustomerAuthStackRoutes.SIGNUP]: undefined;
  [CustomerAuthStackRoutes.LOGIN_PROMPT]: undefined;
  [CustomerAuthStackRoutes.LOCATION_ENABLE]: undefined;
  [CustomerAuthStackRoutes.EMAIL_VERIFICATION]: {
    email: string;
  };
};

type OwnerAuthStackParamList = {
  [OwnerAuthStackRoutes.SIGNIN]: undefined;
  [OwnerAuthStackRoutes.SIGNUP]: undefined;
  [OwnerAuthStackRoutes.LOCATION_ENABLE]: undefined;
  [OwnerAuthStackRoutes.EMAIL_VERIFICATION]: {
    email: string;
  };
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
  [CustomerProfileStackRoutes.ACCOUNT]: undefined;
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

export type TableListScreenTypeByLocation = ClubListScreenCommon & {
  locationId: number;
  listType: typeof AppTableListTypes.BY_LOCATION;
};

export type TableListScreenTypeByClubId = ClubListScreenCommon & {
  clubId: number;
  listType: typeof AppTableListTypes.BY_CLUB_ID;
};

export type TableListScreenTypeSearchResult = ClubListScreenCommon & {
  listType: typeof AppTableListTypes.SEARCH_RESULT;
  searchTerm: TableCommonSearchParams;
};

export type TableListScreenTypeRest = ClubListScreenCommon & {
  listType:
    | typeof AppTableListTypes.ALL
    | typeof AppTableListTypes.SPLIT
    | typeof AppTableListTypes.JOIN
    | typeof AppTableListTypes.BOOKED
    | typeof AppTableListTypes.RECENT_VISIT;
};

type CustomerStackParamList = {
  [CustomerStackRoutes.PAYMENT_METHOD]: {
    amount: string;
  };
  [CustomerStackRoutes.PAYMENT]: {
    totalAmount: string;
    partialAmount: string;
  };
  [CustomerStackRoutes.TABLE_LIST]:
    | TableListScreenTypeByLocation
    | TableListScreenTypeByClubId
    | TableListScreenTypeSearchResult
    | TableListScreenTypeRest;
  [CustomerStackRoutes.ONBOARDING]: undefined;
  [CustomerStackRoutes.LOCATION_ENABLE]: undefined;
  [CustomerStackRoutes.CLUB_DETAILS]: {
    clubId: number;
  };
  [CustomerStackRoutes.TABLE_DETAILS]: {
    tableId: number;
  };
  [CustomerStackRoutes.BOOKING]: NavigatorScreenParams<CustomerBookingStackParamList>;
  [CustomerStackRoutes.CUSTOMER_AUTH]: NavigatorScreenParams<CustomerAuthStackParamList>;
  [CustomerStackRoutes.CUSTOMER_MAIN_TAB]: NavigatorScreenParams<CustomerBottomTabParamList>;
  [CustomerStackRoutes.TABLE_SEARCH]: undefined;

  [CustomerStackRoutes.FAQ]: undefined;
  [CustomerStackRoutes.LEGAL]: undefined;
  [CustomerStackRoutes.PROFILE]: undefined;
  [CustomerStackRoutes.FAVORITE]: undefined;
  [CustomerStackRoutes.TRANSACTION]: undefined;
  [CustomerStackRoutes.ACCOUNT_SETTING]: undefined;

  [CustomerStackRoutes.GUEST_N_MENU]: {
    tableDetails: SplitTableDetails | BookingTableDetails;
  };
  [CustomerStackRoutes.ADD_MENU_ITEM]: {
    tableDetails: SplitTableDetails | BookingTableDetails;
    menGuestCount: number;
    womenGuestCount: number;
  };
  [CustomerStackRoutes.BOOKING_DETAILS]: {
    tableDetails: SplitTableDetails | BookingTableDetails;
    menuListToAdd: Array<ClubMenuItem & {purchaseQty: number}>;
    menGuestCount: number;
    womenGuestCount: number;
  };
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
  [OwnerStackRoutes.TABLE_DETAILS]: {
    tableId: number;
  };
  [OwnerStackRoutes.MY_TABLES]: undefined;
  [OwnerStackRoutes.ADD_MENU_ITEM]: undefined;
  [OwnerStackRoutes.LOCATION_ENABLE]: undefined;
  [OwnerStackRoutes.OWNER_AUTH]: NavigatorScreenParams<OwnerAuthStackParamList>;
  [OwnerStackRoutes.OWNER_MAIN_TABS]: NavigatorScreenParams<OwnerBottomTabParamList>;
  [OwnerStackRoutes.UPSERT_TABLE]:
    | {actionMode: "update"; tableId: number}
    | {actionMode: "create"};

  [OwnerStackRoutes.FAQ]: undefined;
  [OwnerStackRoutes.LEGAL]: undefined;
  [OwnerStackRoutes.ACCOUNT]: undefined;
  [OwnerStackRoutes.PROFILE]: undefined;
  [OwnerStackRoutes.REVIEWS]: undefined;
  [OwnerStackRoutes.TRANSACTION]: undefined;
  [OwnerStackRoutes.ACCOUNT_SETTING]: undefined;
};

type RootStackParamList = {
  [RootStackRoutes.INITIAL]: undefined;
  [RootStackRoutes.NOTIFICATIONS]: undefined;
  [RootStackRoutes.OWNER]: NavigatorScreenParams<OwnerStackParamList>;
  [RootStackRoutes.CUSTOMER]: NavigatorScreenParams<CustomerStackParamList>;
};
