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
  BookTableRequest,
  BookTableResponse,
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

  getSplitTables(
    params: GetSplitTablesQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetSplitTablesReponse, GlobalAxiosRequestConfig>
  >;

  getJoinTables(
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

  bookTable(
    data: BookTableRequest,
  ): Promise<AxiosResponse<BookTableResponse, GlobalAxiosRequestConfig>>;
}
