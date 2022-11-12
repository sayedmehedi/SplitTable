import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  GetClubsBySearchTermResponse,
  GetClubsBySearchTermQueryParams,
} from "@src/models";
import {
  QueryFunction,
  useInfiniteQuery,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [
  typeof QueryKeys.TABLE,
  "LIST",
  "infinite",
  "by-search",
  GetClubsBySearchTermQueryParams,
];

const queryFn: QueryFunction<GetClubsBySearchTermResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetClubsBySearchTermQueryParams>) => {
  const queryParams = {
    ...queryKey[4],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(
    service.getClubsBySearchTerm(queryParams),
    {
      signal,
    },
  );
};

export default function useInfiniteGetClubsBySearchTermQuery(
  queryParams: GetClubsBySearchTermQueryParams = {},
  options?: UseInfiniteQueryOptions<
    GetClubsBySearchTermResponse,
    ApplicationError,
    GetClubsBySearchTermResponse,
    GetClubsBySearchTermResponse,
    QueryKey
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useInfiniteQuery<
    GetClubsBySearchTermResponse,
    ApplicationError,
    GetClubsBySearchTermResponse,
    QueryKey
  >(
    [QueryKeys.TABLE, "LIST", "infinite", "by-search", queryParams],
    queryFn,
    optionsRef.current,
  );
}
