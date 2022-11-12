import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GetTableNEventsReposne, GetTableNEventsQueryParams} from "@src/models";
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
  GetTableNEventsQueryParams,
];

const queryFn: QueryFunction<GetTableNEventsReposne, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetTableNEventsQueryParams>) => {
  const queryParams = {
    ...queryKey[4],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getTableNEvents(queryParams), {
    signal,
  });
};

export default function useInfiniteGetPopularClubsQuery(
  queryParams: GetTableNEventsQueryParams = {},
  options?: UseInfiniteQueryOptions<
    GetTableNEventsReposne,
    ApplicationError,
    GetTableNEventsReposne,
    GetTableNEventsReposne,
    QueryKey
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useInfiniteQuery<
    GetTableNEventsReposne,
    ApplicationError,
    GetTableNEventsReposne,
    QueryKey
  >(
    [QueryKeys.CLUB, "LIST", "infinite", "popular", queryParams],
    queryFn,
    optionsRef.current,
  );
}
