import RNFetchBlob from "rn-fetch-blob";
import {Axios, AxiosResponse} from "axios";
import {inject, injectable} from "inversify";
import {StorageKeys} from "@constants/storage";
import CancelablePromise from "cancelable-promise";
import {ConfigService} from "@config/ConfigService";
import {IUserService} from "@core/services/IUserService";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AuthData,
  AddUserImageRequest,
  AddUserImageResponse,
  GetUserImagesResponse,
  UpdateProfilePayload,
  UpdateProfileResponse,
  DeleteUserImageRequest,
  GetUserImageQueryParams,
  GetTransactionsResponse,
  GlobalAxiosRequestConfig,
  DeleteUserImageResponse,
  GetFavoriteClubsResponse,
  ToggleUserImageLikeRequest,
  GetTransactionsQueryParams,
  ToggleUserImageLikeResponse,
  GetFavoriteClubsQueryParams,
  GetFaqsQueryParams,
  GetProfileDataResponse,
  GetFaqsResponse,
  SearchUserQueryParams,
  SearchUserResponse,
  SocialLinksPayloadFieldName,
  GetFriendListQueryParams,
  GetFriendListResponse,
  AcceptFriendshipRequest,
  AcceptFriendshipResponse,
  AddFriendshipRequest,
  AddFriendshipResponse,
  RemoveFriendshipRequest,
  RemoveFriendshipResponse,
  CheckFriendshipQueryParams,
  CheckFriendshipResponse,
} from "@src/models";
import {parseRnFetchBlobJsonResponse} from "@utils/http";

@injectable()
export class UserService implements IUserService {
  @inject(ServiceProviderTypes.HttpClient)
  private readonly _httpService!: Axios;

  @inject(ConfigService)
  private readonly _config!: ConfigService;

  constructor() {}

