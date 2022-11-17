import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IUserService} from "@core/services/IUserService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GetFaqsResponse, GetFaqsQueryParams} from "@src/models";
import {
  QueryFunction,
  useInfiniteQuery,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IUserService>(ServiceProviderTypes.UserService);

type QueryKey = [typeof QueryKeys.FAQ, "LIST", "infinite", GetFaqsQueryParams];

const queryFn: QueryFunction<GetFaqsResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetFaqsQueryParams>) => {
  const queryParams = {
    ...queryKey[3],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getFaqs(queryParams), {
    signal,
  });
};

export default function useInfiniteGetFaqsQuery(
  queryParams: GetFaqsQueryParams,
  options?: UseInfiniteQueryOptions<
    GetFaqsResponse,
    ApplicationError,
    GetFaqsResponse,
    GetFaqsResponse,
    QueryKey
  >,
) {
  return useInfiniteQuery<
    GetFaqsResponse,
    ApplicationError,
    GetFaqsResponse,
    QueryKey
  >([QueryKeys.FAQ, "LIST", "infinite", queryParams], queryFn, options);
}
