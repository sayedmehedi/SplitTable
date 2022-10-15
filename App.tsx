import React from "react";
import {splitAppTheme} from "./src/theme";
import {StatusBar} from "react-native";
import {NativeBaseProvider} from "native-base";
import {NavigationContainer} from "@react-navigation/native";
import RootStackNavigator from "@navigators/RootStackNavigator";

const App = () => {
  return (
    <NativeBaseProvider theme={splitAppTheme}>
      <NavigationContainer>
        <StatusBar barStyle={"dark-content"} />
        <RootStackNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
