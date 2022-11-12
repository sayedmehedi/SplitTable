import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {handleCancelableAxiosPromise} from "@utils/http";
import {IClubService} from "@core/services/IClubService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GetSplitTablesReponse, GetSplitTablesQueryParams} from "@src/models";
import {QueryFunction, UseQueryOptions, useQuery} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [
  typeof QueryKeys.TABLE,
  "LIST",
  "nearby",
  GetSplitTablesQueryParams,
];

const queryFn: QueryFunction<GetSplitTablesReponse, QueryKey> = ({
  signal,
  queryKey,
}) => {
  const queryParams = queryKey[3];

  return handleCancelableAxiosPromise(
    service.getSplitTableNEvents(queryParams),
    {
      signal,
    },
  );
};

export default function useGetSplitTablesQuery(
  queryParams: GetSplitTablesQueryParams = {},
  options?: UseQueryOptions<
    GetSplitTablesReponse,
    ApplicationError,
    GetSplitTablesReponse,
    QueryKey
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useQuery<
    GetSplitTablesReponse,
    ApplicationError,
    GetSplitTablesReponse,
    QueryKey
  >(
    [QueryKeys.TABLE, "LIST", "nearby", queryParams],
    queryFn,
    optionsRef.current,
  );
}
