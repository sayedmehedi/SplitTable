import {AuthTypes} from "@constants/auth";
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

export type PaginationQueryParams =
  | {
      page?: number;
      paginate?: number;
    }
  | {
      page?: number;
      limit?: number;
    };

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

export type SearchHistoryItem = {
  id: string;
  data: string;
  lastUsedTime: string;
};
export interface ClubItemBySearchTerm {
  id: number;
  name: string;
  image: string;
  distance: string;
  location: string;
  avg_rating: number;
  opening_time: s;
  closing_time: string;
  total_reviews: number;
  is_favourite: boolean;
}

export type GetClubsBySearchTermResponse = {
  clubs: SimplePaginatedResponse<ClubItemBySearchTerm>;
};

export type GetClubsBySearchTermQueryParams = PaginationQueryParams & {
  search?: string;
};

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

  club: string;
  job_role: string;
}
export interface CustomerProfileData {
  id: number;
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
export interface GetUserImageQueryParams extends PaginationQueryParams {
  userId?: number;
}

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
