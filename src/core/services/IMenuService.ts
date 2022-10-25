import {AxiosResponse} from "axios";
import CancelablePromise from "cancelable-promise";
import {
  GetClubMenusResponse,
  GlobalAxiosRequestConfig,
  GetClubMenusQueryParams,
} from "@src/models";

export interface IMenuService {
  getClubMenus(
    params: GetClubMenusQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetClubMenusResponse, GlobalAxiosRequestConfig>
  >;
}
