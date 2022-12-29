import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IUserService} from "@core/services/IUserService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GetFriendListResponse, GetFriendListQueryParams} from "@src/models";
import {
  QueryFunction,
  useInfiniteQuery,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IUserService>(ServiceProviderTypes.UserService);

type QueryKey = [
  typeof QueryKeys.FRIEND,
  "LIST",
  "infinite",
  GetFriendListQueryParams,
];

const queryFn: QueryFunction<GetFriendListResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetFriendListQueryParams>) => {
  const queryParams = {
    ...queryKey[3],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getFriendList(queryParams), {
    signal,
  });
};

export default function useInfiniteGetFriendListQuery(
  queryParams: GetFriendListQueryParams,
  options?: UseInfiniteQueryOptions<
    GetFriendListResponse,
    ApplicationError,
    GetFriendListResponse,
    GetFriendListResponse,
    QueryKey
  >,
) {
  return useInfiniteQuery<
    GetFriendListResponse,
    ApplicationError,
    GetFriendListResponse,
    QueryKey
  >([QueryKeys.FRIEND, "LIST", "infinite", queryParams], queryFn, options);
}
