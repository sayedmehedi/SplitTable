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
  QueryFunction,
  useInfiniteQuery,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [
  typeof QueryKeys.BOOKING,
  "UPCOMING",
  "LIST",
  "infinite",

  GetUpcomingBookingQueryParams,
];

const queryFn: QueryFunction<GetUpcomingBookingResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetUpcomingBookingQueryParams>) => {
  const queryParams = {
    ...queryKey[4],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getUpcomingBooking(queryParams), {
    signal,
  });
};

export default function useInfiniteGetUpcomingBookingQuery(
  queryParams: GetUpcomingBookingQueryParams = {},
  options?: UseInfiniteQueryOptions<
    GetUpcomingBookingResponse,
    ApplicationError,
    GetUpcomingBookingResponse,
    GetUpcomingBookingResponse,
    QueryKey
  >,
) {
  return useInfiniteQuery<
    GetUpcomingBookingResponse,
    ApplicationError,
    GetUpcomingBookingResponse,
    QueryKey
  >(
    [QueryKeys.BOOKING, "UPCOMING", "LIST", "infinite", queryParams],
    queryFn,
    options,
  );
}
