import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {handleCancelableAxiosPromise} from "@utils/http";
import {IUserService} from "@core/services/IUserService";
import useGetAuthDataQuery from "@hooks/useGetAuthDataQuery";
import {AuthData, GetProfileDataResponse} from "@src/models";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import useAddAuthDataMutation from "@hooks/useAddAuthDataMutation";
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
  const {data: authData} = useGetAuthDataQuery();
  const {mutateAsync: addAuthData} = useAddAuthDataMutation();

  return useQuery<
    GetProfileDataResponse,
    ApplicationError,
    GetProfileDataResponse,
    QueryKey
  >([QueryKeys.PROFILE, userId], queryFn, {
    ...options,
    async onSuccess(data) {
      console.log("profile query success", data);
      const {location, latitude, longitude, name, email, phone, image} = data;

      if (!!authData) {
        const newAuthData: AuthData = {
          ...authData,
          location,
          latitude,
          longitude,
          name,
          email,
          phone,
          profile_image: image,
        };

        await addAuthData(newAuthData);
      }
      options?.onSuccess?.(data);
    },
  });
}
