import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {handleCancelableAxiosPromise} from "@utils/http";
import {IUserService} from "@core/services/IUserService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GetTransactionsResponse, GetTransactionsQueryParams} from "@src/models";
import {
  QueryFunction,
  useInfiniteQuery,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IUserService>(ServiceProviderTypes.UserService);

type QueryKey = [
  typeof QueryKeys.TRANSACTION,
  "LIST",
  "infinite",
  GetTransactionsQueryParams,
];

const queryFn: QueryFunction<GetTransactionsResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetTransactionsQueryParams>) => {
  const queryParams = {
    ...queryKey[3],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getTransactions(queryParams), {
    signal,
  });
};

export default function useInfiniteGetTransactionsQuery(
  queryParams: GetTransactionsQueryParams,
  options?: UseInfiniteQueryOptions<
    GetTransactionsResponse,
    ApplicationError,
    GetTransactionsResponse,
    GetTransactionsResponse,
    QueryKey
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useInfiniteQuery<
    GetTransactionsResponse,
    ApplicationError,
    GetTransactionsResponse,
    QueryKey
  >(
    [QueryKeys.TRANSACTION, "LIST", "infinite", queryParams],
    queryFn,
    optionsRef.current,
  );
}
