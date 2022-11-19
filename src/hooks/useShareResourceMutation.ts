import React from "react";
import Share, {ShareOptions} from "react-native-share";
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import {ShareOpenResult} from "react-native-share/lib/typescript/types";

function useShareResourceMutation(
  options: UseMutationOptions<ShareOpenResult, Error, ShareOptions> = {},
) {
  const queryClient = useQueryClient();

  return useMutation<ShareOpenResult, Error, ShareOptions>(
    async options => {
      console.log("opening");

      const shareResponse = await Share.open(options);

      console.log("shareResponse", shareResponse);

      return shareResponse;
    },
    {
      ...options,
      async onSuccess(_data, _variables, _context) {
        options.onSuccess?.(_data, _variables, _context);
      },
    },
  );
}

export default useShareResourceMutation;
