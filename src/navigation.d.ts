import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from "@react-navigation/native";
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
  CustomerChatStackRoutes,
} from "@constants/routes";
import {AppTableListTypes} from "@constants/table";
import {
  BookedTable,
  BookedTableDetails as BookingTableDetails,
  ClubMenuItem,
  ClubMenuItemOwnerSide,
  SplitTableDetails,
  SupportedPaymentMethods,
  TableCommonSearchParams,
} from "./models";
import {StackNavigationProp} from "@react-navigation/stack";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";

type CustomerAuthStackParamList = {
  [CustomerAuthStackRoutes.LOCATION_ENABLE]: undefined;
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
  [CustomerMainBottomTabRoutes.BOOKING]: undefined;
  [CustomerMainBottomTabRoutes.CHAT_MESSAGES]: {
    partnerName: string;
    partnerImage: string;
  };
  [CustomerMainBottomTabRoutes.TABLE_SCREEN]: undefined;
  [CustomerMainBottomTabRoutes.CHAT_LIST]: undefined;
  [CustomerMainBottomTabRoutes.PROFILE_STACK]: NavigatorScreenParams<CustomerProfileStackParamList>;
};

type ClubListScreenCommon = {
  headerTitle: string;
};

export type TableListScreenTypeByLocation = ClubListScreenCommon & {
  // locationId: number;
  listType: typeof AppTableListTypes.BY_LOCATION;
  searchTerm: Omit<TableCommonSearchParams, "locationId"> & {
    locationId: number;
  };
};

export type TableListScreenTypeByClubId = ClubListScreenCommon & {
  // clubId: number;
  listType: typeof AppTableListTypes.BY_CLUB_ID;
  searchTerm: Omit<TableCommonSearchParams, "clubId"> & {
    clubId: number;
  };
};

export type TableListScreenTypeSearchResult = ClubListScreenCommon & {
  listType: typeof AppTableListTypes.SEARCH_RESULT;
  searchTerm: TableCommonSearchParams;
};

export type TableListScreenTypeRest = ClubListScreenCommon & {
  // listType: Omit<
  //   typeof AppTableListTypes[keyof typeof AppTableListTypes],
  //   | typeof AppTableListTypes.BY_CLUB_ID
  //   | typeof AppTableListTypes.BY_LOCATION
  //   | typeof AppTableListTypes.SEARCH_RESULT
  // >;

  listType:
    | typeof AppTableListTypes.ALL
    | typeof AppTableListTypes.SPLIT
    | typeof AppTableListTypes.JOIN
    | typeof AppTableListTypes.BOOKED
    | typeof AppTableListTypes.RECENT_VISIT;
  searchTerm?: TableCommonSearchParams;
};

