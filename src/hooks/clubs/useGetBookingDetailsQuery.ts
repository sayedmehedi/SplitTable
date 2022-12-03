import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {GetBookingDetailsResponse} from "@src/models";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {QueryFunction, UseQueryOptions, useQuery} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [typeof QueryKeys.BOOKING, "DETAILS", number];

const queryFn: QueryFunction<GetBookingDetailsResponse, QueryKey> = ({
  signal,
  queryKey,
}) => {
  const clubId = queryKey[2];

  return handleCancelableAxiosPromise(service.getBookingDetails(clubId), {
    signal,
  });
};

export default function useGetBookingDetailsQuery(
  bookingId: number,
  options?: UseQueryOptions<
    GetBookingDetailsResponse,
    ApplicationError,
    GetBookingDetailsResponse,
    QueryKey
  >,
) {
  return useQuery<
    GetBookingDetailsResponse,
    ApplicationError,
    GetBookingDetailsResponse,
    QueryKey
  >([QueryKeys.BOOKING, "DETAILS", bookingId], queryFn, options);
}
