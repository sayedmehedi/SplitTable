import {AxiosResponse} from "axios";
import CancelablePromise from "cancelable-promise";
import {
  GetSplitTablesReponse,
  GetClubDetailsResponse,
  GetBookedTablesReponse,
  GlobalAxiosRequestConfig,
  ToggleFavoriteClubRequest,
  GetSplitTablesQueryParams,
  GetBookedTablesQueryParams,
  GetTablesByLocationResponse,
  ToggleFavoriteClubResponse,
  GetRecentViewsReponse,
  GetClubsBySearchTermResponse,
  GetTablesByLocationQueryParams,
  GetRecentViewsQueryParams,
  GetClubsBySearchTermQueryParams,
} from "@src/models";

export interface IClubService {
  getClubDetails(
    clubId: number,
  ): CancelablePromise<
    AxiosResponse<GetClubDetailsResponse, GlobalAxiosRequestConfig>
  >;

  getBookedTables(
    params: GetBookedTablesQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetBookedTablesReponse, GlobalAxiosRequestConfig>
  >;

  getRecentViews(
    params: GetRecentViewsQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetRecentViewsReponse, GlobalAxiosRequestConfig>
  >;

  getSplitTableNEvents(
    params: GetSplitTablesQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetSplitTablesReponse, GlobalAxiosRequestConfig>
  >;

  getTablesByLocation(
    params: GetTablesByLocationQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetTablesByLocationResponse, GlobalAxiosRequestConfig>
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
