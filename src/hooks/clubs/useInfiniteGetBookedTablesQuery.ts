import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GetBookedTablesReponse, GetBookedTablesQueryParams} from "@src/models";
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
  "booked",
  GetBookedTablesQueryParams,
];

const queryFn: QueryFunction<GetBookedTablesReponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetBookedTablesQueryParams>) => {
  const queryParams = {
    ...queryKey[4],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getBookedTables(queryParams), {
    signal,
  });
};

export default function useInfiniteGetBookedTablesQuery(
  queryParams: GetBookedTablesQueryParams = {},
  options?: UseInfiniteQueryOptions<
    GetBookedTablesReponse,
    ApplicationError,
    GetBookedTablesReponse,
    GetBookedTablesReponse,
    QueryKey
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useInfiniteQuery<
    GetBookedTablesReponse,
    ApplicationError,
    GetBookedTablesReponse,
    QueryKey
  >(
    [QueryKeys.TABLE, "LIST", "infinite", "booked", queryParams],
    queryFn,
    optionsRef.current,
  );
}
