import React from "react";
import {container} from "@src/appEngine";
import {LogoutResponse} from "@src/models";
import useAppToast from "@hooks/useAppToast";
import {QueryKeys} from "@constants/query-keys";
import {IAuthService} from "@core/services/IAuthService";
import {AuthTypeContext} from "@providers/AuthTypeProvider";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import useDeleteAuthDataMutation from "@hooks/useDeleteAuthDataMutation";
import {
  useMutation,
  MutationFunction,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

const authService = container.get<IAuthService>(
  ServiceProviderTypes.AuthService,
);

const mutationFunction: MutationFunction<LogoutResponse> = () =>
  authService.logout().then(response => response.data);

export default function useLogoutMutation(
  options?: UseMutationOptions<LogoutResponse, ApplicationError>,
) {
  const toast = useAppToast();
  const queryClient = useQueryClient();
  const {changeAuthType} = React.useContext(AuthTypeContext);

  const {mutateAsync: deleteAuthData} = useDeleteAuthDataMutation({
    onError(error) {
      toast.error(error.message);
    },
  });

  return useMutation<LogoutResponse, ApplicationError>(mutationFunction, {
    ...options,
    async onMutate(variables) {
      await deleteAuthData();
      // queryClient.removeQueries([]);
      // await queryClient.invalidateQueries([QueryKeys.AUTH_DATA]);
      queryClient.clear();
      changeAuthType(null);

      options?.onMutate?.(variables);
    },
  });
}
