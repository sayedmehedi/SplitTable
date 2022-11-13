import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  GetTablesBySearchTermResponse,
  GetTablesBySearchTermQueryParams,
} from "@src/models";
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
  "by-search",
  GetTablesBySearchTermQueryParams,
];

const queryFn: QueryFunction<GetTablesBySearchTermResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetTablesBySearchTermQueryParams>) => {
  const queryParams = {
    ...queryKey[4],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(
    service.getTablesBySearchTerm(queryParams),
    {
      signal,
    },
  );
};

export default function useInfiniteGetTablesBySearchTermQuery(
  queryParams: GetTablesBySearchTermQueryParams = {},
  options?: UseInfiniteQueryOptions<
    GetTablesBySearchTermResponse,
    ApplicationError,
    GetTablesBySearchTermResponse,
    GetTablesBySearchTermResponse,
    QueryKey
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useInfiniteQuery<
    GetTablesBySearchTermResponse,
    ApplicationError,
    GetTablesBySearchTermResponse,
    QueryKey
  >(
    [QueryKeys.TABLE, "LIST", "infinite", "by-search", queryParams],
    queryFn,
    optionsRef.current,
  );
}
