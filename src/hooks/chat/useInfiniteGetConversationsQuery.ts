import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IChatService} from "@core/services/IChatService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {ApplicationError} from "@core/domain/ApplicationError";
import {
  GetConversationsQueryParams,
  GetConversationsResponse,
} from "@src/models";
import {
  QueryFunction,
  useInfiniteQuery,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IChatService>(ServiceProviderTypes.ChatService);

type QueryKey = [
  typeof QueryKeys.CHAT,
  "LIST",
  "infinite",
  GetConversationsQueryParams,
];

const queryFn: QueryFunction<GetConversationsResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetConversationsQueryParams>) => {
  const queryParams = {
    ...queryKey[3],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getConversations(queryParams), {
    signal,
  });
};

function useInfiniteGetConversationsQuery(
  queryParams: GetConversationsQueryParams = {},
  options?: UseInfiniteQueryOptions<
    GetConversationsResponse,
    ApplicationError,
    GetConversationsResponse,
    GetConversationsResponse,
    QueryKey
  >,
) {
  return useInfiniteQuery<
    GetConversationsResponse,
    ApplicationError,
    GetConversationsResponse,
    QueryKey
  >([QueryKeys.CHAT, "LIST", "infinite", queryParams], queryFn, options);
}

export default useInfiniteGetConversationsQuery;
