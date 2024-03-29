import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {DeleteOwnerTableRequest, DeleteOwnerTableResponse} from "@src/models";
import {
  useMutation,
  useQueryClient,
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

const mutationFunction: MutationFunction<
  DeleteOwnerTableResponse,
  DeleteOwnerTableRequest
> = data => service.deleteOwnerTable(data).then(response => response.data);

export default function useDeleteOwnerTableMutation(
  options?: UseMutationOptions<
    DeleteOwnerTableResponse,
    ApplicationError,
    DeleteOwnerTableRequest
  >,
) {
  const queryClient = useQueryClient();

  return useMutation<
    DeleteOwnerTableResponse,
    ApplicationError,
    DeleteOwnerTableRequest
  >(mutationFunction, {
    ...options,
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries([QueryKeys.TABLE, "LIST"]);
      options?.onSuccess?.(data, variables, context);
    },
  });
}
