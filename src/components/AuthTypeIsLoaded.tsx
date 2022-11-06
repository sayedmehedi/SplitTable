import React from "react";
import {splitAppTheme} from "@src/theme";
import {ActivityIndicator, View} from "react-native";
import SplashScreen from "react-native-splash-screen";
import useGetAuthTypeQuery from "@hooks/useGetAuthTypeQuery";

export default function AuthTypeIsLoaded({children}: React.PropsWithChildren) {
  const {isLoading} = useGetAuthTypeQuery();

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
