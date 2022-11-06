import React from "react";
import {AuthType} from "@src/models";
import {StorageKeys} from "@constants/storage";
import {useQuery} from "@tanstack/react-query";
import {QueryKeys} from "@constants/query-keys";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";

function useGetAuthTypeQuery() {
  const {getItem: getStorageAuthType} = useAsyncStorage(StorageKeys.AUTH_TYPE);

  return useQuery<AuthType | null, Error>(
    [QueryKeys.AUTH_TYPE],
    () => {
      return getStorageAuthType() as Promise<AuthType | null>;
    },
    {
      networkMode: "always",
    },
  );
}

export default useGetAuthTypeQuery;
