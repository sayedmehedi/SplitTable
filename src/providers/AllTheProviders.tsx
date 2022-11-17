import React from "react";
import {Platform, View} from "react-native";
import {AppStateStatus, Text} from "react-native";
import AuthTypeProvider from "./AuthTypeProvider";
import {splitAppNavigationTheme} from "@src/theme";
import {onlineManager} from "@tanstack/react-query";
import {focusManager} from "@tanstack/react-query";
import {useFlipper} from "@react-navigation/devtools";
import {useAppState} from "@react-native-community/hooks";
import AuthDataIsLoaded from "@components/AuthDataIsLoaded";
import BearerTokenAttacher from "@components/BearerTokenAttacher";
import NetInfo, {useNetInfo} from "@react-native-community/netinfo";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
// import {PersistQueryClientProvider} from "@tanstack/react-query-persist-client";
import {createAsyncStoragePersister} from "@tanstack/query-async-storage-persister";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import Toast from "react-native-toast-message";

GoogleSignin.configure({
  webClientId:
    "279694335608-iukesl9p12ilraqs6k2nlu63g5rp3m4g.apps.googleusercontent.com",
});

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      onError(err: any) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "non_field_error" in err ? err.non_field_error : err.message,
        });
      },
    },
  },
});

if (__DEV__) {
  import("react-query-native-devtools").then(({addPlugin}) => {
    addPlugin({queryClient: defaultQueryClient});
  });
}

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

function AllTheProviders({children}: React.PropsWithChildren) {
  const appState = useAppState();
  const {isInternetReachable, isConnected} = useNetInfo();

  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);

  React.useEffect(() => {
    onAppStateChange(appState);
  }, [appState]);

  if (!isConnected) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Text>Not connected to any wifi</Text>
      </View>
    );
  }

  if (!isInternetReachable) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>No Internet</Text>
      </View>
    );
  }

  return (
    <QueryClientProvider
      client={defaultQueryClient}
      // persistOptions={{
      //   persister: asyncStoragePersister,
      // }}
    >
      <NavigationContainer theme={splitAppNavigationTheme}>
        <AuthTypeProvider>
          <AuthDataIsLoaded>
            <BearerTokenAttacher>{children}</BearerTokenAttacher>
          </AuthDataIsLoaded>
        </AuthTypeProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default AllTheProviders;
