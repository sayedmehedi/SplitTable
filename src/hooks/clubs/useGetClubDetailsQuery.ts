import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {GetClubDetailsResponse} from "@src/models";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {QueryFunction, UseQueryOptions, useQuery} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [typeof QueryKeys.CLUB, "DETAILS", number];

const queryFn: QueryFunction<GetClubDetailsResponse, QueryKey> = ({
  signal,
  queryKey,
}) => {
  const clubId = queryKey[2];

  return handleCancelableAxiosPromise(service.getClubDetails(clubId), {
    signal,
  });
};

export default function useGetClubDetailsQuery(
  clubId: number,
  options?: UseQueryOptions<
    GetClubDetailsResponse,
    ApplicationError,
    GetClubDetailsResponse,
    QueryKey
  >,
) {
  return useQuery<
    GetClubDetailsResponse,
    ApplicationError,
    GetClubDetailsResponse,
    QueryKey
  >([QueryKeys.CLUB, "DETAILS", clubId], queryFn, options);
}
