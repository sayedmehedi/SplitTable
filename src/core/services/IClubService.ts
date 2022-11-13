import {AxiosResponse} from "axios";
import CancelablePromise from "cancelable-promise";
import {
  GetSplitTablesReponse,
  GetRecentViewsReponse,
  GetClubDetailsResponse,
  GetBookedTablesReponse,
  GlobalAxiosRequestConfig,
  ToggleFavoriteClubRequest,
  GetSplitTablesQueryParams,
  GetBookedTablesQueryParams,
  GetTablesByLocationResponse,
  ToggleFavoriteClubResponse,
  GetTableDetailsResponse,
  GetRecentViewsQueryParams,
  GetTablesBySearchTermResponse,
  GetTablesByLocationQueryParams,
  GetTablesBySearchTermQueryParams,
} from "@src/models";

export interface IClubService {
  getClubDetails(
    clubId: number,
  ): CancelablePromise<
    AxiosResponse<GetClubDetailsResponse, GlobalAxiosRequestConfig>
  >;

  getTableDetails(
    tableId: number,
  ): CancelablePromise<
    AxiosResponse<GetTableDetailsResponse, GlobalAxiosRequestConfig>
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

  getTablesBySearchTerm(
    params: GetTablesBySearchTermQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetTablesBySearchTermResponse, GlobalAxiosRequestConfig>
  >;

  toggleFavoriteClub(
    params: ToggleFavoriteClubRequest,
  ): Promise<
    AxiosResponse<ToggleFavoriteClubResponse, GlobalAxiosRequestConfig>
  >;
}
