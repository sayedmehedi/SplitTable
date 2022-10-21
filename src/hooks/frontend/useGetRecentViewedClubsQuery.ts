import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {IFrontendService} from "@core/services/IFrontendService";
import {GetRecentViewedClubsReposne, PaginationQueryParams} from "@src/models";
import {QueryFunction, UseQueryOptions, useQuery} from "@tanstack/react-query";

const service = container.get<IFrontendService>(
  ServiceProviderTypes.FrontendService,
);

const queryFn: QueryFunction<
  GetRecentViewedClubsReposne,
  [typeof QueryKeys.CLUB, "LIST", "recent-viewed", PaginationQueryParams]
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
  queryParams: PaginationQueryParams = {},
  options?: UseQueryOptions<
    GetRecentViewedClubsReposne,
    ApplicationError,
    GetRecentViewedClubsReposne,
    [typeof QueryKeys.CLUB, "LIST", "recent-viewed", PaginationQueryParams]
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
    [typeof QueryKeys.CLUB, "LIST", "recent-viewed", PaginationQueryParams]
  >(
    [QueryKeys.CLUB, "LIST", "recent-viewed", queryParams],
    queryFn,
    optionsRef.current,
  );
}
