import {AxiosRequestConfig} from "axios";
import {AppTableTypes} from "@constants/table";
import {AuthTypeNum, AuthTypes} from "@constants/auth";
import {NotificationStyles, NotificationTypes} from "@constants/notification";
import {AppSupportedPaymentMethods} from "@constants/payment";

export type ResponseResult<T extends {} = {}> =
  | {error: string}
  | (T & {success: string});

export type AuthData = {
  id: number;
  name: string;
  phone: string;
  email: string;
  token: string;
  status: number;
  user_type: 2 | 3;
  location: string;
  latitude: string;
  longitude: string;
  profile_image: string;
};

export interface SplitAppImagePayload {
  name: string;
  type: string;
  uri: string;
}

export type LoginResponse = ResponseResult<{
  success: string;
  user: AuthData;
}>;

export type ServerNonFieldError = {
  status: "failed";
  error: string;
  message?: string;
};

export type ServerValidationError = {
  message: string;
  error?: Record<string, string[]>;
  errors?: Record<string, string[]>;
};

export type ServerErrorType = ServerValidationError | ServerNonFieldError;

export type LoginRequest = {
  email: string;
  password: string;
};

export type GlobalAxiosRequestConfig = {};

export type AuthType = typeof AuthTypes[keyof typeof AuthTypes];

export type LogoutResponse = {
  status: string;
  success: boolean;
  message: string;
};

export type SimplePaginatedResponse<T> = {
  data: T[];
  total_rows: number;
  count: number;
  page_size: number;
  current_page: number;
  total_pages: number;
  last_page: number;
  next_page_url?: string;
  has_more_data: boolean;
};

export type PaginatedResponse<T> = {
  data: T[];
  from: number;
  last_page: number;
  current_page: number;
  last_page_url: string;
  first_page_url: string;
  links: Array<{
    label: string;
    active: boolean;
    url: null | string;
  }>;
  to: number;
  path: string;
  total: number;
  per_page: number;
  next_page_url: null | string;
  prev_page_url: null | string;
};

export type LocationItem = {
  id: number;
  location: string;
  image: string;
};

export type GetLocationsReposne = {
  success: string;
  items: Array<LocationItem>;
};

export type ClubListItemMenu = {
  id: number;
  name: string;
  image: string;
  price: string;
};

export type BookedTable = {
  id: number;
  name: string;
  date: string;
  location: string;
  distance: string;
  image: string;
};

export type GetBookedTablesReponse = {
  tables: SimplePaginatedResponse<BookedTable>;
};

export type GetRecentViewsReponse = {
  tables: SimplePaginatedResponse<BookedTable | SplitTable>;
};

export type SplitTable = {
  id: number;
  name: string;
  date: string;
  location: string;
  distance: string;
  image: string;
  total_joined: number;
};

export type GetSplitTablesReponse = {
  tables: SimplePaginatedResponse<SplitTable>;
};

export type PaginationQueryParams = {
  page?: number;
  paginate?: number;
};

export interface TableByLocationItem {
  id: number;
  name: string;
  date: string;
  image: string;
  location: string;
  distance: string;
  total_joined: number;
}

export type TableCommonSearchParams = {
  tableType?: TableType;
  date?: string;
  locationId?: number;
  distance?: [number, number];
  clubId?: number;
};

export type GetTablesByLocationResponse = {
  tables: SimplePaginatedResponse<TableByLocationItem>;
};

export type GetTablesByLocationQueryParams = PaginationQueryParams & {
  locationId: number;
  tableType: TableType;
};

export type GetBookedTablesQueryParams = PaginationQueryParams &
  TableCommonSearchParams;

export type GetSplitTablesQueryParams = PaginationQueryParams &
  TableCommonSearchParams;

export type GetRecentViewsQueryParams = PaginationQueryParams &
  TableCommonSearchParams;

export type ToggleFavoriteClubResponse = ResponseResult<{message: string}>;

export type ToggleFavoriteClubRequest = {
  clubId: number;
};

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  style: typeof NotificationStyles[keyof typeof NotificationStyles];
  type: typeof NotificationTypes[keyof typeof NotificationTypes];
}

