import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  GetTablesByLocationResponse,
  GetTablesByLocationQueryParams,
} from "@src/models";
import {QueryFunction, UseQueryOptions, useQuery} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [
  typeof QueryKeys.TABLE,
  "LIST",
  "by-location",
  GetTablesByLocationQueryParams,
];

const queryFn: QueryFunction<GetTablesByLocationResponse, QueryKey> = ({
  signal,
  queryKey,
}) => {
  const queryParams = queryKey[3];

  return handleCancelableAxiosPromise(
    service.getTablesByLocation(queryParams),
    {
      signal,
    },
  );
};

export default function useGetClubsByLocationQuery(
  queryParams: GetTablesByLocationQueryParams,
  options?: UseQueryOptions<
    GetTablesByLocationResponse,
    ApplicationError,
    GetTablesByLocationResponse,
    QueryKey
  >,
) {
  return useQuery<
    GetTablesByLocationResponse,
    ApplicationError,
    GetTablesByLocationResponse,
    QueryKey
  >([QueryKeys.TABLE, "LIST", "by-location", queryParams], queryFn, options);
}
