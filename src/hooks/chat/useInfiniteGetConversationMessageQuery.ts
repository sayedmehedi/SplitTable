import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IChatService} from "@core/services/IChatService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {ApplicationError} from "@core/domain/ApplicationError";
import {
  GetConversationMessagesQueryParams,
  GetConversationMessagesResponse,
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
  "DETAILS",
  GetConversationMessagesQueryParams,
];

const queryFn: QueryFunction<GetConversationMessagesResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetConversationMessagesQueryParams>) => {
  const queryParams = {
    ...queryKey[2],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(
    service.getConversationMessages(queryParams),
    {
      signal,
    },
  );
};

function useInfiniteGetConversationMessageQuery(
  queryParams: GetConversationMessagesQueryParams,
  options?: UseInfiniteQueryOptions<
    GetConversationMessagesResponse,
    ApplicationError,
    GetConversationMessagesResponse,
    GetConversationMessagesResponse,
    QueryKey
  >,
) {
  return useInfiniteQuery<
    GetConversationMessagesResponse,
    ApplicationError,
    GetConversationMessagesResponse,
    QueryKey
  >([QueryKeys.CHAT, "DETAILS", queryParams], queryFn, options);
}

export default useInfiniteGetConversationMessageQuery;
