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
  GlobalAxiosRequestConfig,
  ToggleUserImageLikeRequest,
  ToggleUserImageLikeResponse,
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
}
