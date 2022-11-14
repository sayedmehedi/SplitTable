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

export type ReviewListQueryKey = [
  typeof QueryKeys.REVIEW,
  "LIST",
  "infinite",
  GetClubReviewsQueryParams,
];

const queryFn: QueryFunction<GetClubReviewsResponse, ReviewListQueryKey> = ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<ReviewListQueryKey, GetClubReviewsQueryParams>) => {
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
    ReviewListQueryKey
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
    ReviewListQueryKey
  >(
    [QueryKeys.REVIEW, "LIST", "infinite", queryParams],
    queryFn,
    optionsRef.current,
  );
}
