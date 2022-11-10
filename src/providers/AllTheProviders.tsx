import React from "react";
import {AppState, Platform} from "react-native";
import {QueryClient} from "@tanstack/react-query";
import type {AppStateStatus} from "react-native";
import {onlineManager} from "@tanstack/react-query";
import {focusManager} from "@tanstack/react-query";
import {splitAppNavigationTheme} from "@src/theme";
import NetInfo from "@react-native-community/netinfo";
import {useFlipper} from "@react-navigation/devtools";
import AuthDataIsLoaded from "@components/AuthDataIsLoaded";
import AuthTypeIsLoaded from "@components/AuthTypeIsLoaded";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {PersistQueryClientProvider} from "@tanstack/react-query-persist-client";
import {createAsyncStoragePersister} from "@tanstack/query-async-storage-persister";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import BearerTokenAttacher from "@components/BearerTokenAttacher";

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
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);

  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <PersistQueryClientProvider
      client={defaultQueryClient}
      persistOptions={{
        persister: asyncStoragePersister,
      }}>
      <NavigationContainer theme={splitAppNavigationTheme}>
        <AuthTypeIsLoaded>
          <AuthDataIsLoaded>
            <BearerTokenAttacher>{children}</BearerTokenAttacher>
          </AuthDataIsLoaded>
        </AuthTypeIsLoaded>
      </NavigationContainer>
    </PersistQueryClientProvider>
  );
}

export default AllTheProviders;
