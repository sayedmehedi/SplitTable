import {AxiosResponse} from "axios";
import CancelablePromise from "cancelable-promise";
import {
  AddUserImageRequest,
  GetUserImagesResponse,
  GetUserImageQueryParams,
  GlobalAxiosRequestConfig,
  AddUserImageResponse,
} from "@src/models";

export interface IUserService {
  getImages(
    params?: GetUserImageQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetUserImagesResponse, GlobalAxiosRequestConfig>
  >;

  addImage(data: AddUserImageRequest): CancelablePromise<AddUserImageResponse>;
}
