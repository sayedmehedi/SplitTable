import {AxiosResponse} from "axios";
import CancelablePromise from "cancelable-promise";
import {
  AddClubReviewResponse,
  AddClubReviewRequest,
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

  addClubReview(
    data: AddClubReviewRequest,
  ): Promise<AxiosResponse<AddClubReviewResponse, GlobalAxiosRequestConfig>>;
}
