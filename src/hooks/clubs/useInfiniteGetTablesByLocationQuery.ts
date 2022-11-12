import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  GetTablesByLocationResponse,
  GetTablesByLocationQueryParams,
} from "@src/models";
import {
  QueryFunction,
  QueryFunctionContext,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [
  typeof QueryKeys.TABLE,
  "LIST",
  "INFINITE",
  "by-location",
  GetTablesByLocationQueryParams,
];

const queryFn: QueryFunction<GetTablesByLocationResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetTablesByLocationQueryParams>) => {
  const queryParams = {
    ...queryKey[4],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(
    service.getTablesByLocation(queryParams),
    {
      signal,
    },
  );
};

export default function useInfiniteGetTablesByLocationQuery(
  queryParams: GetTablesByLocationQueryParams,
  options?: UseInfiniteQueryOptions<
    GetTablesByLocationResponse,
    ApplicationError,
    GetTablesByLocationResponse,
    GetTablesByLocationResponse,
    QueryKey
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useInfiniteQuery<
    GetTablesByLocationResponse,
    ApplicationError,
    GetTablesByLocationResponse,
    [
      typeof QueryKeys.TABLE,
      "LIST",
      "INFINITE",
      "by-location",
      GetTablesByLocationQueryParams,
    ]
  >(
    [QueryKeys.TABLE, "LIST", "INFINITE", "by-location", queryParams],
    queryFn,
    optionsRef.current,
  );
}
