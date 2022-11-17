import React from "react";
import {container} from "@src/appEngine";
import {ResponseResult} from "@src/models";
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
  ResponseResult,
  string
> = async data => {
  const response = await authService.forgotPassword(data);

  return response.data;
};

export default function useForgotPasswordMutation(
  options?: UseMutationOptions<ResponseResult, ApplicationError, string>,
) {
  return useMutation<ResponseResult, ApplicationError, string>(
    loginMutationFunction,
    options,
  );
}
