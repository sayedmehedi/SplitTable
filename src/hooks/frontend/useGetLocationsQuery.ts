import React from "react";
import {container} from "@src/appEngine";
import {GetLocationsReposne} from "@src/models";
import {QueryKeys} from "@constants/query-keys";
import {handleCancelableAxiosPromise} from "@utils/http";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {ILocationService} from "@core/services/ILocationService";
import {QueryFunction, UseQueryOptions, useQuery} from "@tanstack/react-query";

const service = container.get<ILocationService>(
  ServiceProviderTypes.LocationService,
);

type QueryKey = [typeof QueryKeys.LOCATION, "LIST"];

const getLocationsQueryFunction: QueryFunction<
  GetLocationsReposne,
  QueryKey
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
    QueryKey
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
    QueryKey
  >(
    [QueryKeys.LOCATION, "LIST"],
    getLocationsQueryFunction,
    optionsRef.current,
  );
}
