import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  GetSplitTableNEventsReposne,
  GetSplitTableNEventsQueryParams,
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
  "near-by",
  GetSplitTableNEventsQueryParams,
];

const queryFn: QueryFunction<GetSplitTableNEventsReposne, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetSplitTableNEventsQueryParams>) => {
  const queryParams = {
    ...queryKey[4],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(
    service.getSplitTableNEvents(queryParams),
    {
      signal,
    },
  );
};

export default function useInfiniteGetNearByClubsQuery(
  queryParams: GetSplitTableNEventsQueryParams = {},
  options?: UseInfiniteQueryOptions<
    GetSplitTableNEventsReposne,
    ApplicationError,
    GetSplitTableNEventsReposne,
    GetSplitTableNEventsReposne,
    QueryKey
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useInfiniteQuery<
    GetSplitTableNEventsReposne,
    ApplicationError,
    GetSplitTableNEventsReposne,
    QueryKey
  >(
    [QueryKeys.CLUB, "LIST", "infinite", "near-by", queryParams],
    queryFn,
    optionsRef.current,
  );
}
