import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {CancelBookingResponse} from "@src/models";
import {IClubService} from "@core/services/IClubService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  useMutation,
  useQueryClient,
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type TPayload = {bookingId: number} | {tableId: number};

const mutationFunction: MutationFunction<
  CancelBookingResponse,
  TPayload
> = payload => service.cancenBooking(payload).then(response => response.data);

export default function useCancelBookingMutation(
  options?: UseMutationOptions<
    CancelBookingResponse,
    ApplicationError,
    TPayload
  >,
) {
  const queryClient = useQueryClient();

  return useMutation<CancelBookingResponse, ApplicationError, TPayload>(
    mutationFunction,
    {
      ...options,
      async onSuccess(data, variables, context) {
        await queryClient.invalidateQueries([
          QueryKeys.UPCOMING_BOOKING,
          "LIST",
        ]);

        await queryClient.invalidateQueries([QueryKeys.TABLE]);
        options?.onSuccess?.(data, variables, context);
      },
    },
  );
}
