import {AxiosResponse} from "axios";
import CancelablePromise from "cancelable-promise";
import {
  GetClubMenusResponse,
  GlobalAxiosRequestConfig,
  GetClubMenusQueryParams,
  GetOwnerClubMenusQueryParams,
  GetOwnerClubMenusResponse,
  CreateOwnerClubMenuRequest,
  CreateOwnerClubMenuResponse,
  UpdateOwnerClubMenuRequest,
  UpdateOwnerClubMenuResponse,
  DeleteOwnerClubMenuResponse,
  DeleteOwnerClubMenuRequest,
} from "@src/models";

export interface IMenuService {
  deleteOwnerClubMenu(
    data: DeleteOwnerClubMenuRequest,
  ): Promise<
    AxiosResponse<DeleteOwnerClubMenuResponse, GlobalAxiosRequestConfig>
  >;

  createOwnerClubMenu(
    data: CreateOwnerClubMenuRequest,
  ): Promise<CreateOwnerClubMenuResponse>;

  updateOwnerClubMenu(
    data: UpdateOwnerClubMenuRequest,
  ): Promise<UpdateOwnerClubMenuResponse>;

  getClubMenus(
    params: GetClubMenusQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetClubMenusResponse, GlobalAxiosRequestConfig>
  >;

  getOwnerClubMenus(
    params: GetOwnerClubMenusQueryParams,
  ): CancelablePromise<
    AxiosResponse<GetOwnerClubMenusResponse, GlobalAxiosRequestConfig>
  >;
}
