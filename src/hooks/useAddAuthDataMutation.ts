import React from "react";
import {AuthData} from "@src/models";
import {StorageKeys} from "@constants/storage";
import {QueryKeys} from "@constants/query-keys";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";

function useAddAuthDataMutation(
  options: UseMutationOptions<void, Error, AuthData> = {},
) {
  const queryClient = useQueryClient();

  const {setItem: setStorageAuthData} = useAsyncStorage(StorageKeys.AUTH_DATA);

  return useMutation<void, Error, AuthData>(
    value => {
      const jsonValue = JSON.stringify(value);

      return setStorageAuthData(jsonValue);
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

export default useAddAuthDataMutation;
