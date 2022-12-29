export const RootStackRoutes = {
  OWNER: "Owner",
  INITIAL: "Initial",
  PROFILE: "Profile",
  CUSTOMER: "Customer",
  NOTIFICATIONS: "Notifications",
  CUSTOMER_ONBOARDING: "CustomerOnBoarding",
  CUSTOMER_LOGIN_PROMPT: "CustomerLoginPrompt",

  SIGNUP: "Signup",
  SIGNIN: "Signin",
  RESET_PASSWORD: "ResetPassword",
  FORGOT_PASSWORD: "ForgotPassword",
  BOOKING_DETAILS: "BookingDetails",
  EMAIL_VERIFICATION: "EmailVerification",
} as const;

export const CustomerStackRoutes = {
  BOOKING: "Booking",
  TABLE_LIST: "TableList",
  TABLE_SEARCH: "TableSearch",
  CLUB_DETAILS: "ClubDetails",
  TABLE_DETAILS: "TableDetails",
  TABLE_AGREEMENT: "TableAgreement",
  CUSTOMER_MAIN_TAB: "CustomerMainTab",
  JOIN_TABLE_DETAILS: "JoinTableDetails",
  INITIAL_SELECT_LOCATION: "InitialSelectLocation",

  PAYMENT_AMOUNT: "PaymentAmount",
  PAYMENT_METHOD: "PaymentMethod",
  PAYMENT_GATEWAY: "PaymentGateway",
  BOOKING_SELECT_LOCATION: "BookingSelectLocation",

  GUEST_N_MENU: "GuestNMenu",
  ADD_MENU_ITEM: "AddMenuItem",
  BOOKING_TABLE: "BookingTable",

  CHAT_MESSAGES: "ChatMessages",

  FAQ: "Faq",
  LEGAL: "Legal",
  FRIENDS: "Friends",
  FAVORITE: "Favorite",
  ADD_FRIEND: "AddFriend",
  TRANSACTION: "Transaction",
  ACCOUNT_SETTING: "AccountSetting",
} as const;

export const CustomerAuthStackRoutes = {
  LOCATION_ENABLE: "LocationEnable",
} as const;

export const OwnerAuthStackRoutes = {} as const;

export const OwnerMainBottomTabRoutes = {
  MENU: "Menu",
  TABLE_ADD: "TableAdd",
  OWNER_TABLE: "OwnerTable",
  OWNER_BOOKING: "OwnerBooking",
  OWNER_ACCOUNT: "OwnerAccount",
} as const;

export const CustomerMainBottomTabRoutes = {
  HOME: "Home",
  CHAT_LIST: "ChatList",
  BOOKING: "Booking",
  TABLE_SCREEN: "TableScreen",
  PROFILE_STACK: "ProfileStack",
} as const;

export const OwnerStackRoutes = {
  MY_TABLES: "MyTables",
  OWNER_AUTH: "OwnerAuth",
  UPSERT_TABLE: "UpsertTable",
  UPSERT_MENU: "UpsertMenu",
  TABLE_DETAILS: "TableDetails",
  LOCATION_ENABLE: "LocationEnable",
  OWNER_MAIN_TABS: "OwnerMainTabs",

  FAQ: "Faq",
  LEGAL: "Legal",
  ACCOUNT: "Account",
  REVIEWS: "Reviews",
  TRANSACTION: "Transaction",
  INFORMATION: "Information",
  SLIDER_IMAGES: "SliderImages",
  ACCOUNT_SETTING: "AccountSetting",
  HOLIDAYS: "Holidays",
  ADD_HOLIDAY: "AddHoliday",
} as const;

export const OwnerProfileStackRoutes = {
  FAQ: "Faq",
  LEGAL: "Legal",
  ACCOUNT: "Account",
  PROFILE: "Profile",
  FAVORITE: "Favorite",
  TRANSACTION: "Transaction",
  ACCOUNT_SETTING: "AccountSetting",
} as const;

export const CustomerProfileStackRoutes = {
  ACCOUNT: "Account",
} as const;

export const CustomerBookingStackRoutes = {
  PAYMENT: "Payment",
  SELECT_TABLE: "SelectTable",
  ADD_MENU_ITEM: "AddMenuItem",
  DATE_AND_TIME: "DateAndTime",
  PAYMENT_METHOD: "PaymentMethod",
  GUEST_AND_OFFER: "GuestAndOffer",
  BOOKING_DETAILS: "BookingDetails",
} as const;
