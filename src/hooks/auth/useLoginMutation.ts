import React from "react";
import {container} from "@src/appEngine";
import {LoginResponse, LoginRequest} from "@src/models";
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
  LoginResponse,
  LoginRequest
> = async data => {
  const response = await authService.login(data);

  return response.data;
};

export default function useLoginMutation(
  options?: UseMutationOptions<LoginResponse, ApplicationError, LoginRequest>,
) {
  return useMutation<LoginResponse, ApplicationError, LoginRequest>(
    loginMutationFunction,
    options,
  );
}
