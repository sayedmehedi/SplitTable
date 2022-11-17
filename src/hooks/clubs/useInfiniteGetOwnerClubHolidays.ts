import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  GetOwnerClubHolidaysResponse,
  GetOwnerClubHolidaysQueryParams,
} from "@src/models";
import {
  QueryFunction,
  useInfiniteQuery,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

type QueryKey = [
  typeof QueryKeys.HOLIDAY,
  "LIST",
  "infinite",
  GetOwnerClubHolidaysQueryParams,
];

const queryFn: QueryFunction<GetOwnerClubHolidaysResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetOwnerClubHolidaysQueryParams>) => {
  const queryParams = {
    ...queryKey[3],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(
    service.getOwnerClubHolidays(queryParams),
    {
      signal,
    },
  );
};

export default function useInfiniteGetOwnerClubHolidays(
  queryParams: GetOwnerClubHolidaysQueryParams,
  options?: UseInfiniteQueryOptions<
    GetOwnerClubHolidaysResponse,
    ApplicationError,
    GetOwnerClubHolidaysResponse,
    GetOwnerClubHolidaysResponse,
    QueryKey
  >,
) {
  return useInfiniteQuery<
    GetOwnerClubHolidaysResponse,
    ApplicationError,
    GetOwnerClubHolidaysResponse,
    QueryKey
  >([QueryKeys.HOLIDAY, "LIST", "infinite", queryParams], queryFn, options);
}
