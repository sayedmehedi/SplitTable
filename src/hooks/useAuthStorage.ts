import React from "react";
import {AuthData, AuthType} from "@src/models";
import {StorageKeys} from "@constants/storage";
import {QueryKeys} from "@constants/query-keys";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

function useAuthStorage() {
  const queryClient = useQueryClient();
  const {
    getItem: getStorageAuthData,
    setItem: setStorageAuthData,
    removeItem: removeAuthData,
  } = useAsyncStorage(StorageKeys.AUTH_DATA);

  const {
    getItem: getStorageAuthType,
    setItem: setStorageAuthType,
    removeItem: removeAuthType,
  } = useAsyncStorage(StorageKeys.AUTH_TYPE);

  const {
    data: authData,
    error: authDataError,
    isLoading: isLoadingAuthData,
    isError: isAuthDataGettingError,
  } = useQuery<AuthData, Error>(
    [QueryKeys.AUTH_DATA],
    async () => {
      const jsonValue = await getStorageAuthData();
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    },
    {
      networkMode: "always",
    },
  );

  const {
    mutate: setAuthData,
    error: authDataSettingError,
    isError: isAuthDataSettingError,
  } = useMutation<void, Error, AuthData>(
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

  const {
    data: authType,
    error: authTypeError,
    isLoading: isLoadingAuthType,
    isError: isAuthTypeGettingError,
  } = useQuery<AuthType | null, Error>(
    [QueryKeys.AUTH_TYPE],
    () => {
      return getStorageAuthType() as Promise<AuthType | null>;
    },
    {
      networkMode: "always",
    },
  );

  const {
    mutate: setAuthType,
    error: authTypeSettingError,
    isError: isAuthTypeSettingError,
  } = useMutation<void, Error, AuthType>(
    value => {
      const jsonValue = JSON.stringify(value);

      return setStorageAuthType(jsonValue);
    },
    {
      onSuccess(_data, _variables, _context) {
        queryClient.invalidateQueries([QueryKeys.AUTH_TYPE]);
      },
    },
  );

  React.useEffect(() => {
    if (isAuthDataGettingError) {
      console.log("getting auth data error", authDataError!.message);
    }
  }, [isAuthDataGettingError, authDataError]);

  React.useEffect(() => {
    if (isAuthDataSettingError) {
      console.log("setting auth data error", authDataSettingError!.message);
    }
  }, [isAuthDataSettingError, authDataSettingError]);

  React.useEffect(() => {
    if (isAuthTypeGettingError) {
      console.log("getting auth type error", authTypeError!.message);
    }
  }, [isAuthTypeGettingError, authTypeError]);

  React.useEffect(() => {
    if (isAuthTypeSettingError) {
      console.log("setting auth type error", authTypeSettingError!.message);
    }
  }, [isAuthTypeSettingError, authTypeSettingError]);

  return {
    authType,
    authData,
    setAuthType,
    setAuthData,
    removeAuthData,
    removeAuthType,
    isLoading: isLoadingAuthData || isLoadingAuthType,
  };
}

export default useAuthStorage;
