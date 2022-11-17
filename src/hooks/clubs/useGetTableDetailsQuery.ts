import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {GetTableDetailsResponse} from "@src/models";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {QueryFunction, UseQueryOptions, useQuery} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [typeof QueryKeys.TABLE, "DETAILS", number];

const queryFn: QueryFunction<GetTableDetailsResponse, QueryKey> = ({
  signal,
  queryKey,
}) => {
  const tableId = queryKey[2];

  return handleCancelableAxiosPromise(service.getTableDetails(tableId), {
    signal,
  });
};

export default function useGetTableDetailsQuery(
  tableId: number,
  options?: UseQueryOptions<
    GetTableDetailsResponse,
    ApplicationError,
    GetTableDetailsResponse,
    QueryKey
  >,
) {
  return useQuery<
    GetTableDetailsResponse,
    ApplicationError,
    GetTableDetailsResponse,
    QueryKey
  >([QueryKeys.TABLE, "DETAILS", tableId], queryFn, options);
}