export type GetNotificationsQueryParams = PaginationQueryParams;

export type GetNotificationsResponse = {
  notifications: SimplePaginatedResponse<NotificationItem>;
};

export type SearchHistoryItem = {
  id: string;
  data: string;
  lastUsedTime: string;
};
export interface TableBySearchTerm {
  id: number;
  name: string;
  date: string;
  location: string;
  distance: string;
  image: string;
  total_joined: number;
}

export type GetTablesBySearchTermResponse = {
  tables: SimplePaginatedResponse<TableBySearchTerm>;
};

export type GetTablesBySearchTermQueryParams = PaginationQueryParams &
  TableCommonSearchParams;

export interface ClubDetails {
  id: number;
  name: string;
  owner_id: number;
  location: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  opening_time: string;
  closing_time: string;
  total_reviews: number;
  avg_rating: number;
  is_favourite: boolean;
  images: string[];
  job_role: string;
  cuisine: string;
  min_avg_cost: string;
  max_avg_cost: string;
  about: string;
  floor_plan: string;
}

export interface GetClubDetailsResponse {
  club: ClubDetails;
}

export interface GetClubDetailsRquest {
  clubId: number;
}

export interface ClubMenuItem {
  id: number;
  name: string;
  price: string;
  qty: number;
  image: string;
  details: string;
  status: number;
}

export interface GetClubMenusResponse {
  menus: SimplePaginatedResponse<ClubMenuItem>;
}

export type GetClubMenusQueryParams = PaginationQueryParams & {
  clubId: number;
};

export type ClubMenuItemOwnerSide = ClubMenuItem & {
  qty: number;
};

export interface GetOwnerClubMenusResponse {
  menus: SimplePaginatedResponse<ClubMenuItem>;
}

export type GetOwnerClubMenusQueryParams = PaginationQueryParams;

export type ReviewItem = {
  id: number;
  user_image: string;
  user_name: string;
  rating: number;
  date: string;
  review: string;
};

export interface GetClubReviewsResponse {
  avg_rating?: number;
  total_reviews: number;
  review_numbers: Record<number, number>;
  review_percentages: Record<number, number>;
  reviews: SimplePaginatedResponse<ReviewItem>;
}

export type GetClubReviewsQueryParams = PaginationQueryParams & {
  ownerId?: number;
};
export interface OwnerProfileData {
  id: number;
  name: string;
  phone: string;
  email: string;
  location: string;
  latitude: string;
  longitude: string;
  image: string;

  club: string;
  job_role: string;
}
export interface CustomerProfileData {
  id: number;
  image: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  latitude: string;
  longitude: string;

  bookings: number;
  reviews: number;
  photos: number;
}

export type GetProfileDataResponse = OwnerProfileData | CustomerProfileData;

export interface CustomerImageItem {
  id: number;
  image: string;
  total_likes: number;
  total_dislikes: number;
}

export type GetCustomerImagesResponse = {
  images: SimplePaginatedResponse<CustomerImageItem>;
};

export interface UserImage {
  id: number;
  image: string;
  total_likes: number;
  total_dislikes: number;
}
export interface GetUserImagesResponse {
  images: SimplePaginatedResponse<UserImage>;
}
export type GetUserImageQueryParams = PaginationQueryParams & {
  userId?: number;
};

export type AddUserImageResponse = ResponseResult;
export type DeleteUserImageResponse = ResponseResult;

export type OnUploadProgress = (written: number, total: number) => void;

export interface AddUserImageRequest {
  image: SplitAppImagePayload;
  onUploadProgress?: OnUploadProgress;
}

export interface DeleteUserImageRequest {
  imageId: number;
}

export interface ToggleUserImageLikeRequest {
  like: boolean;
  imageId: number;
}

export type ToggleUserImageLikeResponse = ResponseResult;

export interface UpdateProfilePayload {
  first_name: string;
  last_name: string;
  club: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
  location: string;
  latitude: string;
  longitude: string;
  job_role: string;
  phone: string;
  onUploadProgress?: OnUploadProgress;
  image: SplitAppImagePayload;
}

