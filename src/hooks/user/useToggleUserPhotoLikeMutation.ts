import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IUserService} from "@core/services/IUserService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  ToggleUserImageLikeRequest,
  ToggleUserImageLikeResponse,
} from "@src/models";
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

const service = container.get<IUserService>(ServiceProviderTypes.UserService);

function useToggleUserPhotoLikeMutation(
  options: UseMutationOptions<
    ToggleUserImageLikeResponse,
    ApplicationError,
    ToggleUserImageLikeRequest
  > = {},
) {
  const queryClient = useQueryClient();

  return useMutation<
    ToggleUserImageLikeResponse,
    ApplicationError,
    ToggleUserImageLikeRequest
  >(value => service.toggleImageLike(value).then(response => response.data), {
    ...options,
    async onSuccess(_data, _variables, _context) {
      await queryClient.invalidateQueries([QueryKeys.IMAGE]);

      options.onSuccess?.(_data, _variables, _context);
    },
  });
}

export default useToggleUserPhotoLikeMutation;