type CustomerStackParamList = {
  [CustomerStackRoutes.CHAT_MESSAGES]: {
    chatId: number;
    partnerName: string;
    partnerImage: string;
  };

  [CustomerStackRoutes.PAYMENT_METHOD]: {
    amount: string;
    bookingId: number;
  };
  [CustomerStackRoutes.PAYMENT_AMOUNT]: {
    bookingId: number;
    totalAmount: string;
    partialAmount: string;
  };
  [CustomerStackRoutes.PAYMENT_GATEWAY]: {
    amount: string;
    bookingId: number;
    paymentMethod: SupportedPaymentMethods;
  };
  [CustomerStackRoutes.TABLE_LIST]:
    | TableListScreenTypeSearchResult
    | TableListScreenTypeByLocation
    | TableListScreenTypeByClubId
    | TableListScreenTypeRest;
  [CustomerStackRoutes.ONBOARDING]: undefined;
  [CustomerStackRoutes.INITIAL_SELECT_LOCATION]: undefined;
  [CustomerStackRoutes.CLUB_DETAILS]: {
    clubId: number;
  };
  [CustomerStackRoutes.TABLE_DETAILS]: {
    tableId: number;
  };
  [CustomerStackRoutes.JOIN_TABLE_DETAILS]: {
    tableId: number;
  };
  [CustomerStackRoutes.TABLE_SEARCH]:
    | {
        listScreenHeaderTitle: string;
        initialSearchTerms: Omit<TableCommonSearchParams, "locationId"> & {
          locationId: number;
        };
        listType: typeof AppTableListTypes.BY_LOCATION;
      }
    | {
        listScreenHeaderTitle: string;
        initialSearchTerms: Omit<TableCommonSearchParams, "clubId"> & {
          clubId: number;
        };
        listType: typeof AppTableListTypes.BY_CLUB_ID;
      }
    | {
        listScreenHeaderTitle: string;
        initialSearchTerms: TableCommonSearchParams;
        listType: typeof AppTableListTypes.SEARCH_RESULT;
      }
    | {
        listScreenHeaderTitle: string;
        initialSearchTerms?: TableCommonSearchParams;
        listType:
          | typeof AppTableListTypes.ALL
          | typeof AppTableListTypes.SPLIT
          | typeof AppTableListTypes.JOIN
          | typeof AppTableListTypes.BOOKED
          | typeof AppTableListTypes.RECENT_VISIT;
      }
    | undefined;
  [CustomerStackRoutes.BOOKING_SELECT_LOCATION]: {
    bookingId: number;
    totalAmount: string;
    partialAmount: string;
  };
  [CustomerStackRoutes.CUSTOMER_MAIN_TAB]: NavigatorScreenParams<CustomerBottomTabParamList>;

  [CustomerStackRoutes.FAQ]: undefined;
  [CustomerStackRoutes.LEGAL]: undefined;
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
  [CustomerStackRoutes.BOOKING_TABLE]: {
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
  [OwnerStackRoutes.MY_TABLES]:
    | {
        old: boolean;
      }
    | undefined;
  [OwnerStackRoutes.HOLIDAYS]: undefined;
  [OwnerStackRoutes.ADD_HOLIDAY]: undefined;
  [OwnerStackRoutes.SLIDER_IMAGES]: undefined;
  [OwnerStackRoutes.UPSERT_MENU]:
    | {actionMode: "update"; menu: ClubMenuItemOwnerSide}
    | {actionMode: "create"};
  [OwnerStackRoutes.LOCATION_ENABLE]: undefined;
  [OwnerStackRoutes.OWNER_AUTH]: NavigatorScreenParams<OwnerAuthStackParamList>;
  [OwnerStackRoutes.OWNER_MAIN_TABS]: NavigatorScreenParams<OwnerBottomTabParamList>;
  [OwnerStackRoutes.UPSERT_TABLE]:
    | {actionMode: "update"; tableId: number}
    | {actionMode: "create"};

  [OwnerStackRoutes.FAQ]: undefined;
  [OwnerStackRoutes.LEGAL]: undefined;
  [OwnerStackRoutes.ACCOUNT]: undefined;
  [OwnerStackRoutes.INFORMATION]: undefined;
  [OwnerStackRoutes.REVIEWS]: undefined;
  [OwnerStackRoutes.TRANSACTION]: undefined;
  [OwnerStackRoutes.ACCOUNT_SETTING]: undefined;
};

type RootStackParamList = {
  [RootStackRoutes.BOOKING_DETAILS]: {
    bookingId: number;
    bookingType: "upcoming" | "history";
  };
  [RootStackRoutes.CUSTOMER_LOGIN_PROMPT]: undefined;
  [RootStackRoutes.CUSTOMER_ONBOARDING]: undefined;
  [RootStackRoutes.SIGNUP]: undefined;
  [RootStackRoutes.SIGNIN]: undefined;
  [RootStackRoutes.INITIAL]: undefined;
  [RootStackRoutes.PROFILE]: {
    userId?: number;
  };
  [RootStackRoutes.NOTIFICATIONS]: undefined;
  [RootStackRoutes.OWNER]: NavigatorScreenParams<OwnerStackParamList>;
  [RootStackRoutes.CUSTOMER]: NavigatorScreenParams<CustomerStackParamList>;

  [RootStackRoutes.EMAIL_VERIFICATION]: {
    email: string;
  };
  [RootStackRoutes.RESET_PASSWORD]: {
    email: string;
  };
  [RootStackRoutes.FORGOT_PASSWORD]: undefined;
};

type ChatMessagesNavigationType = CompositeNavigationProp<
  CompositeNavigationProp<
    CompositeNavigationProp<
      StackNavigationProp<
        CustomerChatStackParamList,
        typeof CustomerChatStackRoutes.CHAT_MESSAGES
      >,
      BottomTabNavigationProp<CustomerBottomTabParamList>
    >,
    StackNavigationProp<CustomerStackParamList>
  >,
  StackNavigationProp<RootStackParamList>
>;
