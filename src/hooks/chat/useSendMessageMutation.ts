import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IChatService} from "@core/services/IChatService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {SendMessageRequest, SendMessageResponse} from "@src/models";
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  MutationFunction,
} from "@tanstack/react-query";

const service = container.get<IChatService>(ServiceProviderTypes.ChatService);

const mutaitonFn: MutationFunction<
  SendMessageResponse,
  SendMessageRequest
> = value => service.sendMessage(value).then(response => response.data);

function useSendMessageMutation(
  options: UseMutationOptions<
    SendMessageResponse,
    ApplicationError,
    SendMessageRequest
  > = {},
) {
  const queryClient = useQueryClient();

  return useMutation<SendMessageResponse, ApplicationError, SendMessageRequest>(
    mutaitonFn,
    {
      ...options,
      async onSuccess(_data, _variables, _context) {
        await queryClient.invalidateQueries([QueryKeys.CHAT]);

        options.onSuccess?.(_data, _variables, _context);
      },
    },
  );
}

export default useSendMessageMutation;
