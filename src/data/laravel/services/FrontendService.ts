import {Axios, AxiosResponse} from "axios";
import {inject, injectable} from "inversify";
import {CancelablePromise} from "cancelable-promise";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {IFrontendService} from "@core/services/IFrontendService";
import {
  GetLocationsReposne,
  PaginationQueryParams,
  GetNearByClubsReposne,
  GetPopularClubsReposne,
  GlobalAxiosRequestConfig,
  GetRecentViewedClubsReposne,
} from "@src/models";

@injectable()
export class FrontendService implements IFrontendService {
  @inject(ServiceProviderTypes.HttpClient)
  private readonly _httpService!: Axios;

  constructor() {}

  getPopularClubs(
    params: PaginationQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetPopularClubsReposne, GlobalAxiosRequestConfig>
  > {
    return new CancelablePromise<
      AxiosResponse<GetPopularClubsReposne, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      const controller = new AbortController();

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
    return new CancelablePromise<
      AxiosResponse<GetRecentViewedClubsReposne, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      const controller = new AbortController();

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
    params: PaginationQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetNearByClubsReposne, GlobalAxiosRequestConfig>
  > {
    return new CancelablePromise<
      AxiosResponse<GetNearByClubsReposne, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      const controller = new AbortController();

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

  getLocations(): CancelablePromise<
    AxiosResponse<GetLocationsReposne, GlobalAxiosRequestConfig>
  > {
    return new CancelablePromise<
      AxiosResponse<GetLocationsReposne, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      const controller = new AbortController();

      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetLocationsReposne>("home-locations", {
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }
}
