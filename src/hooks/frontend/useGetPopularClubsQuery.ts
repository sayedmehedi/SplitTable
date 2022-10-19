import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
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
> = async ({signal, queryKey}) => {
  const queryParams = queryKey[3];

  const params = {
    ...queryParams,
    signal,
  };
  const response = await service.getPopularClubs(params);

  return response.data;
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
