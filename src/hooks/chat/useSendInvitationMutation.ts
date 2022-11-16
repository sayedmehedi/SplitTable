import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IChatService} from "@core/services/IChatService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {SendInvitationRequest, SendInvitationResponse} from "@src/models";
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  MutationFunction,
} from "@tanstack/react-query";

const service = container.get<IChatService>(ServiceProviderTypes.ChatService);

const mutaitonFn: MutationFunction<
  SendInvitationResponse,
  SendInvitationRequest
> = value => service.sendInvitation(value).then(response => response.data);

function useSendInvitationMutation(
  options: UseMutationOptions<
    SendInvitationResponse,
    ApplicationError,
    SendInvitationRequest
  > = {},
) {
  const queryClient = useQueryClient();

  return useMutation<
    SendInvitationResponse,
    ApplicationError,
    SendInvitationRequest
  >(mutaitonFn, {
    ...options,
    async onSuccess(_data, _variables, _context) {
      await queryClient.invalidateQueries([QueryKeys.CHAT]);

      options.onSuccess?.(_data, _variables, _context);
    },
  });
}

export default useSendInvitationMutation;