export type UpdateProfileRequest = Partial<UpdateProfilePayload>;

export type UpdateProfileResponse = ResponseResult;

export interface Transaction {
  id: number;
  date: string;
  created_date: string;
  created_day: string;
  created_month: string;
  created_time: string;
  club: string;
  tables: "" | string[];
  no_of_guest: number;
  status: "Pending" | "Success" | "Cancelled";
  amount: string;
  payment_method: string;
  user: string;
}

export type GetTransactionsResponse = {
  transactions: SimplePaginatedResponse<Transaction>;
};

export type GetTransactionsQueryParams = PaginationQueryParams & {
  clubId?: number;
};

export type SignupRequest = {
  image: SplitAppImagePayload;
  first_name: string;
  last_name: string;
  club?: string;
  location_id?: string;
  job_role?: string;
  phone: string;
  email: string;
  dob?: string;
  password: string;
  password_confirmation: string;

  onUploadProgress?: OnUploadProgress;
};

export type SignupResponse = ResponseResult;

export type VerifyEmailRequest = {
  email: string;
  otp: string;
};

export type VerifyEmailResponse = ResponseResult;

export type ResendEmailVerificationCodeRequest = {
  email: string;
};

export type ResendEmailVerificationCodeResponse = ResponseResult;

export type GeolocationPosition = {
  coords: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
};

export type GeolocationError = {
  code: number;
  message: string;
  PERMISSION_DENIED: number;
  POSITION_UNAVAILABLE: number;
  TIMEOUT: number;
};

export type TableType = typeof AppTableTypes[keyof typeof AppTableTypes];

export interface JoinedUser {
  id: number;
  name: string;
  image: string;
}
export interface SplitTableDetails {
  id: number;
  name: string;
  date: string;
  location: string;
  distance: string;
  image: string;
  club_id: number;
  club_name: string;
  rating: number;
  description: string;
  performer: string;
  cuisines: string;
  min_age: number;
  club_location: string;
  joined_users: JoinedUser[];
  men_seat: number;
  men_seat_price: string;
  men_booked_seat: number;
  women_booked_seat: number;
  women_seat: number;
  women_seat_price: string;
}

export interface BookedTableDetails {
  id: number;
  name: string;
  date: string;
  location: string;
  distance: string;
  image: string;
  club_id: number;
  club_name: string;
  rating: number;
  description: string;
  performer: string;
  cuisines: string;
  min_age: number;
  club_location: string;
  total_seat: number;
  price: string;
}

export type GetTableDetailsResponse = SplitTableDetails | BookedTableDetails;

export type BookTableRequest = {
  clubId: number;
  tableId: number[];
  menSeat: Record<number, number>;
  womenSeat: Record<number, number>;
  menuId: number[];
  qty: number[];
  discount: number;
  tax: number;
  tip: number;
};

export type SupportedPaymentMethods =
  typeof AppSupportedPaymentMethods[keyof typeof AppSupportedPaymentMethods];

export type ConfirmBookingRequest = {
  bookingId: number;
  amount: number;
  paymentMethod: SupportedPaymentMethods;
};

export type ConfirmBookingResponse = ResponseResult;

export type BookTableResponse = ResponseResult<{
  booking_details: {
    id: number;
    total_amount: string;
    partial_amount: string;
  };
}>;

export type FavoriteClub = {
  id: number;
  name: string;
  distance: string;
  image: string;
  location: string;
  date?: string;
  opening_time: string;
  closing_time: string;
  total_reviews: number;
  avg_rating: number;
  is_favourite: boolean;
};

export type GetFavoriteClubsResponse = {
  clubs: SimplePaginatedResponse<FavoriteClub>;
};

export type GetFavoriteClubsQueryParams = PaginationQueryParams;

export interface Faq {
  id: number;
  question: string;
  answer: string;
  status: number;
}

export type GetFaqsResponse = {
  items: SimplePaginatedResponse<Faq>;
  success: string;
};

