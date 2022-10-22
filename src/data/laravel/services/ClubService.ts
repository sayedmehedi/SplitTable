import {Axios, AxiosResponse} from "axios";
import {inject, injectable} from "inversify";
import {CancelablePromise} from "cancelable-promise";
import {IClubService} from "@core/services/IClubService";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  PaginationQueryParams,
  GetNearByClubsReposne,
  GetPopularClubsReposne,
  GetClubDetailsResponse,
  GlobalAxiosRequestConfig,
  GetClubsByLocationResponse,
  GetNearByClubsQueryParams,
  ToggleFavoriteClubRequest,
  GetRecentViewedClubsReposne,
  ToggleFavoriteClubResponse,
  GetPopularClubsQueryParams,
  GetClubsByLocationQueryParams,
  GetClubsBySearchTermResponse,
  GetClubsBySearchTermQueryParams,
} from "@src/models";

@injectable()
export class ClubService implements IClubService {
  @inject(ServiceProviderTypes.HttpClient)
  private readonly _httpService!: Axios;

  constructor() {}

  getClubDetails(
    clubId: number,
  ): CancelablePromise<
    AxiosResponse<GetClubDetailsResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetClubDetailsResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetClubDetailsResponse>(`club-details/${clubId}`, {
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getClubsBySearchTerm(
    params: GetClubsBySearchTermQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetClubsBySearchTermResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetClubsBySearchTermResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetClubsBySearchTermResponse>(`search-clubs`, {
          params,
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  toggleFavoriteClub(
    params: ToggleFavoriteClubRequest,
  ): Promise<
    AxiosResponse<ToggleFavoriteClubResponse, GlobalAxiosRequestConfig>
  > {
    return this._httpService.post<ToggleFavoriteClubResponse>("favourites", {
      club_id: params.clubId,
    });
  }

  getClubsByLocation({
    locationId,
    ...params
  }: GetClubsByLocationQueryParams): CancelablePromise<
    AxiosResponse<GetClubsByLocationResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetClubsByLocationResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetClubsByLocationResponse>(`clubs-by-location/${locationId}`, {
          params,
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getPopularClubs(
    params: GetPopularClubsQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetPopularClubsReposne, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetPopularClubsReposne, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      return this._httpService
        .get<GetPopularClubsReposne>("popular-clubs", {
          params,
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getRecentViewedClubs(
    params: PaginationQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetRecentViewedClubsReposne, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetRecentViewedClubsReposne, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetRecentViewedClubsReposne>("recent-views", {
          params,
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getNearByClubs(
    params: GetNearByClubsQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetNearByClubsReposne, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetNearByClubsReposne, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetNearByClubsReposne>("nearby-clubs", {
          params,
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }
}
