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

const mutationFunction: MutationFunction<LogoutResponse> = () =>
  authService.logout().then(response => response.data);

export default function useLogoutMutation(
  options?: UseMutationOptions<LogoutResponse, ApplicationError>,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useMutation<LogoutResponse, ApplicationError>(
    mutationFunction,
    optionsRef.current,
  );
}
