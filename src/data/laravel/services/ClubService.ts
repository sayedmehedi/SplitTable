import {Axios, AxiosResponse} from "axios";
import {inject, injectable} from "inversify";
import {CancelablePromise} from "cancelable-promise";
import {IClubService} from "@core/services/IClubService";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  PaginationQueryParams,
  GetSplitTablesReponse,
  GetBookedTablesReponse,
  GetClubDetailsResponse,
  GlobalAxiosRequestConfig,
  GetTablesByLocationResponse,
  GetSplitTablesQueryParams,
  ToggleFavoriteClubRequest,
  GetRecentViewsReponse,
  ToggleFavoriteClubResponse,
  GetBookedTablesQueryParams,
  GetTablesByLocationQueryParams,
  GetClubsBySearchTermResponse,
  GetClubsBySearchTermQueryParams,
} from "@src/models";

@injectable()
export class ClubService implements IClubService {
  @inject(ServiceProviderTypes.HttpClient)
  private readonly _httpService!: Axios;

  constructor() {}

  getClubDetails(
    clubId: number,
  ): CancelablePromise<
    AxiosResponse<GetClubDetailsResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetClubDetailsResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetClubDetailsResponse>(`club-details/${clubId}`, {
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getClubsBySearchTerm(
    params: GetClubsBySearchTermQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetClubsBySearchTermResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetClubsBySearchTermResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetClubsBySearchTermResponse>(`search-clubs`, {
          params,
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  toggleFavoriteClub(
    params: ToggleFavoriteClubRequest,
  ): Promise<
    AxiosResponse<ToggleFavoriteClubResponse, GlobalAxiosRequestConfig>
  > {
    return this._httpService.post<ToggleFavoriteClubResponse>("favourites", {
      club_id: params.clubId,
    });
  }

  getTablesByLocation({
    locationId,
    tableType,
    ...params
  }: GetTablesByLocationQueryParams): CancelablePromise<
    AxiosResponse<GetTablesByLocationResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetTablesByLocationResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetTablesByLocationResponse>(`table-by-location`, {
          params: {
            ...params,
            location_id: locationId,
            table_type: tableType,
          },
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getBookedTables(
    params: GetBookedTablesQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetBookedTablesReponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetBookedTablesReponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      return this._httpService
        .get<GetBookedTablesReponse>("booked-tables", {
          params,
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getRecentViews(
    params: PaginationQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetRecentViewsReponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetRecentViewsReponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetRecentViewsReponse>("recent-views", {
          params,
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getSplitTableNEvents(
    params: GetSplitTablesQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetSplitTablesReponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetSplitTablesReponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetSplitTablesReponse>("split-tables", {
          params,
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }
}
