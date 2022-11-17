import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  GetUpcomingBookingResponse,
  GetUpcomingBookingQueryParams,
} from "@src/models";
import {
  useQuery,
  QueryFunction,
  UseQueryOptions,
  QueryFunctionContext,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [
  typeof QueryKeys.UPCOMING_BOOKING,
  "LIST",
  GetUpcomingBookingQueryParams,
];

const queryFn: QueryFunction<GetUpcomingBookingResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetUpcomingBookingQueryParams>) => {
  const queryParams = {
    ...queryKey[2],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getUpcomingBooking(queryParams), {
    signal,
  });
};

export default function useGetUpcomingBookingQuery(
  queryParams: GetUpcomingBookingQueryParams = {},
  options?: UseQueryOptions<
    GetUpcomingBookingResponse,
    ApplicationError,
    GetUpcomingBookingResponse,
    QueryKey
  >,
) {
  return useQuery<
    GetUpcomingBookingResponse,
    ApplicationError,
    GetUpcomingBookingResponse,
    QueryKey
  >([QueryKeys.UPCOMING_BOOKING, "LIST", queryParams], queryFn, options);
}