  checkFriendship(
    payload: CheckFriendshipQueryParams,
  ): CancelablePromise<
    AxiosResponse<CheckFriendshipResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<CheckFriendshipResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<CheckFriendshipResponse>(`check-friendship/${payload.friendId}`, {
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  addFriend(
    payload: AddFriendshipRequest,
  ): Promise<AxiosResponse<AddFriendshipResponse, GlobalAxiosRequestConfig>> {
    return this._httpService.post<AddFriendshipResponse>("friends", {
      friend_id: payload.friendId,
    });
  }

  acceptFriendship(
    payload: AcceptFriendshipRequest,
  ): Promise<
    AxiosResponse<AcceptFriendshipResponse, GlobalAxiosRequestConfig>
  > {
    return this._httpService.post<AcceptFriendshipResponse>("update-status", {
      friend_id: payload.friendId,
      status: payload.status,
    });
  }

  removeFriendship(
    payload: RemoveFriendshipRequest,
  ): Promise<
    AxiosResponse<RemoveFriendshipResponse, GlobalAxiosRequestConfig>
  > {
    return this._httpService.delete<RemoveFriendshipResponse>(
      `friends/${payload.friendId}`,
    );
  }

  getFriendList(
    params: GetFriendListQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetFriendListResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetFriendListResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetFriendListResponse>(`friends`, {
          params,
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  searchUser(
    params: SearchUserQueryParams,
  ): CancelablePromise<
    AxiosResponse<SearchUserResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<SearchUserResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<SearchUserResponse>(`search-user`, {
          params,
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getFaqs({
    userType,
    ...params
  }: GetFaqsQueryParams): CancelablePromise<
    AxiosResponse<GetFaqsResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetFaqsResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetFaqsResponse>(`active-faqs`, {
          params: {
            ...params,
            user_type: userType,
          },
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getFavorites(
    params: GetFavoriteClubsQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetFavoriteClubsResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetFavoriteClubsResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetFavoriteClubsResponse>(`favourites`, {
          params,
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getTransactions(
    params: GetTransactionsQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetTransactionsResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetTransactionsResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      let queryParams: Record<string, any> = {};

      if (!!params) {
        const {clubId, ...rest} = params;

        queryParams = {
          club_id: clubId,
          ...rest,
        };
      }

      this._httpService
        .get<GetTransactionsResponse>(`transactions`, {
          params: queryParams,
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  async updateProfile({
    onUploadProgress,
    ...data
  }: Partial<UpdateProfilePayload>): Promise<UpdateProfileResponse> {
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
        typeof payload !== "string" &&
        payload !== undefined
      ) {
        if ("name" in payload && "type" in payload && "uri" in payload) {
          acc.push({
            name: fieldName,
            type: payload.type,
            filename: payload.name,
            data: RNFetchBlob.wrap(payload.uri.replace("file://", "")),
          });
        }
      } else if (
        fieldName === "social_links" &&
        typeof payload !== "string" &&
        payload !== undefined &&
        !("name" in payload) &&
        !("type" in payload) &&
        !("uri" in payload)
      ) {
        const {facebook, instgram, linkendin, tiktok, twitter, youtube} =
          payload;

        acc.push({
          name: "social_links[facebook]",
          data: facebook,
        });

        acc.push({
          name: "social_links[instgram]",
          data: instgram,
        });

        acc.push({
          name: "social_links[linkendin]",
          data: linkendin,
        });

        acc.push({
          name: "social_links[tiktok]",
          data: tiktok,
        });

        acc.push({
          name: "social_links[twitter]",
          data: twitter,
        });

        acc.push({
          name: "social_links[youtube]",
          data: youtube,
        });
      } else if (typeof payload !== "object" && payload !== undefined) {
        acc.push({
          name: fieldName,
          data: payload ?? null,
        });
      }

      return acc;
    }, [] as {name: keyof typeof data | SocialLinksPayloadFieldName; type?: string; filename?: string; data: string | null}[]);

    const response = await RNFetchBlob.config({
      trusty: true,
      timeout: 5000,
    })
      .fetch(
        "POST",
        `${this._config.apiBaseURL}/update-profile`,

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

  toggleImageLike(
    data: ToggleUserImageLikeRequest,
  ): Promise<
    AxiosResponse<ToggleUserImageLikeResponse, GlobalAxiosRequestConfig>
  > {
    return this._httpService.post(`like-dislike`, {
      image_id: data.imageId,
      type: data.like ? 1 : 0,
    });
  }

  deleteImage(
    data: DeleteUserImageRequest,
  ): Promise<AxiosResponse<DeleteUserImageResponse, GlobalAxiosRequestConfig>> {
    return this._httpService.delete(`images/${data.imageId}`);
  }

  getImages(
    params?: GetUserImageQueryParams | undefined,
  ): CancelablePromise<
    AxiosResponse<GetUserImagesResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetUserImagesResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      let queryParams: Record<string, any> = {};

      if (!!params) {
        const {userId, ...rest} = params;

        queryParams = {
          user_id: userId,
          ...rest,
        };
      }

      this._httpService
        .get<GetUserImagesResponse>(`images`, {
          params: queryParams,
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }

  async addImage(data: AddUserImageRequest): Promise<AddUserImageResponse> {
    const authDataString = await AsyncStorage.getItem(StorageKeys.AUTH_DATA);
    if (!authDataString) {
      throw new Error("Unauthenticated");
    }
    const {token: authToken} = JSON.parse(authDataString) as AuthData;

    const response = await RNFetchBlob.config({
      trusty: true,
      timeout: 5000,
    })
      .fetch(
        "POST",
        `${this._config.apiBaseURL}/images`,

        {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
        [
          // element with property `filename` will be transformed into `file` in form data
          {
            name: "image",
            type: data.image.type,
            filename: data.image.name,
            data: RNFetchBlob.wrap(data.image.uri.replace("file://", "")),
          },
        ],
      )
      .uploadProgress({interval: 100}, (written, total) => {
        data.onUploadProgress?.(written, total);
      });

    const serverData = await parseRnFetchBlobJsonResponse(response);

    return serverData;
  }

  getProfile(userId?: number) {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetProfileDataResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetProfileDataResponse>(`profile`, {
          signal: controller.signal,
          params:
            userId !== undefined
              ? {
                  user_id: userId,
                }
              : undefined,
        })
        .then(resolve)
        .catch(reject);
    });
  }
}
