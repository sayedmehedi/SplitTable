import {AxiosResponse} from "axios";
import {AuthData, GlobalAxiosRequestConfig, LoginRequest} from "@src/models";

export interface IAuthService {
  login(
    data: LoginRequest,
  ): Promise<AxiosResponse<AuthData, GlobalAxiosRequestConfig>>;
}
