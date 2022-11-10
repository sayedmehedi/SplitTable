import React from "react";
import {Axios} from "axios";
import {AuthData} from "@src/models";
import {container} from "@src/appEngine";
import {StorageKeys} from "@constants/storage";
import {QueryKeys} from "@constants/query-keys";
import {useQuery} from "@tanstack/react-query";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";

const httpClient = container.get<Axios>(ServiceProviderTypes.HttpClient);

function useGetAuthDataQuery() {
  const {getItem: getStorageAuthData} = useAsyncStorage(StorageKeys.AUTH_DATA);

  return useQuery<AuthData, Error>(
    [QueryKeys.AUTH_DATA],
    async () => {
      const jsonValue = await getStorageAuthData();
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    },
    {
      networkMode: "always",
      onSuccess(authData) {
        if (!!authData?.token) {
          httpClient.defaults.headers.common.Authorization = `Bearer ${authData.token}`;
        }
      },
    },
  );
}

export default useGetAuthDataQuery;
