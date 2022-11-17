import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IMenuService} from "@core/services/IMenuService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GetClubMenusResponse, GetClubMenusQueryParams} from "@src/models";
import {
  QueryFunction,
  useInfiniteQuery,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IMenuService>(ServiceProviderTypes.MenuService);

type QueryKey = [
  typeof QueryKeys.MENU,
  "LIST",
  "infinite",
  "by-club-id",
  GetClubMenusQueryParams,
];

const queryFn: QueryFunction<GetClubMenusResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetClubMenusQueryParams>) => {
  const queryParams = {
    ...queryKey[4],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getClubMenus(queryParams), {
    signal,
  });
};

export default function useInfiniteGetClubMenusQuery(
  queryParams: GetClubMenusQueryParams,
  options?: UseInfiniteQueryOptions<
    GetClubMenusResponse,
    ApplicationError,
    GetClubMenusResponse,
    GetClubMenusResponse,
    QueryKey
  >,
) {
  return useInfiniteQuery<
    GetClubMenusResponse,
    ApplicationError,
    GetClubMenusResponse,
    QueryKey
  >(
    [QueryKeys.MENU, "LIST", "infinite", "by-club-id", queryParams],
    queryFn,
    options,
  );
}
