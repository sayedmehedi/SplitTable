import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {handleCancelableAxiosPromise} from "@utils/http";
import {IClubService} from "@core/services/IClubService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  GetSplitTableNEventsReposne,
  GetSplitTableNEventsQueryParams,
} from "@src/models";
import {QueryFunction, UseQueryOptions, useQuery} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [
  typeof QueryKeys.CLUB,
  "LIST",
  "nearby",
  GetSplitTableNEventsQueryParams,
];

const queryFn: QueryFunction<GetSplitTableNEventsReposne, QueryKey> = ({
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

export default function useGetSplitTableNEventsQuery(
  queryParams: GetSplitTableNEventsQueryParams = {},
  options?: UseQueryOptions<
    GetSplitTableNEventsReposne,
    ApplicationError,
    GetSplitTableNEventsReposne,
    QueryKey
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useQuery<
    GetSplitTableNEventsReposne,
    ApplicationError,
    GetSplitTableNEventsReposne,
    QueryKey
  >(
    [QueryKeys.CLUB, "LIST", "nearby", queryParams],
    queryFn,
    optionsRef.current,
  );
}
