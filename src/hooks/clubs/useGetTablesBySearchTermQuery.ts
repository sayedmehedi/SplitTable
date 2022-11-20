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
  useQuery,
  QueryFunctionContext,
  UseQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [
  typeof QueryKeys.TABLE,
  "LIST",

  "by-search",
  GetTablesBySearchTermQueryParams,
];

const queryFn: QueryFunction<GetTablesBySearchTermResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetTablesBySearchTermQueryParams>) => {
  const queryParams = {
    ...queryKey[3],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(
    service.getTablesBySearchTerm(queryParams),
    {
      signal,
    },
  );
};

export default function useGetTablesBySearchTermQuery(
  queryParams: GetTablesBySearchTermQueryParams = {},
  options?: UseQueryOptions<
    GetTablesBySearchTermResponse,
    ApplicationError,
    GetTablesBySearchTermResponse,
    QueryKey
  >,
) {
  return useQuery<
    GetTablesBySearchTermResponse,
    ApplicationError,
    GetTablesBySearchTermResponse,
    QueryKey
  >([QueryKeys.TABLE, "LIST", "by-search", queryParams], queryFn, options);
}
