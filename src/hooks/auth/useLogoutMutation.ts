import React from "react";
import {container} from "@src/appEngine";
import {LogoutResponse} from "@src/models";
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

const loginMutationFunction: MutationFunction<LogoutResponse> = async data => {
  const response = await authService.logout();

  return response.data;
};

export default function useLoginMutation(
  options?: UseMutationOptions<LogoutResponse, ApplicationError>,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useMutation<LogoutResponse, ApplicationError>(
    loginMutationFunction,
    optionsRef.current,
  );
}
