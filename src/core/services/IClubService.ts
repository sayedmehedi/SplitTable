import {AxiosResponse} from "axios";
import CancelablePromise from "cancelable-promise";
import {
  GetSplitTableNEventsReposne,
  GetClubDetailsResponse,
  GetTableNEventsReposne,
  GlobalAxiosRequestConfig,
  ToggleFavoriteClubRequest,
  GetSplitTableNEventsQueryParams,
  GetTableNEventsQueryParams,
  GetClubsByLocationResponse,
  ToggleFavoriteClubResponse,
  GetRecentViewedClubsReposne,
  GetClubsBySearchTermResponse,
  GetClubsByLocationQueryParams,
  GetRecentViewedClubsQueryParams,
  GetClubsBySearchTermQueryParams,
} from "@src/models";

export interface IClubService {
  getClubDetails(
    clubId: number,
  ): CancelablePromise<
    AxiosResponse<GetClubDetailsResponse, GlobalAxiosRequestConfig>
  >;

  getTableNEvents(
    params: GetTableNEventsQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetTableNEventsReposne, GlobalAxiosRequestConfig>
  >;

  getRecentViewedClubs(
    params: GetRecentViewedClubsQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetRecentViewedClubsReposne, GlobalAxiosRequestConfig>
  >;

  getSplitTableNEvents(
    params: GetSplitTableNEventsQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetSplitTableNEventsReposne, GlobalAxiosRequestConfig>
  >;

  getClubsByLocation(
    params: GetClubsByLocationQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetClubsByLocationResponse, GlobalAxiosRequestConfig>
  >;

  getClubsBySearchTerm(
    params: GetClubsBySearchTermQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetClubsBySearchTermResponse, GlobalAxiosRequestConfig>
  >;

  toggleFavoriteClub(
    params: ToggleFavoriteClubRequest,
  ): Promise<
    AxiosResponse<ToggleFavoriteClubResponse, GlobalAxiosRequestConfig>
  >;
}
