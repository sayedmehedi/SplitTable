import {AxiosResponse} from "axios";
import {
  LoginRequest,
  LoginResponse,
  SignupResponse,
  SignupRequest,
  LogoutResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  GlobalAxiosRequestConfig,
  ResendEmailVerificationCodeRequest,
  ResendEmailVerificationCodeResponse,
  ResponseResult,
  ResetPasswordRequest,
  ResetPasswordResponse,
  SocialLoginRequest,
  SocialLoginResponse,
} from "@src/models";

export interface IAuthService {
  login(
    data: LoginRequest,
  ): Promise<AxiosResponse<LoginResponse, GlobalAxiosRequestConfig>>;

  socialLogin(
    data: SocialLoginRequest,
  ): Promise<AxiosResponse<SocialLoginResponse, GlobalAxiosRequestConfig>>;

  logout(): Promise<AxiosResponse<LogoutResponse, GlobalAxiosRequestConfig>>;

  resetPassword(
    data: ResetPasswordRequest,
  ): Promise<AxiosResponse<ResetPasswordResponse, GlobalAxiosRequestConfig>>;

  signup(data: SignupRequest): Promise<SignupResponse>;

  verifyEmail(
    data: VerifyEmailRequest,
  ): Promise<AxiosResponse<VerifyEmailResponse, GlobalAxiosRequestConfig>>;

  forgotPassword(
    email: string,
  ): Promise<AxiosResponse<ResponseResult, GlobalAxiosRequestConfig>>;

  resendEmailVerificationCode(
    data: ResendEmailVerificationCodeRequest,
  ): Promise<
    AxiosResponse<ResendEmailVerificationCodeResponse, GlobalAxiosRequestConfig>
  >;
}
