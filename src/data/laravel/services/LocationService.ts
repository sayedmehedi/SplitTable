import {Axios, AxiosResponse} from "axios";
import {inject, injectable} from "inversify";
import {CancelablePromise} from "cancelable-promise";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GetLocationsReposne, GlobalAxiosRequestConfig} from "@src/models";
import {ILocationService} from "@core/services/ILocationService";

@injectable()
export class LocationService implements ILocationService {
  @inject(ServiceProviderTypes.HttpClient)
  private readonly _httpService!: Axios;

  constructor() {}

  getLocations(): CancelablePromise<
    AxiosResponse<GetLocationsReposne, GlobalAxiosRequestConfig>
  > {
    const controller = new AbortController();

    return new CancelablePromise<
      AxiosResponse<GetLocationsReposne, GlobalAxiosRequestConfig>
    >((resolve, reject, onCancel) => {
      onCancel(() => {
        controller.abort();
      });

      this._httpService
        .get<GetLocationsReposne>("home-locations", {
          signal: controller.signal,
        })
        .then(resolve)
        .catch(reject);
    });
  }
}
