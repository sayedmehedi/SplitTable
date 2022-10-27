import React from "react";
import {Axios} from "axios";
import {container} from "@src/appEngine";
import {AuthData, AuthType} from "@src/models";
import {Center, Spinner, VStack} from "@components/ui";
import useAuthStorage from "@hooks/useAuthStorage";
import SplashScreen from "react-native-splash-screen";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {ActivityIndicator} from "react-native";
import {useTheme} from "styled-components";

const httpClient = container.get<Axios>(ServiceProviderTypes.HttpClient);

export const AuthContext = React.createContext(
  {} as {
    isAuthenticated: boolean;
    authData: AuthData | undefined;
    authType: AuthType | undefined | null;
    setAuthData: (data: AuthData) => void;
    setAuthType: (data: AuthType) => void;
    removeAuthData: () => void;
    removeAuthType: () => void;
  },
);

export default function AuthProvider({children}: React.PropsWithChildren) {
  const theme = useTheme();
  const {
    authData,
    authType,
    isLoading,
    setAuthData,
    setAuthType,
    removeAuthData,
    removeAuthType,
  } = useAuthStorage();

  const isAuthenticated = React.useMemo(() => !!authData, [authData]);

  React.useEffect(() => {
    if (!!authData?.token) {
      console.log("setting auth token to http client header");

      httpClient.defaults.headers.common.Authorization = `Bearer ${authData.token}`;
    }
  }, [authData?.token]);

  React.useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner size={"large"} color={theme.colors.primary[300]} />
      </Center>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        authData,
        authType,
        setAuthData,
        setAuthType,
        isAuthenticated,
        removeAuthData,
        removeAuthType,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
