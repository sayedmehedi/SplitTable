import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {handleCancelableAxiosPromise} from "@utils/http";
import {IClubService} from "@core/services/IClubService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  GetRecentViewedClubsReposne,
  GetRecentViewedClubsQueryParams,
} from "@src/models";
import {QueryFunction, UseQueryOptions, useQuery} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

const queryFn: QueryFunction<
  GetRecentViewedClubsReposne,
  [
    typeof QueryKeys.CLUB,
    "LIST",
    "recent-viewed",
    GetRecentViewedClubsQueryParams,
  ]
> = ({signal, queryKey}) => {
  const queryParams = queryKey[3];

  return handleCancelableAxiosPromise(
    service.getRecentViewedClubs(queryParams),
    {
      signal,
    },
  );
};

export default function useGetRecentViewedClubsQuery(
  queryParams: GetRecentViewedClubsQueryParams = {},
  options?: UseQueryOptions<
    GetRecentViewedClubsReposne,
    ApplicationError,
    GetRecentViewedClubsReposne,
    [
      typeof QueryKeys.CLUB,
      "LIST",
      "recent-viewed",
      GetRecentViewedClubsQueryParams,
    ]
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useQuery<
    GetRecentViewedClubsReposne,
    ApplicationError,
    GetRecentViewedClubsReposne,
    [
      typeof QueryKeys.CLUB,
      "LIST",
      "recent-viewed",
      GetRecentViewedClubsQueryParams,
    ]
  >(
    [QueryKeys.CLUB, "LIST", "recent-viewed", queryParams],
    queryFn,
    optionsRef.current,
  );
}
