import {AxiosResponse} from "axios";
import CancelablePromise from "cancelable-promise";
import {
  LoginRequest,
  LoginResponse,
  SignupResponse,
  SignupRequest,
  LogoutResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  GetProfileDataResponse,
  GlobalAxiosRequestConfig,
  ResendEmailVerificationCodeRequest,
  ResendEmailVerificationCodeResponse,
} from "@src/models";

export interface IAuthService {
  login(
    data: LoginRequest,
  ): Promise<AxiosResponse<LoginResponse, GlobalAxiosRequestConfig>>;

  logout(): Promise<AxiosResponse<LogoutResponse, GlobalAxiosRequestConfig>>;

  getProfile(): CancelablePromise<
    AxiosResponse<GetProfileDataResponse, GlobalAxiosRequestConfig>
  >;

  signup(data: SignupRequest): Promise<SignupResponse>;

  verifyEmail(
    data: VerifyEmailRequest,
  ): Promise<AxiosResponse<VerifyEmailResponse, GlobalAxiosRequestConfig>>;

  resendEmailVerificationCode(
    data: ResendEmailVerificationCodeRequest,
  ): Promise<
    AxiosResponse<ResendEmailVerificationCodeResponse, GlobalAxiosRequestConfig>
  >;
}
