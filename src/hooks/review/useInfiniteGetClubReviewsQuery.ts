import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IReviewService} from "@core/services/IReviewService";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GetClubReviewsResponse, GetClubReviewsQueryParams} from "@src/models";
import {
  QueryFunction,
  useInfiniteQuery,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const service = container.get<IReviewService>(
  ServiceProviderTypes.ReviewService,
);

type QueryKey = [
  typeof QueryKeys.REVIEW,
  "LIST",
  "infinite",
  GetClubReviewsQueryParams,
];

const queryFn: QueryFunction<GetClubReviewsResponse, QueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, GetClubReviewsQueryParams>) => {
  const queryParams = {
    ...queryKey[3],
    ...(pageParam ?? {}),
  };

  return handleCancelableAxiosPromise(service.getClubReviews(queryParams), {
    signal,
  });
};

export default function useInfiniteGetClubReviewsQuery(
  queryParams: GetClubReviewsQueryParams,
  options?: UseInfiniteQueryOptions<
    GetClubReviewsResponse,
    ApplicationError,
    GetClubReviewsResponse,
    GetClubReviewsResponse,
    QueryKey
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useInfiniteQuery<
    GetClubReviewsResponse,
    ApplicationError,
    GetClubReviewsResponse,
    QueryKey
  >(
    [QueryKeys.REVIEW, "LIST", "infinite", queryParams],
    queryFn,
    optionsRef.current,
  );
}
