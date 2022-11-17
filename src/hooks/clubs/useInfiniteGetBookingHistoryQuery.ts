import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  GetBookingHistoryResponse,
  GetBookingHistoryQueryParams,
} from "@src/models";
import {
  QueryFunction,
  useInfiniteQuery,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [
  typeof QueryKeys.BOOKING_HISTORY,
  "LIST",
  "infinite",

  GetBookingHistoryQueryParams,
];

const queryFn: QueryFunction<GetBookingHistoryResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetBookingHistoryQueryParams>) => {
  const queryParams = {
    ...queryKey[3],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getBookingHistory(queryParams), {
    signal,
  });
};

export default function useInfiniteGetBookingHistoryQuery(
  queryParams: GetBookingHistoryQueryParams = {},
  options?: UseInfiniteQueryOptions<
    GetBookingHistoryResponse,
    ApplicationError,
    GetBookingHistoryResponse,
    GetBookingHistoryResponse,
    QueryKey
  >,
) {
  return useInfiniteQuery<
    GetBookingHistoryResponse,
    ApplicationError,
    GetBookingHistoryResponse,
    QueryKey
  >(
    [QueryKeys.BOOKING_HISTORY, "LIST", "infinite", queryParams],
    queryFn,
    options,
  );
}
