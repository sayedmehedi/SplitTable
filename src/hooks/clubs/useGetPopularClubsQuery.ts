import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GetPopularClubsReposne, GetPopularClubsQueryParams} from "@src/models";
import {QueryFunction, UseQueryOptions, useQuery} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [
  typeof QueryKeys.CLUB,
  "LIST",
  "popular",
  GetPopularClubsQueryParams,
];

const queryFn: QueryFunction<GetPopularClubsReposne, QueryKey> = ({
  signal,
  queryKey,
}) => {
  const queryParams = queryKey[3];

  return handleCancelableAxiosPromise(service.getPopularClubs(queryParams), {
    signal,
  });
};

export default function useGetPopularClubsQuery(
  queryParams: GetPopularClubsQueryParams = {},
  options?: UseQueryOptions<
    GetPopularClubsReposne,
    ApplicationError,
    GetPopularClubsReposne,
    QueryKey
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
    QueryKey
  >(
    [QueryKeys.CLUB, "LIST", "popular", queryParams],
    queryFn,
    optionsRef.current,
  );
}
