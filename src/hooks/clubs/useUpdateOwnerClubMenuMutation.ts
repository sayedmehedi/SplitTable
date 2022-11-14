import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IMenuService} from "@core/services/IMenuService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  UpdateOwnerClubMenuRequest,
  UpdateOwnerClubMenuResponse,
} from "@src/models";
import {
  useMutation,
  useQueryClient,
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";

const service = container.get<IMenuService>(ServiceProviderTypes.MenuService);

const mutationFunction: MutationFunction<
  UpdateOwnerClubMenuResponse,
  UpdateOwnerClubMenuRequest
> = data => service.updateOwnerClubMenu(data);

export default function useUpdateOwnerClubMenuMutation(
  options?: UseMutationOptions<
    UpdateOwnerClubMenuResponse,
    ApplicationError,
    UpdateOwnerClubMenuRequest
  >,
) {
  const queryClient = useQueryClient();
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useMutation<
    UpdateOwnerClubMenuResponse,
    ApplicationError,
    UpdateOwnerClubMenuRequest
  >(mutationFunction, {
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries([QueryKeys.TABLE]);
      optionsRef.current?.onSuccess?.(data, variables, context);
    },
  });
}
