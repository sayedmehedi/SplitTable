import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {handleCancelableAxiosPromise} from "@utils/http";
import {IUserService} from "@core/services/IUserService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  GetFavoriteClubsResponse,
  GetFavoriteClubsQueryParams,
} from "@src/models";
import {
  QueryFunction,
  useInfiniteQuery,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IUserService>(ServiceProviderTypes.UserService);

type QueryKey = [
  typeof QueryKeys.FAVORITE,
  "LIST",
  "infinite",
  GetFavoriteClubsQueryParams,
];

const queryFn: QueryFunction<GetFavoriteClubsResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetFavoriteClubsQueryParams>) => {
  const queryParams = {
    ...queryKey[3],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getFavorites(queryParams), {
    signal,
  });
};

export default function useInfiniteGetFavoritesQuery(
  queryParams: GetFavoriteClubsQueryParams,
  options?: UseInfiniteQueryOptions<
    GetFavoriteClubsResponse,
    ApplicationError,
    GetFavoriteClubsResponse,
    GetFavoriteClubsResponse,
    QueryKey
  >,
) {
  return useInfiniteQuery<
    GetFavoriteClubsResponse,
    ApplicationError,
    GetFavoriteClubsResponse,
    QueryKey
  >([QueryKeys.FAVORITE, "LIST", "infinite", queryParams], queryFn, options);
}
