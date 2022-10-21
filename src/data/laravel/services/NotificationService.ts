import {Axios, AxiosResponse} from "axios";
import {inject, injectable} from "inversify";
import {CancelablePromise} from "cancelable-promise";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {INotificationService} from "@core/services/INotificationService";
import {
  PaginationQueryParams,
  GetNotificationsResponse,
  GlobalAxiosRequestConfig,
} from "@src/models";

@injectable()
export class NotificationService implements INotificationService {
  @inject(ServiceProviderTypes.HttpClient)
  private readonly _httpService!: Axios;

  getNotifications(
    params: PaginationQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetNotificationsResponse, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetNotificationsResponse, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetNotificationsResponse>("notifications", {
          params,
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }
}
