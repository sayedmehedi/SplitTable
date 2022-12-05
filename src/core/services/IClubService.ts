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
  GetSplitTablesByClubIdResponse,
  GetBookedTablesByClubIdQueryParams,
  GetBookedTablesByClubIdResponse,
  GetSplitTablesByClubIdQueryParams,
  GetBookingHistoryQueryParams,
  GetBookingHistoryResponse,
  GetUpcomingBookingQueryParams,
  GetUpcomingBookingResponse,
  GetOwnerTablesQueryParams,
  GetOwnerTablesResponse,
  CreateOwnerTableRequest,
  CreateOwnerTableResponse,
  UpdateOwnerTableRequest,
  UpdateOwnerTableResponse,
  DeleteOwnerTableRequest,
  DeleteOwnerTableResponse,
  ClubInfo,
  UpdateOwnerClubInfoRequest,
  UpdateOwnerClubInfoResponse,
  GetOwnerClubHolidaysResponse,
  CreateOwnerClubHolidayRequest,
  CreateOwnerClubHolidayResponse,
  DeleteOwnerClubHolidayRequest,
  DeleteOwnerClubHolidayResponse,
  GetOwnerClubHolidaysQueryParams,
  ConfirmBookingRequest,
  ConfirmBookingResponse,
  CancelBookingResponse,
  GetClubsBySearchTermQueryParams,
  GetClubsBySearchTermResponse,
  DeleteSliderImageRequest,
  DeleteSliderImageResponse,
  GetBookingDetailsResponse,
} from "@src/models";

export interface IClubService {
  getBookingDetails(
    bookingId: number,
  ): CancelablePromise<
    AxiosResponse<GetBookingDetailsResponse, GlobalAxiosRequestConfig>
  >;

  deleteClubSliderImage(
    data: DeleteSliderImageRequest,
  ): Promise<
    AxiosResponse<DeleteSliderImageResponse, GlobalAxiosRequestConfig>
  >;

  cancenBooking(
    payload: {bookingId: number} | {tableId: number},
  ): Promise<AxiosResponse<CancelBookingResponse, GlobalAxiosRequestConfig>>;

  getClubsBySearchTerm(
    params: GetClubsBySearchTermQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetClubsBySearchTermResponse, GlobalAxiosRequestConfig>
  >;

  getOwnerClubHolidays(
    params: GetOwnerClubHolidaysQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetOwnerClubHolidaysResponse, GlobalAxiosRequestConfig>
  >;

  createOwnerClubHoliday(
    data: CreateOwnerClubHolidayRequest,
  ): Promise<
    AxiosResponse<CreateOwnerClubHolidayResponse, GlobalAxiosRequestConfig>
  >;

  deleteOwnerClubHoliday(
    data: DeleteOwnerClubHolidayRequest,
  ): Promise<
    AxiosResponse<DeleteOwnerClubHolidayResponse, GlobalAxiosRequestConfig>
  >;

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

  getTablesByClubId(
    params: GetSplitTablesByClubIdQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetSplitTablesByClubIdResponse, GlobalAxiosRequestConfig>
  >;
  getTablesByClubId(
    params: GetBookedTablesByClubIdQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetBookedTablesByClubIdResponse, GlobalAxiosRequestConfig>
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

  confirmBooking(
    data: ConfirmBookingRequest,
  ): Promise<AxiosResponse<ConfirmBookingResponse, GlobalAxiosRequestConfig>>;

  getBookingHistory(
    params: GetBookingHistoryQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetBookingHistoryResponse, GlobalAxiosRequestConfig>
  >;

  getUpcomingBooking(
    params: GetUpcomingBookingQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetUpcomingBookingResponse, GlobalAxiosRequestConfig>
  >;

  getOwnerTables(
    params: GetOwnerTablesQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetOwnerTablesResponse, GlobalAxiosRequestConfig>
  >;

  createOwnerTable(
    data: CreateOwnerTableRequest,
  ): Promise<CreateOwnerTableResponse>;

  updateOwnerTable(
    data: UpdateOwnerTableRequest,
  ): Promise<UpdateOwnerTableResponse>;

  deleteOwnerTable(
    data: DeleteOwnerTableRequest,
  ): Promise<AxiosResponse<DeleteOwnerTableResponse, GlobalAxiosRequestConfig>>;

  getClubInfo(): CancelablePromise<
    AxiosResponse<ClubInfo, GlobalAxiosRequestConfig>
  >;

  updateOwnerClubInfo(
    data: UpdateOwnerClubInfoRequest,
  ): Promise<UpdateOwnerClubInfoResponse>;
}
