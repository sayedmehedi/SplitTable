import React from "react";
import {splitAppTheme} from "@src/theme";
import {ActivityIndicator, View} from "react-native";
import SplashScreen from "react-native-splash-screen";
import useGetAuthDataQuery from "@hooks/useGetAuthDataQuery";

export default function AuthDataIsLoaded({children}: React.PropsWithChildren) {
  const {isLoading} = useGetAuthDataQuery();

  React.useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <ActivityIndicator
          size={"large"}
          color={splitAppTheme.colors.primary[300]}
        />
      </View>
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
}
