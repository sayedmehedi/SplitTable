import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  UpdateOwnerClubInfoRequest,
  UpdateOwnerClubInfoResponse,
} from "@src/models";
import {
  useMutation,
  useQueryClient,
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

const mutationFunction: MutationFunction<
  UpdateOwnerClubInfoResponse,
  UpdateOwnerClubInfoRequest
> = data => service.updateOwnerClubInfo(data);

export default function useUpdateOwnerClubInfoMutation(
  options?: UseMutationOptions<
    UpdateOwnerClubInfoResponse,
    ApplicationError,
    UpdateOwnerClubInfoRequest
  >,
) {
  const queryClient = useQueryClient();
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useMutation<
    UpdateOwnerClubInfoResponse,
    ApplicationError,
    UpdateOwnerClubInfoRequest
  >(mutationFunction, {
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries([QueryKeys.CLUB, "INFO"]);
      optionsRef.current?.onSuccess?.(data, variables, context);
    },
  });
}
