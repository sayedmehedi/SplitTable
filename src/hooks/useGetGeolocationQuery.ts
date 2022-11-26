import React from "react";
import {useQuery} from "@tanstack/react-query";
import {QueryKeys} from "@constants/query-keys";
import {PermissionsAndroid, Platform} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import {GeolocationError, GeolocationPosition} from "@src/models";

function getGeolocation() {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    try {
      Geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          console.log("getCurrentPosition success", position);
          resolve(position);
        },
        (error: GeolocationError) => {
          console.log("getCurrentPosition error", error.message);

          reject(error);
        },
        {
          enableHighAccuracy: true,
        },
      );
    } catch (err) {
      reject(err);
    }
  });
}

function useGetGeolocationQuery() {
  return useQuery<GeolocationPosition, Error>(
    [QueryKeys.GEOLOCATION],
    async () => {
      if (Platform.OS === "android" && Platform.Version >= 23) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        );
      }

      return await getGeolocation();
    },
    {
      networkMode: "always",
    },
  );
}

export default useGetGeolocationQuery;
