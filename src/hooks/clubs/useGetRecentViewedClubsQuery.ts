import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {handleCancelableAxiosPromise} from "@utils/http";
import {IClubService} from "@core/services/IClubService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GetRecentViewsReponse, GetRecentViewsQueryParams} from "@src/models";
import {QueryFunction, UseQueryOptions, useQuery} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

const queryFn: QueryFunction<
  GetRecentViewsReponse,
  [typeof QueryKeys.TABLE, "LIST", "recent-viewed", GetRecentViewsQueryParams]
> = ({signal, queryKey}) => {
  const queryParams = queryKey[3];

  return handleCancelableAxiosPromise(service.getRecentViews(queryParams), {
    signal,
  });
};

export default function useGetRecentViewsClubsQuery(
  queryParams: GetRecentViewsQueryParams = {},
  options?: UseQueryOptions<
    GetRecentViewsReponse,
    ApplicationError,
    GetRecentViewsReponse,
    [typeof QueryKeys.TABLE, "LIST", "recent-viewed", GetRecentViewsQueryParams]
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useQuery<
    GetRecentViewsReponse,
    ApplicationError,
    GetRecentViewsReponse,
    [typeof QueryKeys.TABLE, "LIST", "recent-viewed", GetRecentViewsQueryParams]
  >(
    [QueryKeys.TABLE, "LIST", "recent-viewed", queryParams],
    queryFn,
    optionsRef.current,
  );
}
