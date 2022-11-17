import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IMenuService} from "@core/services/IMenuService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  DeleteOwnerClubMenuRequest,
  DeleteOwnerClubMenuResponse,
} from "@src/models";
import {
  useMutation,
  useQueryClient,
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";

const service = container.get<IMenuService>(ServiceProviderTypes.MenuService);

const mutationFunction: MutationFunction<
  DeleteOwnerClubMenuResponse,
  DeleteOwnerClubMenuRequest
> = data => service.deleteOwnerClubMenu(data).then(response => response.data);

export default function useDeleteOwnerClubMenuMutation(
  options?: UseMutationOptions<
    DeleteOwnerClubMenuResponse,
    ApplicationError,
    DeleteOwnerClubMenuRequest
  >,
) {
  const queryClient = useQueryClient();

  return useMutation<
    DeleteOwnerClubMenuResponse,
    ApplicationError,
    DeleteOwnerClubMenuRequest
  >(mutationFunction, {
    ...options,
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries([QueryKeys.MENU]);
      options?.onSuccess?.(data, variables, context);
    },
  });
}
