import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GetNearByClubsReposne, GetNearByClubsQueryParams} from "@src/models";
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
  "near-by",
  GetNearByClubsQueryParams,
];

const queryFn: QueryFunction<GetNearByClubsReposne, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetNearByClubsQueryParams>) => {
  const queryParams = {
    ...queryKey[4],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getNearByClubs(queryParams), {
    signal,
  });
};

export default function useInfiniteGetNearByClubsQuery(
  queryParams: GetNearByClubsQueryParams = {},
  options?: UseInfiniteQueryOptions<
    GetNearByClubsReposne,
    ApplicationError,
    GetNearByClubsReposne,
    GetNearByClubsReposne,
    QueryKey
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useInfiniteQuery<
    GetNearByClubsReposne,
    ApplicationError,
    GetNearByClubsReposne,
    QueryKey
  >(
    [QueryKeys.CLUB, "LIST", "infinite", "near-by", queryParams],
    queryFn,
    optionsRef.current,
  );
}
