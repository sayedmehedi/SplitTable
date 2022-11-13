import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GetSplitTablesReponse, GetSplitTablesQueryParams} from "@src/models";
import {
  QueryFunction,
  useInfiniteQuery,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [
  typeof QueryKeys.TABLE,
  "LIST",
  "infinite",
  "joined",
  GetSplitTablesQueryParams,
];

const queryFn: QueryFunction<GetSplitTablesReponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetSplitTablesQueryParams>) => {
  const queryParams = {
    ...queryKey[4],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getJoinTables(queryParams), {
    signal,
  });
};

export default function useInfiniteGetJoinTablesQuery(
  queryParams: GetSplitTablesQueryParams = {},
  options?: UseInfiniteQueryOptions<
    GetSplitTablesReponse,
    ApplicationError,
    GetSplitTablesReponse,
    GetSplitTablesReponse,
    QueryKey
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useInfiniteQuery<
    GetSplitTablesReponse,
    ApplicationError,
    GetSplitTablesReponse,
    QueryKey
  >(
    [QueryKeys.TABLE, "LIST", "infinite", "joined", queryParams],
    queryFn,
    optionsRef.current,
  );
}
