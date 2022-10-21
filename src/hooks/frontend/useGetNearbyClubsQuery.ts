import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {IFrontendService} from "@core/services/IFrontendService";
import {GetNearByClubsReposne, PaginationQueryParams} from "@src/models";
import {QueryFunction, UseQueryOptions, useQuery} from "@tanstack/react-query";

const service = container.get<IFrontendService>(
  ServiceProviderTypes.FrontendService,
);

const queryFn: QueryFunction<
  GetNearByClubsReposne,
  [typeof QueryKeys.CLUB, "LIST", "nearby", PaginationQueryParams]
> = ({signal, queryKey}) => {
  const queryParams = queryKey[3];

  return handleCancelableAxiosPromise(service.getNearByClubs(queryParams), {
    signal,
  });
};

export default function useGetNearbyClubsQuery(
  queryParams: PaginationQueryParams = {},
  options?: UseQueryOptions<
    GetNearByClubsReposne,
    ApplicationError,
    GetNearByClubsReposne,
    [typeof QueryKeys.CLUB, "LIST", "nearby", PaginationQueryParams]
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useQuery<
    GetNearByClubsReposne,
    ApplicationError,
    GetNearByClubsReposne,
    [typeof QueryKeys.CLUB, "LIST", "nearby", PaginationQueryParams]
  >(
    [QueryKeys.CLUB, "LIST", "nearby", queryParams],
    queryFn,
    optionsRef.current,
  );
}
