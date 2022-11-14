import RNFetchBlob from "rn-fetch-blob";
import {Axios, AxiosError, AxiosResponse} from "axios";
import {inject, injectable} from "inversify";
import {StorageKeys} from "@constants/storage";
import {ConfigService} from "@config/ConfigService";
import {CancelablePromise} from "cancelable-promise";
import {IClubService} from "@core/services/IClubService";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AuthData,
  BookTableRequest,
  BookTableResponse,
  PaginationQueryParams,
  GetRecentViewsReponse,
  GetSplitTablesReponse,
  GetBookedTablesReponse,
  GetClubDetailsResponse,
  GetTableDetailsResponse,
  GlobalAxiosRequestConfig,
  GetSplitTablesQueryParams,
  ToggleFavoriteClubRequest,
  ToggleFavoriteClubResponse,
  GetBookedTablesQueryParams,
  GetTablesByLocationResponse,
  GetTablesBySearchTermResponse,
  GetTablesByLocationQueryParams,
  GetSplitTablesByClubIdResponse,
  GetTablesBySearchTermQueryParams,
  GetBookedTablesByClubIdResponse,
  GetBookedTablesByClubIdQueryParams,
  GetSplitTablesByClubIdQueryParams,
  GetBookingHistoryResponse,
  GetUpcomingBookingResponse,
  GetUpcomingBookingQueryParams,
  GetBookingHistoryQueryParams,
  GetOwnerTablesQueryParams,
  GetOwnerTablesResponse,
  CreateOwnerTableRequest,
  CreateOwnerTableResponse,
  UpdateOwnerTableRequest,
  UpdateOwnerTableResponse,
  ServerErrorType,
  DeleteOwnerTableRequest,
  DeleteOwnerTableResponse,
  ClubInfo,
} from "@src/models";
import {ApplicationError} from "@core/domain/ApplicationError";

@injectable()
export class ClubService implements IClubService {
  @inject(ServiceProviderTypes.HttpClient)
  private readonly _httpService!: Axios;

  @inject(ConfigService)
  private readonly _config!: ConfigService;

  constructor() {}

