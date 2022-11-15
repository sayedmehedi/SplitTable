import React from "react";
import {container} from "@src/appEngine";
import {ResetPasswordRequest, ResetPasswordResponse} from "@src/models";
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

const loginMutationFunction: MutationFunction<
  ResetPasswordResponse,
  ResetPasswordRequest
> = async data => {
  const response = await authService.resetPassword(data);

  return response.data;
};

export default function useResetPasswordMutation(
  options?: UseMutationOptions<
    ResetPasswordResponse,
    ApplicationError,
    ResetPasswordRequest
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useMutation<
    ResetPasswordResponse,
    ApplicationError,
    ResetPasswordRequest
  >(loginMutationFunction, optionsRef.current);
}
