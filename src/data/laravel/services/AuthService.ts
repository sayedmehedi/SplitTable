import {Axios, AxiosResponse} from "axios";
import {inject, injectable} from "inversify";
import {IAuthService} from "@core/services/IAuthService";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  GlobalAxiosRequestConfig,
} from "@src/models";

@injectable()
export class AuthService implements IAuthService {
  @inject(ServiceProviderTypes.HttpClient)
  private readonly _httpService!: Axios;

  constructor() {}

  logout(): Promise<AxiosResponse<LogoutResponse, GlobalAxiosRequestConfig>> {
    return this._httpService.get<LogoutResponse>("logout");
  }

  login(
    data: LoginRequest,
  ): Promise<AxiosResponse<LoginResponse, GlobalAxiosRequestConfig>> {
    return this._httpService.post<LoginResponse>("login", data);
  }
}