  getClubInfo(): CancelablePromise<
    AxiosResponse<ClubInfo, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<ClubInfo, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<ClubInfo>(`club`, {
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  deleteOwnerTable(
    data: DeleteOwnerTableRequest,
  ): Promise<
    AxiosResponse<DeleteOwnerTableResponse, GlobalAxiosRequestConfig>
  > {
    return this._httpService.delete<DeleteOwnerTableResponse>(
      `tables/${data.tableId}`,
    );
  }

  async updateOwnerTable({
    tableId,
    onUploadProgress,
    ...data
  }: UpdateOwnerTableRequest): Promise<UpdateOwnerTableResponse> {
    const authDataString = await AsyncStorage.getItem(StorageKeys.AUTH_DATA);

    if (!authDataString) {
      throw new Error("Unauthenticated");
    }

    const {token: authToken} = JSON.parse(authDataString) as AuthData;

    const formattedPayload = Object.entries(data).reduce((acc, curr) => {
      const [fieldName, payload] = curr as [
        keyof typeof data,
        typeof data[keyof typeof data],
      ];

      if (fieldName === "image" && typeof payload === "object" && !!payload) {
        if (!!payload.name && !!payload.uri && !!payload.type) {
          acc.push({
            name: fieldName,
            type: payload.type,
            filename: payload.name,
            data: RNFetchBlob.wrap(payload.uri.replace("file://", "")),
          });
        }
      } else if (typeof payload !== "object" && !!payload) {
        acc.push({
          name: fieldName,
          data: `${payload}`,
        });
      }

      return acc;
    }, [] as {name: keyof typeof data; type?: string; filename?: string; data: string}[]);

    const response = await RNFetchBlob.config({
      trusty: true,
      timeout: 5000,
    })
      .fetch(
        "POST",
        `${this._config.apiBaseURL}/tables/${tableId}`,

        {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
        formattedPayload,
      )
      .uploadProgress((sent, total) => {
        onUploadProgress?.(sent, total);
      });

    const serverData = response.json();

    if (response.respInfo.status >= 400) {
      const axiosError = new AxiosError<ServerErrorType>(
        "Rnfetchblob error",
        "Server Error",
        undefined,
        {
          data: serverData,
          status: response.respInfo.status,
          headers: response.respInfo.headers,
        },
      );

      throw new ApplicationError(axiosError);

      // throw {
      //   non_field_error: "Invalid data",
      //   field_errors: Object.entries(
      //     serverData.errors as Record<string, string[]>,
      //   ).reduce((acc, [field, messages]) => {
      //     acc[field] = messages[0];
      //     return acc;
      //   }, {} as Record<string, string>),
      // };
    }

    return serverData;
  }

  async createOwnerTable({
    onUploadProgress,
    ...data
  }: CreateOwnerTableRequest): Promise<CreateOwnerTableResponse> {
    const authDataString = await AsyncStorage.getItem(StorageKeys.AUTH_DATA);

    if (!authDataString) {
      throw new Error("Unauthenticated");
    }

    const {token: authToken} = JSON.parse(authDataString) as AuthData;

    const formattedPayload = Object.entries(data).reduce((acc, curr) => {
      const [fieldName, payload] = curr as [
        keyof typeof data,
        typeof data[keyof typeof data],
      ];

      if (fieldName === "image" && typeof payload === "object" && !!payload) {
        if (!!payload.name && !!payload.uri && !!payload.type) {
          acc.push({
            name: fieldName,
            type: payload.type,
            filename: payload.name,
            data: RNFetchBlob.wrap(payload.uri.replace("file://", "")),
          });
        }
      } else if (typeof payload !== "object" && !!payload) {
        acc.push({
          name: fieldName,
          data: `${payload}`,
        });
      }

      return acc;
    }, [] as {name: keyof typeof data; type?: string; filename?: string; data: string}[]);

    const response = await RNFetchBlob.config({
      trusty: true,
      timeout: 5000,
    })
      .fetch(
        "POST",
        `${this._config.apiBaseURL}/tables`,

        {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
        formattedPayload,
      )
      .uploadProgress((sent, total) => {
        onUploadProgress?.(sent, total);
      });

    const serverData = response.json();

    if (response.info().status === 422) {
      throw {
        non_field_error: "Invalid data",
        field_errors: Object.entries(
          serverData.errors as Record<string, string[]>,
        ).reduce((acc, [field, messages]) => {
          acc[field] = messages[0];
          return acc;
        }, {} as Record<string, string>),
      };
    }

    return serverData;
  }

  getOwnerTables({
    tableType,
    ...params
  }: GetOwnerTablesQueryParams): CancelablePromise<
    AxiosResponse<GetOwnerTablesResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetOwnerTablesResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetOwnerTablesResponse>(`tables`, {
          params: {
            ...params,
            table_type: tableType,
          },
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getBookingHistory({
    ownerId,
    clubId,
    ...params
  }: GetBookingHistoryQueryParams): CancelablePromise<
    AxiosResponse<GetBookingHistoryResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetBookingHistoryResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetBookingHistoryResponse>(`booking-history`, {
          params: {
            ...params,
            club_id: clubId,
            owner_id: ownerId,
          },
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getUpcomingBooking({
    ownerId,
    clubId,
    ...params
  }: GetUpcomingBookingQueryParams): CancelablePromise<
    AxiosResponse<GetUpcomingBookingResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetUpcomingBookingResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetUpcomingBookingResponse>(`upcoming-booking`, {
          params: {
            ...params,
            club_id: clubId,
            owner_id: ownerId,
          },
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

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
  getTablesByClubId({
    clubId,
    tableType,
    ...params
  }:
    | GetSplitTablesByClubIdQueryParams
    | GetBookedTablesByClubIdQueryParams): CancelablePromise<
    AxiosResponse<
      GetSplitTablesByClubIdResponse | GetBookedTablesByClubIdResponse,
      GlobalAxiosRequestConfig
    >
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<
        GetSplitTablesByClubIdResponse | GetBookedTablesByClubIdResponse,
        GlobalAxiosRequestConfig
      >
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetSplitTablesByClubIdResponse | GetBookedTablesByClubIdResponse>(
          `club-tables`,
          {
            signal: controller.signal,
            params: {
              ...params,
              club_id: clubId,
              table_type: tableType,
            },
          },
        )
        .then(resolve)
        .catch(reject);
    });
  }

  bookTable(
    data: BookTableRequest,
  ): Promise<AxiosResponse<BookTableResponse, GlobalAxiosRequestConfig>> {
    return this._httpService.post<BookTableResponse>("create-booking", {
      club_id: data.clubId,
      table_id: data.tableId,
      men_seat: data.menSeat,
      women_seat: data.womenSeat,
      menu_id: data.menuId,
      qty: data.qty,
      discount: data.discount,
      tax: data.tax,
      tip: data.tip,
    });
  }

  getTableDetails(
    tableId: number,
  ): CancelablePromise<
    AxiosResponse<GetTableDetailsResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetTableDetailsResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetTableDetailsResponse>(`table-details/${tableId}`, {
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

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

  getTablesBySearchTerm({
    locationId,
    tableType,
    clubId,
    date,
    distance,
    ...params
  }: GetTablesBySearchTermQueryParams): CancelablePromise<
    AxiosResponse<GetTablesBySearchTermResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetTablesBySearchTermResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      const realParams: any = {
        ...params,
      };

      if (locationId !== undefined) {
        realParams.location_id = locationId;
      }

      if (tableType !== undefined) {
        realParams.table_type = tableType;
      }

      if (clubId !== undefined) {
        realParams.club_id = clubId;
      }

      if (distance !== undefined) {
        realParams.distance = {
          min: distance[0],
          max: distance[0],
        };
      }

      if (date !== undefined) {
        realParams.date = date;
      }

      this._httpService
        .get<GetTablesBySearchTermResponse>(`search-tables`, {
          params: realParams,
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

  getSplitTables(
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

  getJoinTables(
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
        .get<GetSplitTablesReponse>("join-tables", {
          params,
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }
}
