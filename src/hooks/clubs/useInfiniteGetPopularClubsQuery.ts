import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GetPopularClubsReposne, GetPopularClubsQueryParams} from "@src/models";
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
  "popular",
  GetPopularClubsQueryParams,
];

const queryFn: QueryFunction<GetPopularClubsReposne, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetPopularClubsQueryParams>) => {
  const queryParams = {
    ...queryKey[4],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getPopularClubs(queryParams), {
    signal,
  });
};

export default function useInfiniteGetPopularClubsQuery(
  queryParams: GetPopularClubsQueryParams = {},
  options?: UseInfiniteQueryOptions<
    GetPopularClubsReposne,
    ApplicationError,
    GetPopularClubsReposne,
    GetPopularClubsReposne,
    QueryKey
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useInfiniteQuery<
    GetPopularClubsReposne,
    ApplicationError,
    GetPopularClubsReposne,
    QueryKey
  >(
    [QueryKeys.CLUB, "LIST", "infinite", "popular", queryParams],
    queryFn,
    optionsRef.current,
  );
}