export type GetFaqsQueryParams = PaginationQueryParams & {
  userType: typeof AuthTypeNum[keyof typeof AuthTypeNum];
};

export type GetSplitTablesByClubIdQueryParams = PaginationQueryParams & {
  clubId: number;
  tableType: typeof AppTableTypes.SPLIT;
};

export type GetBookedTablesByClubIdQueryParams = PaginationQueryParams & {
  clubId: number;
  tableType: typeof AppTableTypes.BOOKED;
};

export type GetSplitTablesByClubIdResponse = {
  tables: SimplePaginatedResponse<SplitTable>;
};

export type GetBookedTablesByClubIdResponse = {
  tables: SimplePaginatedResponse<BookedTable>;
};

export type AddClubReviewRequest = {
  reviewerId: number;
  rating: number;
  review: string;
};

export type AddClubReviewResponse = ResponseResult;

export interface ClubBooking {
  id: number;
  date: string;
  amount: string;
  no_of_guest: number;
  owner_id: number;
  user_id: number;
  club: string;
  club_id: number;
  user: string;
  user_image: string;
  club_image: string;
  tables: string[];
  is_reviewed: boolean;
  status: string;
}

export type GetBookingHistoryResponse = {
  bookings: SimplePaginatedResponse<ClubBooking>;
};

export type GetBookingHistoryQueryParams = PaginationQueryParams & {
  ownerId?: number;
  clubId?: number;
};

export type GetUpcomingBookingResponse = {
  bookings: SimplePaginatedResponse<ClubBooking>;
};

export type GetUpcomingBookingQueryParams = PaginationQueryParams & {
  ownerId?: number;
  clubId?: number;
};

export type BookedTableOwnerView = {
  id: number;
  name: string;
  type: typeof AppTableTypes.BOOKED;
  date: string;
  performer: string;
  cuisines: string;
  age_limit: number;
  image: string;
  description: string;
  price: string;
  total_seat: number;
};

export type SplitTableOwnerView = {
  id: number;
  name: string;
  type: typeof AppTableTypes.SPLIT;
  date: string;
  performer: string;
  cuisines: string;
  age_limit: number;
  image: string;
  description: string;
  men_seat: number;
  men_seat_price: string;
  women_seat: number;
  women_seat_price: string;
};

export type GetOwnerTablesResponse = {
  tables: SimplePaginatedResponse<BookedTableOwnerView | SplitTableOwnerView>;
};

export type GetOwnerTablesQueryParams = PaginationQueryParams & {
  tableType: TableType;
};

export type CreateOwnerSplitTableRequest = {
  name: string;
  type: typeof AppTableTypes.SPLIT;
  date_time: string;
  men_seat: number;
  men_seat_price: number;
  women_seat: number;
  women_seat_price: number;
  performer?: string;
  cuisines?: string;
  age_limit?: number;
  description?: string;
  image?: SplitAppImagePayload;
};

export type CreateOwnerBookTableRequest = {
  name: string;
  type: typeof AppTableTypes.BOOKED;
  date_time: string;
  price: number;
  total_seat: number;
  performer?: string;
  cuisines?: string;
  age_limit?: number;
  description?: string;
  image?: SplitAppImagePayload;
};

export type CreateOwnerTableRequest = (
  | CreateOwnerSplitTableRequest
  | CreateOwnerBookTableRequest
) & {
  onUploadProgress?: OnUploadProgress;
};

export type CreateOwnerTableResponse = ResponseResult;

export type UpdateOwnerSplitTableRequest =
  Partial<CreateOwnerSplitTableRequest>;

export type UpdateOwnerBookTableRequest = Partial<CreateOwnerBookTableRequest>;

export type UpdateOwnerTableRequest = (
  | UpdateOwnerSplitTableRequest
  | UpdateOwnerBookTableRequest
) & {
  tableId: number;
  onUploadProgress?: OnUploadProgress;
};

export type UpdateOwnerTableResponse = ResponseResult;

