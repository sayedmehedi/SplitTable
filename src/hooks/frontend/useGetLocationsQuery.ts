import React from "react";
import {container} from "@src/appEngine";
import {GetLocationsReposne} from "@src/models";
import {QueryKeys} from "@constants/query-keys";
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
> = async ({signal}) => {
  const response = await service.getLocations({
    signal,
  });

  return response.data;
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
