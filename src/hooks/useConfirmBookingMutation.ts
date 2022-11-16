import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {ConfirmBookingRequest, ConfirmBookingResponse} from "@src/models";
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

function useConfirmBookingMutation(
  options: UseMutationOptions<
    ConfirmBookingResponse,
    ApplicationError,
    ConfirmBookingRequest
  > = {},
) {
  const queryClient = useQueryClient();

  return useMutation<
    ConfirmBookingResponse,
    ApplicationError,
    ConfirmBookingRequest
  >(
    async data => {
      const response = await service.confirmBooking(data);
      return response.data;
    },
    {
      ...options,
      async onSuccess(_data, _variables, _context) {
        await queryClient.invalidateQueries([QueryKeys.TRANSACTION]);
        await queryClient.invalidateQueries([QueryKeys.UPCOMING_BOOKING]);

        options.onSuccess?.(_data, _variables, _context);
      },
    },
  );
}

export default useConfirmBookingMutation;
