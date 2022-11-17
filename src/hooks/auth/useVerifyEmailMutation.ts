import React from "react";
import {container} from "@src/appEngine";
import {VerifyEmailResponse, VerifyEmailRequest} from "@src/models";
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
  VerifyEmailResponse,
  VerifyEmailRequest
> = data => authService.verifyEmail(data).then(response => response.data);

export default function useVerifyEmailMutation(
  options?: UseMutationOptions<
    VerifyEmailResponse,
    ApplicationError,
    VerifyEmailRequest
  >,
) {
  return useMutation<VerifyEmailResponse, ApplicationError, VerifyEmailRequest>(
    mutationFunction,
    options,
  );
}
