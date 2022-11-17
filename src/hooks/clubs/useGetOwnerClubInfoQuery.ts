import React from "react";
import {ClubInfo} from "@src/models";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  QueryFunction,
  useQuery,
  QueryFunctionContext,
  UseQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [typeof QueryKeys.CLUB, "INFO"];

const queryFn: QueryFunction<ClubInfo, QueryKey> = ({
  signal,
}: QueryFunctionContext<QueryKey>) => {
  return handleCancelableAxiosPromise(service.getClubInfo(), {
    signal,
  });
};

export default function useGetOwnerClubInfoQuery(
  options?: UseQueryOptions<ClubInfo, ApplicationError, ClubInfo, QueryKey>,
) {
  return useQuery<ClubInfo, ApplicationError, ClubInfo, QueryKey>(
    [QueryKeys.CLUB, "INFO"],
    queryFn,
    options,
  );
}
