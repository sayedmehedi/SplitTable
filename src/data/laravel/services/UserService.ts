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
  GetUserImagesResponse,
  GlobalAxiosRequestConfig,
  GetUserImageQueryParams,
  AddUserImageResponse,
} from "@src/models";

@injectable()
export class UserService implements IUserService {
  @inject(ServiceProviderTypes.HttpClient)
  private readonly _httpService!: Axios;

  @inject(ConfigService)
  private readonly _config!: ConfigService;

  constructor() {}

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

  addImage(data: AddUserImageRequest): CancelablePromise<AddUserImageResponse> {
    return new CancelablePromise<AddUserImageResponse>(
      (resolve, reject, onCancel) => {
        AsyncStorage.getItem(StorageKeys.AUTH_DATA)
          .then(authDataString => {
            if (!authDataString) {
              throw new Error("Unauthenticated");
            }

            return authDataString;
          })
          .then(authDataString => JSON.parse(authDataString) as AuthData)
          .then(({token: authToken}) => {
            const task = RNFetchBlob.config({
              trusty: true,
              timeout: 5000,
            }).fetch(
              "POST",
              `${this._config.apiBaseURL}/image-upload`,

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
            );

            onCancel(() => {
              task.cancel();
            });

            return task
              .uploadProgress((sent, total) => {
                data.onUploadProgress?.(sent, total);
              })
              .then(
                response => response.json() as Promise<AddUserImageResponse>,
              )
              .then(resolve)
              .catch(reject);
          })
          .catch(reject);
      },
    );
  }
}
