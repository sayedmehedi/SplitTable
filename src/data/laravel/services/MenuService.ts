import RNFetchBlob from "rn-fetch-blob";
import {inject, injectable} from "inversify";
import {StorageKeys} from "@constants/storage";
import {ConfigService} from "@config/ConfigService";
import {CancelablePromise} from "cancelable-promise";
import {Axios, AxiosError, AxiosResponse} from "axios";
import {IMenuService} from "@core/services/IMenuService";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GetClubMenusResponse,
  GlobalAxiosRequestConfig,
  GetClubMenusQueryParams,
  GetOwnerClubMenusResponse,
  PaginationQueryParams,
  CreateOwnerClubMenuRequest,
  CreateOwnerClubMenuResponse,
  AuthData,
  UpdateOwnerClubMenuRequest,
  UpdateOwnerClubMenuResponse,
  DeleteOwnerClubMenuRequest,
  DeleteOwnerClubMenuResponse,
} from "@src/models";
import {parseRnFetchBlobJsonResponse} from "@utils/http";

@injectable()
export class MenuService implements IMenuService {
  @inject(ServiceProviderTypes.HttpClient)
  private readonly _httpService!: Axios;

  @inject(ConfigService)
  private readonly _config!: ConfigService;

  constructor() {}

  deleteOwnerClubMenu(
    data: DeleteOwnerClubMenuRequest,
  ): Promise<
    AxiosResponse<DeleteOwnerClubMenuResponse, GlobalAxiosRequestConfig>
  > {
    return this._httpService.delete<DeleteOwnerClubMenuResponse>(
      `menus/${data.menuId}`,
    );
  }

  async updateOwnerClubMenu({
    onUploadProgress,
    menuId,
    ...data
  }: UpdateOwnerClubMenuRequest): Promise<UpdateOwnerClubMenuResponse> {
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

      if (fieldName === "image" && typeof payload === "object" && payload) {
        if (!!payload.uri && !!payload.name && !!payload.type) {
          acc.push({
            name: fieldName,
            type: payload.type,
            filename: payload.name,
            data: RNFetchBlob.wrap(payload.uri.replace("file://", "")),
          });
        }
      } else {
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
        `${this._config.apiBaseURL}/menus/${menuId}`,

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

    const serverData = await parseRnFetchBlobJsonResponse(response);
    return serverData;
  }

  async createOwnerClubMenu({
    onUploadProgress,
    ...data
  }: CreateOwnerClubMenuRequest): Promise<CreateOwnerClubMenuResponse> {
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

      if (
        fieldName === "image" &&
        typeof payload === "object" &&
        payload !== undefined
      ) {
        if (!!payload.uri && !!payload.name && !!payload.type) {
          acc.push({
            name: fieldName,
            type: payload.type,
            filename: payload.name,
            data: RNFetchBlob.wrap(payload.uri.replace("file://", "")),
          });
        }
      } else if (typeof payload !== "object" && payload !== undefined) {
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
        `${this._config.apiBaseURL}/menus`,

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

    const serverData = await parseRnFetchBlobJsonResponse(response);
    return serverData;
  }

  getOwnerClubMenus(
    params: PaginationQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetOwnerClubMenusResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetOwnerClubMenusResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetOwnerClubMenusResponse>(`menus`, {
          params,
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getClubMenus({
    clubId,
    ...params
  }: GetClubMenusQueryParams): CancelablePromise<
    AxiosResponse<GetClubMenusResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetClubMenusResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetClubMenusResponse>(`club-menus/${clubId}`, {
          params,
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }
}
