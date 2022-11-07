import {AxiosResponse} from "axios";
import CancelablePromise from "cancelable-promise";
import {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  GetProfileDataResponse,
  GlobalAxiosRequestConfig,
} from "@src/models";

export interface IAuthService {
  login(
    data: LoginRequest,
  ): Promise<AxiosResponse<LoginResponse, GlobalAxiosRequestConfig>>;

  logout(): Promise<AxiosResponse<LogoutResponse, GlobalAxiosRequestConfig>>;

  getProfile(): CancelablePromise<
    AxiosResponse<GetProfileDataResponse, GlobalAxiosRequestConfig>
  >;
}
