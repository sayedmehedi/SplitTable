import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {IFrontendService} from "@core/services/IFrontendService";
import {GetPopularClubsReposne, PaginationQueryParams} from "@src/models";
import {QueryFunction, UseQueryOptions, useQuery} from "@tanstack/react-query";

const service = container.get<IFrontendService>(
  ServiceProviderTypes.FrontendService,
);

const queryFn: QueryFunction<
  GetPopularClubsReposne,
  [typeof QueryKeys.CLUB, "LIST", "popular", PaginationQueryParams]
> = ({signal, queryKey}) => {
  const queryParams = queryKey[3];

  return handleCancelableAxiosPromise(service.getPopularClubs(queryParams), {
    signal,
  });
};

export default function useGetPopularClubsQuery(
  queryParams: PaginationQueryParams = {},
  options?: UseQueryOptions<
    GetPopularClubsReposne,
    ApplicationError,
    GetPopularClubsReposne,
    [typeof QueryKeys.CLUB, "LIST", "popular", PaginationQueryParams]
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useQuery<
    GetPopularClubsReposne,
    ApplicationError,
    GetPopularClubsReposne,
    [typeof QueryKeys.CLUB, "LIST", "popular", PaginationQueryParams]
  >(
    [QueryKeys.CLUB, "LIST", "popular", queryParams],
    queryFn,
    optionsRef.current,
  );
}
