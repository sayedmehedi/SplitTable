import RNFetchBlob from "rn-fetch-blob";
import {Axios, AxiosResponse} from "axios";
import {inject, injectable} from "inversify";
import CancelablePromise from "cancelable-promise";
import {ConfigService} from "@config/ConfigService";
import {IAuthService} from "@core/services/IAuthService";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  LogoutResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  GetProfileDataResponse,
  GlobalAxiosRequestConfig,
  ResendEmailVerificationCodeRequest,
  ResendEmailVerificationCodeResponse,
} from "@src/models";

@injectable()
export class AuthService implements IAuthService {
  @inject(ServiceProviderTypes.HttpClient)
  private readonly _httpService!: Axios;

  @inject(ConfigService)
  private readonly _config!: ConfigService;

  constructor() {}

  verifyEmail(
    data: VerifyEmailRequest,
  ): Promise<AxiosResponse<VerifyEmailResponse, GlobalAxiosRequestConfig>> {
    return this._httpService.post<VerifyEmailResponse>("email-verify", data);
  }

  resendEmailVerificationCode(
    data: ResendEmailVerificationCodeRequest,
  ): Promise<
    AxiosResponse<ResendEmailVerificationCodeResponse, GlobalAxiosRequestConfig>
  > {
    return this._httpService.post<ResendEmailVerificationCodeResponse>(
      "resend-email",
      data,
    );
  }

  async signup({
    onUploadProgress,
    ...data
  }: SignupRequest): Promise<SignupResponse> {
    const formattedPayload = Object.entries(data).reduce((acc, curr) => {
      const [fieldName, payload] = curr as [
        keyof typeof data,
        typeof data[keyof typeof data],
      ];

      if (fieldName === "image" && typeof payload !== "string" && !!payload) {
        if (!!payload.uri && payload.name && !!payload.type) {
          // because this image is optional
          acc.push({
            name: fieldName,
            type: payload.type,
            filename: payload.name,
            data: RNFetchBlob.wrap(payload.uri.replace("file://", "")),
          });
        }
      } else if (typeof payload !== "object" && !!payload) {
        acc.push({
          name: fieldName,
          data: payload,
        });
      }

      return acc;
    }, [] as {name: keyof typeof data; type?: string; filename?: string; data: string}[]);

    const response = await RNFetchBlob.config({
      trusty: true,
      timeout: 5000,
    })
      .fetch(
        "POST",
        `${this._config.apiBaseURL}/register`,

        {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        formattedPayload,
      )
      .uploadProgress({interval: 100}, (written, total) => {
        onUploadProgress?.(written, total);
      });

    const serverData = response.json();

    if (response.info().status === 422) {
      throw {
        non_field_error: "Invalid data",
        field_errors: Object.entries(
          serverData.errors as Record<string, string[]>,
        ).reduce((acc, [field, messages]) => {
          acc[field] = messages[0];
          return acc;
        }, {} as Record<string, string>),
      };
    }

    return serverData;
  }

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
