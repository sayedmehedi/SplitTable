import {AxiosResponse} from "axios";
import {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  GlobalAxiosRequestConfig,
} from "@src/models";

export interface IAuthService {
  login(
    data: LoginRequest,
  ): Promise<AxiosResponse<LoginResponse, GlobalAxiosRequestConfig>>;

  logout(): Promise<AxiosResponse<LogoutResponse, GlobalAxiosRequestConfig>>;
}
