import {AxiosResponse} from "axios";
import CancelablePromise from "cancelable-promise";
import {
  AddUserImageRequest,
  AddUserImageResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  GetUserImagesResponse,
  DeleteUserImageRequest,
  DeleteUserImageResponse,
  GetUserImageQueryParams,
  GetTransactionsResponse,
  GlobalAxiosRequestConfig,
  ToggleUserImageLikeRequest,
  ToggleUserImageLikeResponse,
  GetTransactionsQueryParams,
  GetFavoriteClubsQueryParams,
  GetFavoriteClubsResponse,
  GetFaqsQueryParams,
  GetFaqsResponse,
} from "@src/models";

export interface IUserService {
  getImages(
    params?: GetUserImageQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetUserImagesResponse, GlobalAxiosRequestConfig>
  >;

  addImage(data: AddUserImageRequest): Promise<AddUserImageResponse>;

  deleteImage(
    data: DeleteUserImageRequest,
  ): Promise<AxiosResponse<DeleteUserImageResponse, GlobalAxiosRequestConfig>>;

  toggleImageLike(
    data: ToggleUserImageLikeRequest,
  ): Promise<
    AxiosResponse<ToggleUserImageLikeResponse, GlobalAxiosRequestConfig>
  >;

  updateProfile(data: UpdateProfileRequest): Promise<UpdateProfileResponse>;

  getTransactions(
    params: GetTransactionsQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetTransactionsResponse, GlobalAxiosRequestConfig>
  >;

  getFavorites(
    params: GetFavoriteClubsQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetFavoriteClubsResponse, GlobalAxiosRequestConfig>
  >;

  getFaqs(
    params: GetFaqsQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetFaqsResponse, GlobalAxiosRequestConfig>
  >;
}
