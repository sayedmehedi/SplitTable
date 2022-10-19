import React from "react";
import {Axios} from "axios";
import {container} from "@src/appEngine";
import {AuthData, AuthType} from "@src/models";
import useAuthStorage from "@hooks/useAuthStorage";
import {Center, Spinner, VStack} from "native-base";
import SplashScreen from "react-native-splash-screen";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";

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

      httpClient.defaults.headers.common.Authorication = `Bearer ${authData.token}`;
    }
  }, [authData?.token]);

  React.useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <VStack safeArea flex={1}>
        <Center h={"full"}>
          <Spinner size={"lg"} />
        </Center>
      </VStack>
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
