import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IUserService} from "@core/services/IUserService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {CheckFriendshipResponse, CheckFriendshipQueryParams} from "@src/models";
import {
  useQuery,
  QueryFunction,
  UseQueryOptions,
  QueryFunctionContext,
} from "@tanstack/react-query";

const service = container.get<IUserService>(ServiceProviderTypes.UserService);

type QueryKey = [
  typeof QueryKeys.FRIEND,
  "CHECK-FRIENDSHIP",
  CheckFriendshipQueryParams,
];

const queryFn: QueryFunction<CheckFriendshipResponse, QueryKey> = ({
  signal,
  queryKey,
}: QueryFunctionContext<QueryKey, CheckFriendshipQueryParams>) => {
  const queryParams = {
    ...queryKey[2],
  };

  return handleCancelableAxiosPromise(service.checkFriendship(queryParams), {
    signal,
  });
};

export default function useCheckFriendshipQuery(
  queryParams: CheckFriendshipQueryParams,
  options?: UseQueryOptions<
    CheckFriendshipResponse,
    ApplicationError,
    CheckFriendshipResponse,
    QueryKey
  >,
) {
  return useQuery<
    CheckFriendshipResponse,
    ApplicationError,
    CheckFriendshipResponse,
    QueryKey
  >([QueryKeys.FRIEND, "CHECK-FRIENDSHIP", queryParams], queryFn, options);
}
