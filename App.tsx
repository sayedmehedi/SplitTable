import "@src/appEngine";
import React from "react";
import Toast from "react-native-toast-message";
import {enableLatestRenderer} from "react-native-maps";
import AllTheProviders from "@providers/AllTheProviders";
import RootStackNavigator from "@navigators/RootStackNavigator";
import FlipperAsyncStorage from "rn-flipper-async-storage-advanced";

// @ts-ignore
navigator.geolocation = require("@react-native-community/geolocation");

enableLatestRenderer();

const App = () => {
  return (
    <AllTheProviders>
      <FlipperAsyncStorage />
      <RootStackNavigator />
      <Toast />
    </AllTheProviders>
  );
};

export default App;
