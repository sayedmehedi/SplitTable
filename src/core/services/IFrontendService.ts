import {AxiosResponse} from "axios";
import {
  GetLocationsReposne,
  GetNearByClubsReposne,
  PaginationQueryParams,
  GetPopularClubsReposne,
  GlobalAxiosRequestConfig,
  GetRecentViewedClubsReposne,
} from "@src/models";
import CancelablePromise from "cancelable-promise";

export interface IFrontendService {
  getLocations(): CancelablePromise<
    AxiosResponse<GetLocationsReposne, GlobalAxiosRequestConfig>
  >;

  getPopularClubs(
    params: PaginationQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetPopularClubsReposne, GlobalAxiosRequestConfig>
  >;

  getRecentViewedClubs(
    params: PaginationQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetRecentViewedClubsReposne, GlobalAxiosRequestConfig>
  >;

  getNearByClubs(
    params: PaginationQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetNearByClubsReposne, GlobalAxiosRequestConfig>
  >;
}
