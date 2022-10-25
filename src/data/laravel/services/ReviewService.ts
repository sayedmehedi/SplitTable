import {Axios, AxiosResponse} from "axios";
import {inject, injectable} from "inversify";
import {CancelablePromise} from "cancelable-promise";
import {IReviewService} from "@core/services/IReviewService";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  GetClubReviewsResponse,
  GlobalAxiosRequestConfig,
  GetClubReviewsQueryParams,
} from "@src/models";

@injectable()
export class ReviewService implements IReviewService {
  @inject(ServiceProviderTypes.HttpClient)
  private readonly _httpService!: Axios;

  constructor() {}

  getClubReviews({
    ownerId,
    ...params
  }: GetClubReviewsQueryParams): CancelablePromise<
    AxiosResponse<GetClubReviewsResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetClubReviewsResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      const queryParams = params as any;

      if (ownerId !== undefined) {
        queryParams.owner_id = ownerId;
      }

      this._httpService
        .get<GetClubReviewsResponse>(`reviews`, {
          params: queryParams,
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }
}
