import React from "react";
import {AuthType} from "@src/models";
import {StorageKeys} from "@constants/storage";
import {QueryKeys} from "@constants/query-keys";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";

function useAddAuthTypeMutation() {
  const queryClient = useQueryClient();

  const {setItem: setStorageAuthType} = useAsyncStorage(StorageKeys.AUTH_TYPE);

  return useMutation<void, Error, AuthType>(
    value => {
      return setStorageAuthType(value);
    },
    {
      onSuccess(_data, _variables, _context) {
        queryClient.refetchQueries([QueryKeys.AUTH_TYPE]);
      },
    },
  );
}

export default useAddAuthTypeMutation;
