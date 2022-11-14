import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IMenuService} from "@core/services/IMenuService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GetClubMenusResponse, GetClubMenusQueryParams} from "@src/models";
import {
  QueryFunction,
  useQuery,
  QueryFunctionContext,
  UseQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IMenuService>(ServiceProviderTypes.MenuService);

type QueryKey = [
  typeof QueryKeys.MENU,
  "LIST",

  "by-club-id",
  GetClubMenusQueryParams,
];

const queryFn: QueryFunction<GetClubMenusResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetClubMenusQueryParams>) => {
  const queryParams = {
    ...queryKey[3],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getClubMenus(queryParams), {
    signal,
  });
};

export default function useGetClubMenusQuery(
  queryParams: GetClubMenusQueryParams,
  options?: UseQueryOptions<
    GetClubMenusResponse,
    ApplicationError,
    GetClubMenusResponse,
    QueryKey
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useQuery<
    GetClubMenusResponse,
    ApplicationError,
    GetClubMenusResponse,
    QueryKey
  >(
    [QueryKeys.MENU, "LIST", "by-club-id", queryParams],
    queryFn,
    optionsRef.current,
  );
}
