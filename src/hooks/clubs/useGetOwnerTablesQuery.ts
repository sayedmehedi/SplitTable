import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GetOwnerTablesResponse, GetOwnerTablesQueryParams} from "@src/models";
import {
  useQuery,
  QueryFunction,
  UseQueryOptions,
  QueryFunctionContext,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [
  typeof QueryKeys.TABLE,
  "LIST",
  "owner",
  GetOwnerTablesQueryParams,
];

const queryFn: QueryFunction<GetOwnerTablesResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetOwnerTablesQueryParams>) => {
  const queryParams = {
    ...queryKey[3],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getOwnerTables(queryParams), {
    signal,
  });
};

export default function useGetOwnerTablesQuery(
  queryParams: GetOwnerTablesQueryParams,
  options?: UseQueryOptions<
    GetOwnerTablesResponse,
    ApplicationError,
    GetOwnerTablesResponse,
    QueryKey
  >,
) {
  return useQuery<
    GetOwnerTablesResponse,
    ApplicationError,
    GetOwnerTablesResponse,
    QueryKey
  >([QueryKeys.TABLE, "LIST", "owner", queryParams], queryFn, options);
}
