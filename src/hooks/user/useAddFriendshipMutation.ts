import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IUserService} from "@core/services/IUserService";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {ApplicationError} from "@core/domain/ApplicationError";
import {AddFriendshipRequest, AddFriendshipResponse} from "@src/models";
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

const service = container.get<IUserService>(ServiceProviderTypes.UserService);

function useAddFriendshipMutation(
  options: UseMutationOptions<
    AddFriendshipResponse,
    ApplicationError,
    AddFriendshipRequest
  > = {},
) {
  const queryClient = useQueryClient();

  return useMutation<
    AddFriendshipResponse,
    ApplicationError,
    AddFriendshipRequest
  >(value => service.addFriend(value).then(response => response.data), {
    ...options,
    async onSuccess(_data, _variables, _context) {
      await queryClient.invalidateQueries([QueryKeys.FRIEND]);

      options.onSuccess?.(_data, _variables, _context);
    },
  });
}

export default useAddFriendshipMutation;
