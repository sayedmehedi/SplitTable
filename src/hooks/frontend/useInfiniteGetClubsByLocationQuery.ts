import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  GetClubsByLocationResponse,
  GetClubsByLocationQueryParams,
} from "@src/models";
import {
  QueryFunction,
  QueryFunctionContext,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [
  typeof QueryKeys.CLUB,
  "LIST",
  "INFINITE",
  "by-location",
  GetClubsByLocationQueryParams,
];

const queryFn: QueryFunction<GetClubsByLocationResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetClubsByLocationQueryParams>) => {
  const queryParams = {
    ...queryKey[4],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getClubsByLocation(queryParams), {
    signal,
  });
};

export default function useInfiniteGetClubsByLocationQuery(
  queryParams: GetClubsByLocationQueryParams,
  options?: UseInfiniteQueryOptions<
    GetClubsByLocationResponse,
    ApplicationError,
    GetClubsByLocationResponse,
    GetClubsByLocationResponse,
    QueryKey
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useInfiniteQuery<
    GetClubsByLocationResponse,
    ApplicationError,
    GetClubsByLocationResponse,
    [
      typeof QueryKeys.CLUB,
      "LIST",
      "INFINITE",
      "by-location",
      GetClubsByLocationQueryParams,
    ]
  >(
    [QueryKeys.CLUB, "LIST", "INFINITE", "by-location", queryParams],
    queryFn,
    optionsRef.current,
  );
}
