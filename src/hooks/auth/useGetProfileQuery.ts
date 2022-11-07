import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {GetProfileDataResponse} from "@src/models";
import {handleCancelableAxiosPromise} from "@utils/http";
import {IAuthService} from "@core/services/IAuthService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {QueryFunction, UseQueryOptions, useQuery} from "@tanstack/react-query";

const service = container.get<IAuthService>(ServiceProviderTypes.AuthService);

type QueryKey = [typeof QueryKeys.PROFILE];

const queryFn: QueryFunction<GetProfileDataResponse, QueryKey> = ({signal}) => {
  return handleCancelableAxiosPromise(service.getProfile(), {
    signal,
  });
};

export default function useGetProfileQuery(
  options?: UseQueryOptions<
    GetProfileDataResponse,
    ApplicationError,
    GetProfileDataResponse,
    QueryKey
  >,
) {
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useQuery<
    GetProfileDataResponse,
    ApplicationError,
    GetProfileDataResponse,
    QueryKey
  >([QueryKeys.PROFILE], queryFn, optionsRef.current);
}
