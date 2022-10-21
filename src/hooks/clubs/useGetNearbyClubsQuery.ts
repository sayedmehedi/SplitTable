import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {handleCancelableAxiosPromise} from "@utils/http";
import {IClubService} from "@core/services/IClubService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GetNearByClubsReposne, GetNearByClubsQueryParams} from "@src/models";
import {QueryFunction, UseQueryOptions, useQuery} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [
  typeof QueryKeys.CLUB,
  "LIST",
  "nearby",
  GetNearByClubsQueryParams,
];

const queryFn: QueryFunction<GetNearByClubsReposne, QueryKey> = ({
  signal,
  queryKey,
}) => {
  const queryParams = queryKey[3];

  return handleCancelableAxiosPromise(service.getNearByClubs(queryParams), {
    signal,
  });
};

export default function useGetNearbyClubsQuery(
  queryParams: GetNearByClubsQueryParams = {},
  options?: UseQueryOptions<
    GetNearByClubsReposne,
    ApplicationError,
    GetNearByClubsReposne,
    QueryKey
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
    QueryKey
  >(
    [QueryKeys.CLUB, "LIST", "nearby", queryParams],
    queryFn,
    optionsRef.current,
  );
}
