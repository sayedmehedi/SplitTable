import React from "react";
import {container} from "@src/appEngine";
import {GetLocationsReposne} from "@src/models";
import {QueryKeys} from "@constants/query-keys";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {IFrontendService} from "@core/services/IFrontendService";
import {QueryFunction, UseQueryOptions, useQuery} from "@tanstack/react-query";

const service = container.get<IFrontendService>(
  ServiceProviderTypes.FrontendService,
);

const getLocationsQueryFunction: QueryFunction<
  GetLocationsReposne,
  [typeof QueryKeys.LOCATION, "LIST"]
> = ({signal}) => {
  return handleCancelableAxiosPromise(service.getLocations(), {
    signal,
  });
};

export default function useGetLocationsQuery(
  options?: UseQueryOptions<
    GetLocationsReposne,
    ApplicationError,
    GetLocationsReposne,
    [typeof QueryKeys.LOCATION, "LIST"]
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useQuery<
    GetLocationsReposne,
    ApplicationError,
    GetLocationsReposne,
    [typeof QueryKeys.LOCATION, "LIST"]
  >(
    [QueryKeys.LOCATION, "LIST"],
    getLocationsQueryFunction,
    optionsRef.current,
  );
}
