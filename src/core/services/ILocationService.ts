import {AxiosResponse} from "axios";
import CancelablePromise from "cancelable-promise";
import {GetLocationsReposne, GlobalAxiosRequestConfig} from "@src/models";

export interface ILocationService {
  getLocations(): CancelablePromise<
    AxiosResponse<GetLocationsReposne, GlobalAxiosRequestConfig>
  >;
}
