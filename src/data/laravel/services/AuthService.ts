import {Axios, AxiosResponse} from "axios";
import {inject, injectable} from "inversify";
import {IAuthService} from "@core/services/AuthService";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {LoginRequest, AuthData, GlobalAxiosRequestConfig} from "@src/models";

@injectable()
export class AuthService implements IAuthService {
  @inject(ServiceProviderTypes.HttpClient)
  private readonly _httpService!: Axios;

  constructor() {}

  login(
    data: LoginRequest,
  ): Promise<AxiosResponse<AuthData, GlobalAxiosRequestConfig>> {
    return this._httpService.post("login", data);
  }
}
