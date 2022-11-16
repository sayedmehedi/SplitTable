import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {GetProfileDataResponse} from "@src/models";
import {handleCancelableAxiosPromise} from "@utils/http";
import {IUserService} from "@core/services/IUserService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {QueryFunction, UseQueryOptions, useQuery} from "@tanstack/react-query";

const service = container.get<IUserService>(ServiceProviderTypes.UserService);

type QueryKey = [typeof QueryKeys.PROFILE, number | undefined];

const queryFn: QueryFunction<GetProfileDataResponse, QueryKey> = ({
  signal,
  queryKey,
}) => {
  const userId = queryKey[1];
  return handleCancelableAxiosPromise(service.getProfile(userId), {
    signal,
  });
};

export default function useGetProfileQuery(
  userId?: number,
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
  >([QueryKeys.PROFILE, userId], queryFn, optionsRef.current);
}
