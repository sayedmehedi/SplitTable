import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  GetSplitTablesByClubIdResponse,
  GetBookedTablesByClubIdResponse,
  GetSplitTablesByClubIdQueryParams,
  GetBookedTablesByClubIdQueryParams,
} from "@src/models";
import {
  QueryFunction,
  useInfiniteQuery,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [
  typeof QueryKeys.TABLE,
  "LIST",
  "infinite",
  "by-club-id",
  GetSplitTablesByClubIdQueryParams | GetBookedTablesByClubIdQueryParams,
];

const queryFn: QueryFunction<
  GetSplitTablesByClubIdResponse | GetBookedTablesByClubIdResponse,
  QueryKey
> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<
  QueryKey,
  GetSplitTablesByClubIdQueryParams | GetBookedTablesByClubIdQueryParams
>) => {
  const queryParams = {
    ...queryKey[4],
    ...(pageParam ?? {}),
  } as any;

  return handleCancelableAxiosPromise(service.getTablesByClubId(queryParams), {
    signal,
  });
};

export default function useInfiniteGetTablesByClubIdQuery(
  queryParams:
    | GetBookedTablesByClubIdQueryParams
    | GetSplitTablesByClubIdQueryParams,
  options?: UseInfiniteQueryOptions<
    GetBookedTablesByClubIdResponse | GetSplitTablesByClubIdResponse,
    ApplicationError,
    GetBookedTablesByClubIdResponse | GetSplitTablesByClubIdResponse,
    GetBookedTablesByClubIdResponse | GetSplitTablesByClubIdResponse,
    QueryKey
  >,
) {
  return useInfiniteQuery<
    GetSplitTablesByClubIdResponse | GetBookedTablesByClubIdResponse,
    ApplicationError,
    GetSplitTablesByClubIdResponse | GetBookedTablesByClubIdResponse,
    QueryKey
  >(
    [QueryKeys.TABLE, "LIST", "infinite", "by-club-id", queryParams],
    queryFn,
    options,
  );
}
