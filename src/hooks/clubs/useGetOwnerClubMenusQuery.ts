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
  useQuery,
  QueryFunctionContext,
  UseQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IMenuService>(ServiceProviderTypes.MenuService);

type QueryKey = [
  typeof QueryKeys.MENU,
  "LIST",
  "owner",
  GetOwnerClubMenusQueryParams,
];

const queryFn: QueryFunction<GetOwnerClubMenusResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetOwnerClubMenusQueryParams>) => {
  const queryParams = {
    ...queryKey[3],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getOwnerClubMenus(queryParams), {
    signal,
  });
};

export default function useGetOwnerClubMenusQuery(
  queryParams: GetOwnerClubMenusQueryParams,
  options?: UseQueryOptions<
    GetOwnerClubMenusResponse,
    ApplicationError,
    GetOwnerClubMenusResponse,
    QueryKey
  >,
) {
  return useQuery<
    GetOwnerClubMenusResponse,
    ApplicationError,
    GetOwnerClubMenusResponse,
    QueryKey
  >([QueryKeys.MENU, "LIST", "owner", queryParams], queryFn, options);
}
