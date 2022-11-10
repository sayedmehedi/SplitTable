import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IUserService} from "@core/services/IUserService";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {DeleteUserImageRequest, DeleteUserImageResponse} from "@src/models";
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import {ApplicationError} from "@core/domain/ApplicationError";

const service = container.get<IUserService>(ServiceProviderTypes.UserService);

function useDeleteUserPhotoMutation(
  options: UseMutationOptions<
    DeleteUserImageResponse,
    ApplicationError,
    DeleteUserImageRequest
  > = {},
) {
  const queryClient = useQueryClient();

  return useMutation<
    DeleteUserImageResponse,
    ApplicationError,
    DeleteUserImageRequest
  >(value => service.deleteImage(value).then(response => response.data), {
    ...options,
    async onSuccess(_data, _variables, _context) {
      await queryClient.invalidateQueries([QueryKeys.IMAGE]);

      options.onSuccess?.(_data, _variables, _context);
    },
  });
}

export default useDeleteUserPhotoMutation;
