import {Container} from "inversify";
import axios, {AxiosInstance, AxiosResponse} from "axios";
import CancelablePromise from "cancelable-promise";
import {ConfigService} from "@config/ConfigService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GlobalAxiosRequestConfig} from "@src/models";

export default function registerHttpClient(container: Container) {
  container
    .bind<AxiosInstance>(ServiceProviderTypes.HttpClient)
    .toDynamicValue(context => {
      const config = context.container.get(ConfigService);
      const baseURL = config.apiBaseURL;

      const apiHttpClient = axios.create({
        baseURL,
        headers: {
          Accept: config.accept,
          "Content-Type": config.contentType,
        },
      });

      apiHttpClient.interceptors.response.use(
        function (response) {
          return response;
        },
        function (error) {
          const applicationError = new ApplicationError(error);
          return Promise.reject(applicationError);
        },
      );

      return apiHttpClient;
    })
    .inSingletonScope();
}

export function handleCancelableAxiosPromise<T>(
  promise: CancelablePromise<AxiosResponse<T, GlobalAxiosRequestConfig>>,
  {
    signal,
  }: {
    signal?: AbortSignal;
  },
) {
  signal?.addEventListener("abort", () => {
    promise.cancel();
  });

  return promise.then(res => res.data);
}
