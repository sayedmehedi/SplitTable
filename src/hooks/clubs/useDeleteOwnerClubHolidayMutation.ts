import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  DeleteOwnerClubHolidayRequest,
  DeleteOwnerClubHolidayResponse,
} from "@src/models";
import {
  useMutation,
  useQueryClient,
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

const mutationFunction: MutationFunction<
  DeleteOwnerClubHolidayResponse,
  DeleteOwnerClubHolidayRequest
> = data =>
  service.deleteOwnerClubHoliday(data).then(response => response.data);

export default function useDeleteOwnerClubHolidayMutation(
  options?: UseMutationOptions<
    DeleteOwnerClubHolidayResponse,
    ApplicationError,
    DeleteOwnerClubHolidayRequest
  >,
) {
  const queryClient = useQueryClient();
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useMutation<
    DeleteOwnerClubHolidayResponse,
    ApplicationError,
    DeleteOwnerClubHolidayRequest
  >(mutationFunction, {
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries([QueryKeys.HOLIDAY]);
      optionsRef.current?.onSuccess?.(data, variables, context);
    },
  });
}
