import "@src/appEngine";
import React from "react";
import {StatusBar} from "native-base";
import AllTheProviders from "@providers/AllTheProviders";
import RootStackNavigator from "@navigators/RootStackNavigator";
import FlipperAsyncStorage from "rn-flipper-async-storage-advanced";

const App = () => {
  return (
    <AllTheProviders>
      <FlipperAsyncStorage />
      <StatusBar barStyle={"dark-content"} />
      <RootStackNavigator />
    </AllTheProviders>
  );
};

export default App;
