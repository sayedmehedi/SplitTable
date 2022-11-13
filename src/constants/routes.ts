export const RootStackRoutes = {
  OWNER: "Owner",
  INITIAL: "Initial",
  CUSTOMER: "Customer",
} as const;

export const CustomerStackRoutes = {
  BOOKING: "Booking",
  TABLE_LIST: "TableList",
  TABLE_SEARCH: "TableSearch",
  ONBOARDING: "OnBoarding",
  CLUB_DETAILS: "ClubDetails",
  TABLE_DETAILS: "TableDetails",
  CUSTOMER_AUTH: "CustomerAuth",
  NOTIFICATIONS: "Notifications",
  LOCATION_ENABLE: "LocationEnable",
  CUSTOMER_MAIN_TAB: "CustomerMainTab",

  FAQ: "Faq",
  LEGAL: "Legal",
  PROFILE: "Profile",
  FAVORITE: "Favorite",
  TRANSACTION: "Transaction",
  ACCOUNT_SETTING: "AccountSetting",
} as const;

export const CustomerAuthStackRoutes = {
  SIGNIN: "Signin",
  SIGNUP: "Signup",
  LOGIN_PROMPT: "LoginPrompt",
  LOCATION_ENABLE: "LocationEnable",
  EMAIL_VERIFICATION: "EmailVerification",
} as const;

export const OwnerAuthStackRoutes = {
  SIGNIN: "Signin",
  SIGNUP: "Signup",
  EMAIL_VERIFICATION: "EmailVerification",
} as const;

export const OwnerMainBottomTabRoutes = {
  MENU: "Menu",
  TABLE_ADD: "TableAdd",
  OWNER_TABLE: "OwnerTable",
  OWNER_BOOKING: "OwnerBooking",
  OWNER_ACCOUNT: "OwnerAccount",
} as const;

export const CustomerMainBottomTabRoutes = {
  HOME: "Home",
  CHAT: "Chat",
  BOOKING: "Booking",
  TABLE_SCREEN: "TableScreen",
  PROFILE_STACK: "ProfileStack",
} as const;

export const OwnerStackRoutes = {
  OWNER_AUTH: "OwnerAuth",
  ADD_MENU_ITEM: "AddMenuItem",
  OWNER_MAIN_TABS: "OwnerMainTabs",
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
