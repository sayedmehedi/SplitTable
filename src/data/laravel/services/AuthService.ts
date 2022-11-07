import {Axios, AxiosResponse} from "axios";
import {inject, injectable} from "inversify";
import CancelablePromise from "cancelable-promise";
import {IAuthService} from "@core/services/IAuthService";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  GlobalAxiosRequestConfig,
  GetProfileDataResponse,
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

  getProfile() {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetProfileDataResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetProfileDataResponse>(`profile`, {
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }
}
