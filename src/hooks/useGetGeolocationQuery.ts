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
        try {
          // Geolocation.requestAuthorization();
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
    },
    {
      networkMode: "always",
    },
  );
}

export default useGetGeolocationQuery;
