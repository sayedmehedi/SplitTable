import {AxiosResponse} from "axios";
import {
  GetLocationsReposne,
  GetNearByClubsReposne,
  PaginationQueryParams,
  GetPopularClubsReposne,
  GlobalAxiosRequestConfig,
  GetRecentViewedClubsReposne,
} from "@src/models";

export interface IFrontendService {
  getLocations(params: {
    signal?: AbortSignal;
  }): Promise<AxiosResponse<GetLocationsReposne, GlobalAxiosRequestConfig>>;

  getPopularClubs(
    params: {
      signal?: AbortSignal;
    } & PaginationQueryParams,
  ): Promise<AxiosResponse<GetPopularClubsReposne, GlobalAxiosRequestConfig>>;

  getRecentViewedClubs(
    params: {
      signal?: AbortSignal;
    } & PaginationQueryParams,
  ): Promise<
    AxiosResponse<GetRecentViewedClubsReposne, GlobalAxiosRequestConfig>
  >;

  getNearByClubs(
    params: {
      signal?: AbortSignal;
    } & PaginationQueryParams,
  ): Promise<AxiosResponse<GetNearByClubsReposne, GlobalAxiosRequestConfig>>;
}
