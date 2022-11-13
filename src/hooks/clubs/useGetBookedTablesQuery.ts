import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GetBookedTablesReponse, GetBookedTablesQueryParams} from "@src/models";
import {QueryFunction, UseQueryOptions, useQuery} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [
  typeof QueryKeys.TABLE,
  "LIST",
  "booked",
  GetBookedTablesQueryParams,
];

const queryFn: QueryFunction<GetBookedTablesReponse, QueryKey> = ({
  signal,
  queryKey,
}) => {
  const queryParams = queryKey[3];

  return handleCancelableAxiosPromise(service.getBookedTables(queryParams), {
    signal,
  });
};

export default function useGetBookedTablesQuery(
  queryParams: GetBookedTablesQueryParams = {},
  options?: UseQueryOptions<
    GetBookedTablesReponse,
    ApplicationError,
    GetBookedTablesReponse,
    QueryKey
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useQuery<
    GetBookedTablesReponse,
    ApplicationError,
    GetBookedTablesReponse,
    QueryKey
  >(
    [QueryKeys.TABLE, "LIST", "booked", queryParams],
    queryFn,
    optionsRef.current,
  );
}
