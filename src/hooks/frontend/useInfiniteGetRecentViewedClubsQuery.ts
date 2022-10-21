import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  GetRecentViewedClubsReposne,
  GetRecentViewedClubsQueryParams,
} from "@src/models";
import {
  QueryFunction,
  useInfiniteQuery,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [
  typeof QueryKeys.CLUB,
  "LIST",
  "infinite",
  "recent-viewed",
  GetRecentViewedClubsQueryParams,
];

const queryFn: QueryFunction<GetRecentViewedClubsReposne, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetRecentViewedClubsQueryParams>) => {
  const queryParams = {
    ...queryKey[4],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(
    service.getRecentViewedClubs(queryParams),
    {
      signal,
    },
  );
};

export default function useInfiniteGetRecentViewedClubsQuery(
  queryParams: GetRecentViewedClubsQueryParams = {},
  options?: UseInfiniteQueryOptions<
    GetRecentViewedClubsReposne,
    ApplicationError,
    GetRecentViewedClubsReposne,
    GetRecentViewedClubsReposne,
    QueryKey
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useInfiniteQuery<
    GetRecentViewedClubsReposne,
    ApplicationError,
    GetRecentViewedClubsReposne,
    QueryKey
  >(
    [QueryKeys.CLUB, "LIST", "infinite", "recent-viewed", queryParams],
    queryFn,
    optionsRef.current,
  );
}
