import {Axios, AxiosResponse} from "axios";
import {inject, injectable} from "inversify";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {IFrontendService} from "@core/services/IFrontendService";
import {
  GetLocationsReposne,
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

  getPopularClubs({
    signal,
    ...params
  }: {
    signal?: AbortSignal | undefined;
  }): Promise<AxiosResponse<GetPopularClubsReposne, GlobalAxiosRequestConfig>> {
    return this._httpService.get<GetPopularClubsReposne>("popular-clubs", {
      signal,
      params,
    });
  }

  getRecentViewedClubs({
    signal,
    ...params
  }: {
    signal?: AbortSignal | undefined;
  }): Promise<
    AxiosResponse<GetRecentViewedClubsReposne, GlobalAxiosRequestConfig>
  > {
    return this._httpService.get<GetRecentViewedClubsReposne>("recent-views", {
      signal,
      params,
    });
  }

  getNearByClubs({
    signal,
    ...params
  }: {
    signal?: AbortSignal | undefined;
  }): Promise<AxiosResponse<GetNearByClubsReposne, GlobalAxiosRequestConfig>> {
    return this._httpService.get<GetNearByClubsReposne>("nearby-clubs", {
      signal,
      params,
    });
  }

  getLocations({
    signal,
  }: {
    signal: AbortSignal;
  }): Promise<AxiosResponse<GetLocationsReposne, GlobalAxiosRequestConfig>> {
    return this._httpService.get<GetLocationsReposne>("home-locations", {
      signal,
    });
  }
}
