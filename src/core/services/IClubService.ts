import {AxiosResponse} from "axios";
import CancelablePromise from "cancelable-promise";
import {
  GetNearByClubsReposne,
  GetPopularClubsReposne,
  GlobalAxiosRequestConfig,
  GetPopularClubsQueryParams,
  GetRecentViewedClubsReposne,
  GetNearByClubsQueryParams,
  GetClubsByLocationResponse,
  GetClubsByLocationQueryParams,
  GetRecentViewedClubsQueryParams,
  ToggleFavoriteClubResponse,
  ToggleFavoriteClubRequest,
} from "@src/models";

export interface IClubService {
  getPopularClubs(
    params: GetPopularClubsQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetPopularClubsReposne, GlobalAxiosRequestConfig>
  >;

  getRecentViewedClubs(
    params: GetRecentViewedClubsQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetRecentViewedClubsReposne, GlobalAxiosRequestConfig>
  >;

  getNearByClubs(
    params: GetNearByClubsQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetNearByClubsReposne, GlobalAxiosRequestConfig>
  >;

  getClubsByLocation(
    params: GetClubsByLocationQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetClubsByLocationResponse, GlobalAxiosRequestConfig>
  >;

  toggleFavoriteClub(
    params: ToggleFavoriteClubRequest,
  ): Promise<
    AxiosResponse<ToggleFavoriteClubResponse, GlobalAxiosRequestConfig>
  >;
}
