import React from "react";
import {StatusBar} from "react-native";
import {NativeBaseProvider} from "native-base";
import {NavigationContainer} from "@react-navigation/native";
import RootStackNavigator from "@navigators/RootStackNavigator";
import {splitAppNavigationTheme, splitAppTheme} from "./src/theme";

const App = () => {
  return (
    <NativeBaseProvider theme={splitAppTheme}>
      <NavigationContainer theme={splitAppNavigationTheme}>
        <StatusBar barStyle={"dark-content"} />
        <RootStackNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
