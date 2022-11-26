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
  useQuery,
  QueryFunctionContext,
  UseQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [
  typeof QueryKeys.CLUB,
  "LIST",
  "by-search",
  GetClubsBySearchTermQueryParams,
];

const queryFn: QueryFunction<GetClubsBySearchTermResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetClubsBySearchTermQueryParams>) => {
  const queryParams = {
    ...queryKey[3],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(
    service.getClubsBySearchTerm(queryParams),
    {
      signal,
    },
  );
};

export default function useGetClubsBySearchTermQuery(
  queryParams: GetClubsBySearchTermQueryParams = {},
  options?: UseQueryOptions<
    GetClubsBySearchTermResponse,
    ApplicationError,
    GetClubsBySearchTermResponse,
    QueryKey
  >,
) {
  return useQuery<
    GetClubsBySearchTermResponse,
    ApplicationError,
    GetClubsBySearchTermResponse,
    QueryKey
  >([QueryKeys.CLUB, "LIST", "by-search", queryParams], queryFn, options);
}
