import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IMenuService} from "@core/services/IMenuService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  GetOwnerClubMenusResponse,
  GetOwnerClubMenusQueryParams,
} from "@src/models";
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
  "owner",
  GetOwnerClubMenusQueryParams,
];

const queryFn: QueryFunction<GetOwnerClubMenusResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetOwnerClubMenusQueryParams>) => {
  const queryParams = {
    ...queryKey[4],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getOwnerClubMenus(queryParams), {
    signal,
  });
};

export default function useInfiniteGetOwnerClubMenusQuery(
  queryParams: GetOwnerClubMenusQueryParams,
  options?: UseInfiniteQueryOptions<
    GetOwnerClubMenusResponse,
    ApplicationError,
    GetOwnerClubMenusResponse,
    GetOwnerClubMenusResponse,
    QueryKey
  >,
) {
  return useInfiniteQuery<
    GetOwnerClubMenusResponse,
    ApplicationError,
    GetOwnerClubMenusResponse,
    QueryKey
  >(
    [QueryKeys.MENU, "LIST", "infinite", "owner", queryParams],
    queryFn,
    options,
  );
}
