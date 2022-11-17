import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {INotificationService} from "@core/services/INotificationService";
import {
  GetNotificationsResponse,
  GetNotificationsQueryParams,
} from "@src/models";
import {
  QueryFunction,
  useInfiniteQuery,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const service = container.get<INotificationService>(
  ServiceProviderTypes.NotificationService,
);

type QueryKey = [
  typeof QueryKeys.TABLE,
  "LIST",
  "infinite",
  "notifications",
  GetNotificationsQueryParams,
];

const queryFn: QueryFunction<GetNotificationsResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetNotificationsQueryParams>) => {
  const queryParams = {
    ...queryKey[4],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getNotifications(queryParams), {
    signal,
  });
};

export default function useInfiniteGetNotificationsQuery(
  queryParams: GetNotificationsQueryParams = {},
  options?: UseInfiniteQueryOptions<
    GetNotificationsResponse,
    ApplicationError,
    GetNotificationsResponse,
    GetNotificationsResponse,
    QueryKey
  >,
) {
  return useInfiniteQuery<
    GetNotificationsResponse,
    ApplicationError,
    GetNotificationsResponse,
    QueryKey
  >(
    [QueryKeys.TABLE, "LIST", "infinite", "notifications", queryParams],
    queryFn,
    options,
  );
}
