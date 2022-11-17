import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IMenuService} from "@core/services/IMenuService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  CreateOwnerClubMenuRequest,
  CreateOwnerClubMenuResponse,
} from "@src/models";
import {
  useMutation,
  useQueryClient,
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";

const service = container.get<IMenuService>(ServiceProviderTypes.MenuService);

const mutationFunction: MutationFunction<
  CreateOwnerClubMenuResponse,
  CreateOwnerClubMenuRequest
> = data => service.createOwnerClubMenu(data);

export default function useCreateOwnerClubMenuMutation(
  options?: UseMutationOptions<
    CreateOwnerClubMenuResponse,
    ApplicationError,
    CreateOwnerClubMenuRequest
  >,
) {
  const queryClient = useQueryClient();

  return useMutation<
    CreateOwnerClubMenuResponse,
    ApplicationError,
    CreateOwnerClubMenuRequest
  >(mutationFunction, {
    ...options,
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries([QueryKeys.TABLE]);
      options?.onSuccess?.(data, variables, context);
    },
  });
}
