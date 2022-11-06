import React from "react";
import {AuthData} from "@src/models";
import {StorageKeys} from "@constants/storage";
import {QueryKeys} from "@constants/query-keys";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";

function useAddAuthDataMutation() {
  const queryClient = useQueryClient();

  const {setItem: setStorageAuthData} = useAsyncStorage(StorageKeys.AUTH_DATA);

  return useMutation<void, Error, AuthData>(
    value => {
      const jsonValue = JSON.stringify(value);

      return setStorageAuthData(jsonValue);
    },
    {
      onSuccess(_data, _variables, _context) {
        queryClient.invalidateQueries([QueryKeys.AUTH_DATA]);
      },
    },
  );
}

export default useAddAuthDataMutation;
