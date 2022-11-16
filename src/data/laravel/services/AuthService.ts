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
  GlobalAxiosRequestConfig,
  ResendEmailVerificationCodeRequest,
  ResendEmailVerificationCodeResponse,
  ResponseResult,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "@src/models";
import {parseRnFetchBlobJsonResponse} from "@utils/http";

@injectable()
export class AuthService implements IAuthService {
  @inject(ServiceProviderTypes.HttpClient)
  private readonly _httpService!: Axios;

  @inject(ConfigService)
  private readonly _config!: ConfigService;

  constructor() {}

  resetPassword(
    data: ResetPasswordRequest,
  ): Promise<AxiosResponse<ResetPasswordResponse, GlobalAxiosRequestConfig>> {
    return this._httpService.post<ResponseResult>("reset-password", data);
  }

  forgotPassword(
    email: string,
  ): Promise<AxiosResponse<ResponseResult<{}>, GlobalAxiosRequestConfig>> {
    return this._httpService.post<ResponseResult>("forget-password", {email});
  }

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

      if (
        fieldName === "image" &&
        typeof payload !== "string" &&
        payload !== undefined
      ) {
        if (!!payload.uri && payload.name && !!payload.type) {
          // because this image is optional
          acc.push({
            name: fieldName,
            type: payload.type,
            filename: payload.name,
            data: RNFetchBlob.wrap(payload.uri.replace("file://", "")),
          });
        }
      } else if (typeof payload !== "object" && payload !== undefined) {
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

    const serverData = await parseRnFetchBlobJsonResponse(response);

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
}
