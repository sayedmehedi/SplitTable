import {AxiosResponse} from "axios";
import CancelablePromise from "cancelable-promise";
import {
  GetClubMenusResponse,
  GlobalAxiosRequestConfig,
  GetClubMenusPaginationQueryParams,
} from "@src/models";

export interface IMenuService {
  getClubMenus(
    params: GetClubMenusPaginationQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetClubMenusResponse, GlobalAxiosRequestConfig>
  >;
}
