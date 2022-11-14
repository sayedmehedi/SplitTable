import React from "react";
import {StorageKeys} from "@constants/storage";
import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";

function useDeleteAuthTypeMutation(
  options: UseMutationOptions<void, Error> = {},
) {
  const {removeItem} = useAsyncStorage(StorageKeys.AUTH_TYPE);

  return useMutation<void, Error>(
    () => {
      return removeItem();
    },
    {
      ...options,
      async onSuccess(_data, _variables, _context) {
        options.onSuccess?.(_data, _variables, _context);
      },
    },
  );
}

export default useDeleteAuthTypeMutation;
