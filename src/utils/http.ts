import {Container} from "inversify";
import {FetchBlobResponse} from "rn-fetch-blob";
import CancelablePromise from "cancelable-promise";
import {ConfigService} from "@config/ConfigService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {GlobalAxiosRequestConfig, ServerErrorType} from "@src/models";

export default function registerHttpClient(container: Container) {
  container
    .bind<AxiosInstance>(ServiceProviderTypes.HttpClient)
    .toDynamicValue(context => {
      const config = context.container.get(ConfigService);
      const baseURL = config.apiBaseURL;

      const apiHttpClient = axios.create({
        baseURL,
      });

      apiHttpClient.defaults.headers.common["Accept"] = config.accept;
      apiHttpClient.defaults.headers.common["Content-Type"] =
        config.contentType;
      apiHttpClient.defaults.headers.common["X-Requested-With"] =
        "XMLHttpRequest";

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
    console.log("cancelling query");
    promise.cancel();
  });

  return promise.then(res => res.data);
}

export async function parseRnFetchBlobJsonResponse<T = any>(
  response: FetchBlobResponse,
) {
  const serverData = response.json() as T | ServerErrorType;

  console.log("serverData inside parseRnFetchBlobJsonResponse", serverData);

  if (response.respInfo.status >= 400) {
    const axiosError = new AxiosError<ServerErrorType>(
      undefined,
      "Server Error",
      undefined,
      undefined,
      {
        config: {},
        statusText: "",
        request: undefined,
        status: response.respInfo.status,
        data: serverData as ServerErrorType,
        headers: response.respInfo.headers,
      },
    );

    console.log("axiosError", axiosError);

    throw new ApplicationError(axiosError);
  }

  return serverData;
}
