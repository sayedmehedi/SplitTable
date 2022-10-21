import {AuthTypes} from "@constants/auth";
import {NotificationStyles, NotificationTypes} from "@constants/notification";

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
  user_type: number;
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
  items: SimplePaginatedResponse<LocationItem>;
};

export type ClubListItemMenu = {
  id: number;
  name: string;
  image: string;
  price: string;
};

export type ClubListItem = {
  id: number;
  name: string;
  distance: string;
  image: string;
  location: string;
  opening_time: string;
  closing_time: string;
  total_reviews: number;
  avg_rating: number;
  is_favourite: boolean;
  menus: ClubListItemMenu[];
};

export type GetPopularClubsReposne = {
  clubs: SimplePaginatedResponse<ClubListItem>;
};

export type GetRecentViewedClubsReposne = {
  clubs: SimplePaginatedResponse<ClubListItem>;
};

export type NearbyClubListItem = {
  id: number;
  name: string;
  distance: string;
  image: string;
  location: string;
  opening_time: string;
  closing_time: string;
  total_reviews: number;
  avg_rating: number;
  is_favourite: boolean;
};

export type GetNearByClubsReposne = {
  clubs: SimplePaginatedResponse<NearbyClubListItem>;
};

export interface PaginationQueryParams {
  page?: number;
  limit?: number;
}

export interface ClubByLocationItem {
  id: number;
  name: string;
  image: string;
  distance: string;
  location: string;
  avg_rating: number;
  opening_time: string;
  closing_time: string;
  total_reviews: number;
  is_favourite: boolean;
}

export type GetClubsByLocationResponse = {
  clubs: SimplePaginatedResponse<ClubByLocationItem>;
};

export type GetClubsByLocationQueryParams = PaginationQueryParams & {
  locationId: number;
};

export type GetPopularClubsQueryParams = PaginationQueryParams & {
  search?: string;
};

export type GetNearByClubsQueryParams = PaginationQueryParams & {
  search?: string;
};

export type GetRecentViewedClubsQueryParams = PaginationQueryParams & {
  search?: string;
};

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
