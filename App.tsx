import "@src/appEngine";
import React from "react";
import {enableLatestRenderer} from "react-native-maps";
import AllTheProviders from "@providers/AllTheProviders";
import RootStackNavigator from "@navigators/RootStackNavigator";
import FlipperAsyncStorage from "rn-flipper-async-storage-advanced";

enableLatestRenderer();

const App = () => {
  return (
    <AllTheProviders>
      <FlipperAsyncStorage />
      <RootStackNavigator />
    </AllTheProviders>
  );
};

export default App;
