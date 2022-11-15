import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  CreateOwnerClubHolidayRequest,
  CreateOwnerClubHolidayResponse,
} from "@src/models";
import {
  useMutation,
  useQueryClient,
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

const mutationFunction: MutationFunction<
  CreateOwnerClubHolidayResponse,
  CreateOwnerClubHolidayRequest
> = data =>
  service.createOwnerClubHoliday(data).then(response => response.data);

export default function useCreateOwnerClubHolidayMutation(
  options?: UseMutationOptions<
    CreateOwnerClubHolidayResponse,
    ApplicationError,
    CreateOwnerClubHolidayRequest
  >,
) {
  const queryClient = useQueryClient();
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useMutation<
    CreateOwnerClubHolidayResponse,
    ApplicationError,
    CreateOwnerClubHolidayRequest
  >(mutationFunction, {
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries([QueryKeys.HOLIDAY]);
      optionsRef.current?.onSuccess?.(data, variables, context);
    },
  });
}
