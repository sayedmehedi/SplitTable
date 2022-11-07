import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IUserService} from "@core/services/IUserService";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {AddUserImageRequest, AddUserImageResponse} from "@src/models";
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

const service = container.get<IUserService>(ServiceProviderTypes.UserService);

function useAddUserImageMutation(
  options: UseMutationOptions<
    AddUserImageResponse,
    Error,
    AddUserImageRequest
  > = {},
) {
  const queryClient = useQueryClient();

  return useMutation<AddUserImageResponse, Error, AddUserImageRequest>(
    value => service.addImage(value),
    {
      ...options,
      async onSuccess(_data, _variables, _context) {
        await queryClient.invalidateQueries([QueryKeys.IMAGE]);

        options.onSuccess?.(_data, _variables, _context);
      },
    },
  );
}

export default useAddUserImageMutation;
