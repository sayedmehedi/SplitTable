import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IUserService} from "@core/services/IUserService";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {UpdateProfileRequest, UpdateProfileResponse} from "@src/models";
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

const service = container.get<IUserService>(ServiceProviderTypes.UserService);

function useUpdateProfileMutation(
  options: UseMutationOptions<
    UpdateProfileResponse,
    Error,
    UpdateProfileRequest
  > = {},
) {
  const queryClient = useQueryClient();

  return useMutation<UpdateProfileResponse, Error, UpdateProfileRequest>(
    value => service.updateProfile(value),
    {
      ...options,
      async onSuccess(_data, _variables, _context) {
        await queryClient.invalidateQueries([QueryKeys.PROFILE]);

        options.onSuccess?.(_data, _variables, _context);
      },
    },
  );
}

export default useUpdateProfileMutation;
