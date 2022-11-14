import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {UpdateOwnerTableRequest, UpdateOwnerTableResponse} from "@src/models";
import {
  useMutation,
  useQueryClient,
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

const mutationFunction: MutationFunction<
  UpdateOwnerTableResponse,
  UpdateOwnerTableRequest
> = data => service.updateOwnerTable(data);

export default function useUpdateOwnerTableMutation(
  options?: UseMutationOptions<
    UpdateOwnerTableResponse,
    ApplicationError,
    UpdateOwnerTableRequest
  >,
) {
  const queryClient = useQueryClient();
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useMutation<
    UpdateOwnerTableResponse,
    ApplicationError,
    UpdateOwnerTableRequest
  >(mutationFunction, {
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries([QueryKeys.TABLE]);

      optionsRef.current?.onSuccess?.(data, variables, context);
    },
  });
}
