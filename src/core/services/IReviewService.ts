import {AxiosResponse} from "axios";
import CancelablePromise from "cancelable-promise";
import {
  GetClubReviewsResponse,
  GlobalAxiosRequestConfig,
  GetClubReviewsQueryParams,
} from "@src/models";

export interface IReviewService {
  getClubReviews(
    params: GetClubReviewsQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetClubReviewsResponse, GlobalAxiosRequestConfig>
  >;
}
