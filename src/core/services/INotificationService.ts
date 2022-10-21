import {AxiosResponse} from "axios";
import CancelablePromise from "cancelable-promise";
import {
  GetNotificationsQueryParams,
  GetNotificationsResponse,
  GlobalAxiosRequestConfig,
} from "@src/models";

export interface INotificationService {
  getNotifications(
    params: GetNotificationsQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetNotificationsResponse, GlobalAxiosRequestConfig>
  >;
}
