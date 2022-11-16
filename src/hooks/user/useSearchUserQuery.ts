import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IUserService} from "@core/services/IUserService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {SearchUserResponse, SearchUserQueryParams} from "@src/models";
import {
  QueryFunction,
  useInfiniteQuery,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IUserService>(ServiceProviderTypes.UserService);

type QueryKey = [typeof QueryKeys.USER, "SEARCH", SearchUserQueryParams];

const queryFn: QueryFunction<SearchUserResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, SearchUserQueryParams>) => {
  const queryParams = {
    ...queryKey[2],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.searchUser(queryParams), {
    signal,
  });
};

export default function useSearchUserQuery(
  queryParams: SearchUserQueryParams,
  options?: UseInfiniteQueryOptions<
    SearchUserResponse,
    ApplicationError,
    SearchUserResponse,
    SearchUserResponse,
    QueryKey
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useInfiniteQuery<
    SearchUserResponse,
    ApplicationError,
    SearchUserResponse,
    QueryKey
  >([QueryKeys.USER, "SEARCH", queryParams], queryFn, optionsRef.current);
}
