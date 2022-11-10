import {AxiosResponse} from "axios";
import CancelablePromise from "cancelable-promise";
import {
  AddUserImageRequest,
  GetUserImagesResponse,
  GetUserImageQueryParams,
  GlobalAxiosRequestConfig,
  AddUserImageResponse,
  DeleteUserImageResponse,
  DeleteUserImageRequest,
  ToggleUserImageLikeResponse,
  ToggleUserImageLikeRequest,
} from "@src/models";

export interface IUserService {
  getImages(
    params?: GetUserImageQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetUserImagesResponse, GlobalAxiosRequestConfig>
  >;

  addImage(data: AddUserImageRequest): CancelablePromise<AddUserImageResponse>;

  deleteImage(
    data: DeleteUserImageRequest,
  ): Promise<AxiosResponse<DeleteUserImageResponse, GlobalAxiosRequestConfig>>;

  toggleImageLike(
    data: ToggleUserImageLikeRequest,
  ): Promise<
    AxiosResponse<ToggleUserImageLikeResponse, GlobalAxiosRequestConfig>
  >;
}
