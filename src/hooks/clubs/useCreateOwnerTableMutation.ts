import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {CreateOwnerTableRequest, CreateOwnerTableResponse} from "@src/models";
import {
  useMutation,
  useQueryClient,
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

const mutationFunction: MutationFunction<
  CreateOwnerTableResponse,
  CreateOwnerTableRequest
> = data => service.createOwnerTable(data);

export default function useCreateOwnerTableMutation(
  options?: UseMutationOptions<
    CreateOwnerTableResponse,
    ApplicationError,
    CreateOwnerTableRequest
  >,
) {
  const queryClient = useQueryClient();
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useMutation<
    CreateOwnerTableResponse,
    ApplicationError,
    CreateOwnerTableRequest
  >(mutationFunction, {
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries([
        QueryKeys.TABLE,
        "LIST",
        "infinite",
      ]);
      optionsRef.current?.onSuccess?.(data, variables, context);
    },
  });
}
