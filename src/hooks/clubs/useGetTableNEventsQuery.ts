import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GetTableNEventsReposne, GetTableNEventsQueryParams} from "@src/models";
import {QueryFunction, UseQueryOptions, useQuery} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [
  typeof QueryKeys.CLUB,
  "LIST",
  "popular",
  GetTableNEventsQueryParams,
];

const queryFn: QueryFunction<GetTableNEventsReposne, QueryKey> = ({
  signal,
  queryKey,
}) => {
  const queryParams = queryKey[3];

  return handleCancelableAxiosPromise(service.getTableNEvents(queryParams), {
    signal,
  });
};

export default function useGetTableNEventsQuery(
  queryParams: GetTableNEventsQueryParams = {},
  options?: UseQueryOptions<
    GetTableNEventsReposne,
    ApplicationError,
    GetTableNEventsReposne,
    QueryKey
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useQuery<
    GetTableNEventsReposne,
    ApplicationError,
    GetTableNEventsReposne,
    QueryKey
  >(
    [QueryKeys.CLUB, "LIST", "popular", queryParams],
    queryFn,
    optionsRef.current,
  );
}
