import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GetRecentViewsReponse, GetRecentViewsQueryParams} from "@src/models";
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
  "recent-viewed",
  GetRecentViewsQueryParams,
];

const queryFn: QueryFunction<GetRecentViewsReponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetRecentViewsQueryParams>) => {
  const queryParams = {
    ...queryKey[4],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getRecentViews(queryParams), {
    signal,
  });
};

export default function useInfiniteGetRecentViewsQuery(
  queryParams: GetRecentViewsQueryParams = {},
  options?: UseInfiniteQueryOptions<
    GetRecentViewsReponse,
    ApplicationError,
    GetRecentViewsReponse,
    GetRecentViewsReponse,
    QueryKey
  >,
) {
  return useInfiniteQuery<
    GetRecentViewsReponse,
    ApplicationError,
    GetRecentViewsReponse,
    QueryKey
  >(
    [QueryKeys.TABLE, "LIST", "infinite", "recent-viewed", queryParams],
    queryFn,
    options,
  );
}