export type DeleteOwnerTableRequest = {
  tableId: number;
};
export type DeleteOwnerTableResponse = ResponseResult;

export type CreateOwnerClubMenuRequest = {
  name: string;
  price: number;
  qty: number;
  details: string;
  status: number;
  club_id: number;
  status: 0 | 1;
  image?: SplitAppImagePayload;
  onUploadProgress?: OnUploadProgress;
};

export type CreateOwnerClubMenuResponse = ResponseResult;

export type UpdateOwnerClubMenuRequest = Partial<CreateOwnerClubMenuRequest> & {
  menuId: number;
};

export type UpdateOwnerClubMenuResponse = ResponseResult;

export type DeleteOwnerClubMenuRequest = {
  menuId: number;
};

export type DeleteOwnerClubMenuResponse = ResponseResult;

export interface ClubInfo {
  id: number;
  name: string;
  job_role: string;
  location: string;
  opening_time: string;
  closing_time: string;
  cuisine: string;
  min_avg_cost: string;
  max_avg_cost: string;
  about: string;
  slider_images: string[];
}

export type UpdateOwnerClubInfoRequest = Partial<{
  name: string;
  job_role: string;
  location_id: string;
  opening_time: string;
  closing_time: string;
  cuisine: string;
  avg_cost_min: string;
  avg_cost_max: string;
  about: string;
  slider_images: Array<SplitAppImagePayload>;
  onUploadProgress?: OnUploadProgress;
}>;

export type UpdateOwnerClubInfoResponse = ResponseResult;

export interface Holiday {
  id: number;
  name: string;
  date: string;
}

export type GetOwnerClubHolidaysResponse = {
  holidays: SimplePaginatedResponse<Holiday>;
};

export type GetOwnerClubHolidaysQueryParams = PaginationQueryParams;

export type CreateOwnerClubHolidayRequest = {
  name: string;
  date: string;
  clubId: number;
};

export type CreateOwnerClubHolidayResponse = ResponseResult;

export type DeleteOwnerClubHolidayRequest = {
  holidayId: number;
};

export type DeleteOwnerClubHolidayResponse = ResponseResult;

export type ResetPasswordRequest = {
  otp: string;
  email: string;
  password: string;
  password_confirmation: string;
};
export type ResetPasswordResponse = ResponseResult;

export interface ConversationItem {
  id: number;
  user_name: string;
  user_image: string;
  receiver_id: number;
  is_accepted: number;
  has_msg: boolean;
  message: {
    title: string;
    created_at: string;
  };
}

export interface ConversationMessage {
  id: number;
  sender_name: string;
  sender_image: string;
  receiver_name: string;
  receiver_id: number;
  receiver_image: string;
  title: string;
  created_at: string;
}

type GetConversationsQueryParams = PaginationQueryParams;
type GetConversationsResponse = {
  total_unseen_messages: number;
  messages: SimplePaginatedResponse<ConversationItem>;
};

type GetConversationMessagesQueryParams = PaginationQueryParams & {
  messageId: number;
};

type GetConversationMessagesResponse = {
  messages: SimplePaginatedResponse<ConversationMessage>;
  receiver: {
    id: number;
    name: string;
    image: string;
  };
};

export interface SeachUserSchema {
  id: number;
  name: string;
  email: string;
  image: string;
  location: string;
  latitude: number;
  longitude: number;
  phone: string;
}

type SearchUserQueryParams = PaginationQueryParams & {
  q: string;
};

type SearchUserResponse = {
  users: SimplePaginatedResponse<SeachUserSchema>;
};

type SendInvitationRequest = {
  receiverId: number;
};

type SendInvitationResponse = ResponseResult;

type AcceptInvitationRequest = {
  receiverId: number;
};

type AcceptInvitationResponse = ResponseResult;

type SendMessageRequest = {
  receiverId: number;
  message: string;
};
type SendMessageResponse = ResponseResult;

export type SocialLoginRequest = {
  firstName: string;
  lastName: string;
  email: string;
};

export type SocialLoginResponse = ResponseResult<{
  success: string;
  user: AuthData;
}>;
