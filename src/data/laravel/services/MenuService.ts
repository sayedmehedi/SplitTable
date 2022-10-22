import {Axios, AxiosResponse} from "axios";
import {inject, injectable} from "inversify";
import {CancelablePromise} from "cancelable-promise";
import {IMenuService} from "@core/services/IMenuService";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  GetClubMenusResponse,
  GlobalAxiosRequestConfig,
  GetClubMenusPaginationQueryParams,
} from "@src/models";

@injectable()
export class MenuService implements IMenuService {
  @inject(ServiceProviderTypes.HttpClient)
  private readonly _httpService!: Axios;

  constructor() {}

  getClubMenus({
    clubId,
    ...params
  }: GetClubMenusPaginationQueryParams): CancelablePromise<
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
