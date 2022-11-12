import React from "react";
import {Alert} from "react-native";
import {useQuery} from "@tanstack/react-query";
import {QueryKeys} from "@constants/query-keys";
import Geolocation from "@react-native-community/geolocation";
import {GeolocationError, GeolocationPosition} from "@src/models";

function useGetGeolocationQuery() {
  return useQuery<GeolocationPosition, Error>(
    [QueryKeys.GEOLOCATION],
    () => {
      return new Promise<GeolocationPosition>((resolve, reject) => {
        Geolocation.requestAuthorization(
          () => {
            Geolocation.getCurrentPosition(
              (position: GeolocationPosition) => {
                resolve(position);
              },
              (error: GeolocationError) => {
                switch (error.code) {
                  case error.PERMISSION_DENIED:
                    Alert.alert("Error", "Permission denied");
                    break;

                  case error.POSITION_UNAVAILABLE:
                    Alert.alert("Error", "Permission unavailable");
                    break;
                  default:
                    Alert.alert("Error", "Timeout");
                    break;
                }

                reject(new Error(error.message));
              },
              {
                enableHighAccuracy: true,
              },
            );
          },
          (error: GeolocationError) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                Alert.alert("Error", "Permission denied");
                break;

              case error.POSITION_UNAVAILABLE:
                Alert.alert("Error", "Permission unavailable");
                break;
              default:
                Alert.alert("Error", "Timeout");
                break;
            }

            reject(new Error(error.message));
          },
        );
      });
    },
    {
      networkMode: "always",
    },
  );
}

export default useGetGeolocationQuery;
