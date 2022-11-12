import React from "react";
import {container} from "@src/appEngine";
import {
  ResendEmailVerificationCodeResponse,
  ResendEmailVerificationCodeRequest,
} from "@src/models";
import {IAuthService} from "@core/services/IAuthService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  useMutation,
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";

const authService = container.get<IAuthService>(
  ServiceProviderTypes.AuthService,
);

const mutationFunction: MutationFunction<
  ResendEmailVerificationCodeResponse,
  ResendEmailVerificationCodeRequest
> = data =>
  authService.resendEmailVerificationCode(data).then(response => response.data);

export default function useResendEmailVerificationCodeMutation(
  options?: UseMutationOptions<
    ResendEmailVerificationCodeResponse,
    ApplicationError,
    ResendEmailVerificationCodeRequest
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useMutation<
    ResendEmailVerificationCodeResponse,
    ApplicationError,
    ResendEmailVerificationCodeRequest
  >(mutationFunction, optionsRef.current);
}
