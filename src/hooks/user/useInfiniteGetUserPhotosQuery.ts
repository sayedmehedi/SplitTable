import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IUserService} from "@core/services/IUserService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {ApplicationError} from "@core/domain/ApplicationError";
import {GetUserImageQueryParams, GetUserImagesResponse} from "@src/models";
import {
  QueryFunction,
  useInfiniteQuery,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IUserService>(ServiceProviderTypes.UserService);

type QueryKey = [
  typeof QueryKeys.IMAGE,
  "LIST",
  "infinite",
  GetUserImageQueryParams,
];

const queryFn: QueryFunction<GetUserImagesResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetUserImageQueryParams>) => {
  const queryParams = {
    ...queryKey[3],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getImages(queryParams), {
    signal,
  });
};

function useInfiniteGetUserPhotosQuery(
  queryParams: GetUserImageQueryParams,
  options?: UseInfiniteQueryOptions<
    GetUserImagesResponse,
    ApplicationError,
    GetUserImagesResponse,
    GetUserImagesResponse,
    QueryKey
  >,
) {
  return useInfiniteQuery<
    GetUserImagesResponse,
    ApplicationError,
    GetUserImagesResponse,
    QueryKey
  >([QueryKeys.IMAGE, "LIST", "infinite", queryParams], queryFn, options);
}

export default useInfiniteGetUserPhotosQuery;
