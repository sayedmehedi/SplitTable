import {AuthTypeNum, AuthTypes} from "@constants/auth";
import {NotificationStyles, NotificationTypes} from "@constants/notification";
import {AxiosRequestConfig} from "axios";

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
  latitude: number;
  longitude: number;
  profile_image: string;
};

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
  image: {
    name: string;
    type: string;
    uri: string;
  };
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
  image: {
    name: string;
    type: string;
    uri: string;
  };
}

export type UpdateProfileRequest = Partial<UpdateProfilePayload>;

export type UpdateProfileResponse = ResponseResult;

export interface Transaction {
  id: number;
  date: string;
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
  image: {
    name: string;
    type: string;
    uri: string;
  };
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

export type TableType = "booked" | "split";

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
