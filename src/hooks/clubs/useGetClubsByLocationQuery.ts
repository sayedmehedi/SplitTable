import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  GetClubsByLocationResponse,
  GetClubsByLocationQueryParams,
} from "@src/models";
import {QueryFunction, UseQueryOptions, useQuery} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [
  typeof QueryKeys.CLUB,
  "LIST",
  "by-location",
  GetClubsByLocationQueryParams,
];

const queryFn: QueryFunction<GetClubsByLocationResponse, QueryKey> = ({
  signal,
  queryKey,
}) => {
  const queryParams = queryKey[3];

  return handleCancelableAxiosPromise(service.getClubsByLocation(queryParams), {
    signal,
  });
};

export default function useGetClubsByLocationQuery(
  queryParams: GetClubsByLocationQueryParams,
  options?: UseQueryOptions<
    GetClubsByLocationResponse,
    ApplicationError,
    GetClubsByLocationResponse,
    QueryKey
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useQuery<
    GetClubsByLocationResponse,
    ApplicationError,
    GetClubsByLocationResponse,
    QueryKey
  >(
    [QueryKeys.CLUB, "LIST", "by-location", queryParams],
    queryFn,
    optionsRef.current,
  );
}
