import React from "react";
import {StorageKeys} from "@constants/storage";
import {QueryKeys} from "@constants/query-keys";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";

function useDeleteAuthDataMutation(
  options: UseMutationOptions<void, Error> = {},
) {
  const queryClient = useQueryClient();

  const {removeItem} = useAsyncStorage(StorageKeys.AUTH_DATA);

  return useMutation<void, Error>(
    () => {
      return removeItem();
    },
    {
      ...options,
      async onSuccess(_data, _variables, _context) {
        await queryClient.invalidateQueries([QueryKeys.AUTH_DATA]);

        options.onSuccess?.(_data, _variables, _context);
      },
    },
  );
}

export default useDeleteAuthDataMutation;
