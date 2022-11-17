import React from "react";
import {container} from "@src/appEngine";
import {SignupResponse, SignupRequest} from "@src/models";
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
  SignupResponse,
  SignupRequest
> = data => authService.signup(data);

export default function useRegisterMutation(
  options?: UseMutationOptions<SignupResponse, ApplicationError, SignupRequest>,
) {
  return useMutation<SignupResponse, ApplicationError, SignupRequest>(
    mutationFunction,
    options,
  );
}
