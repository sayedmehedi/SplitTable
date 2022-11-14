import React from "react";
import {splitAppTheme} from "@src/theme";
import MapMarker from "@assets/icons/map-marker.svg";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import useAppToast from "@hooks/useAppToast";
import MapView, {Marker} from "react-native-maps";
import {StackScreenProps} from "@react-navigation/stack";
import {CompositeScreenProps} from "@react-navigation/native";
import AppGradientButton from "@components/AppGradientButton";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useGetGeolocationQuery from "@hooks/useGetGeolocationQuery";
import {RootStackParamList, OwnerStackParamList} from "@src/navigation";
import useUpdateProfileMutation from "@hooks/user/useUpdateProfileMutation";
import {OwnerMainBottomTabRoutes, OwnerStackRoutes} from "@constants/routes";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";

type Props = CompositeScreenProps<
  CompositeScreenProps<
    StackScreenProps<
      OwnerStackParamList,
      typeof OwnerStackRoutes.LOCATION_ENABLE
    >,
    StackScreenProps<OwnerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

const LocationEnablePromptScreen = ({navigation}: Props) => {
  const toast = useAppToast();
  const [markerCoords, setMarkerCoords] = React.useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const {
    mutate: updateProfile,
    error: updateError,
    data: updateResponse,
  } = useUpdateProfileMutation();
  useHandleNonFieldError(updateError);
  useHandleResponseResultError(updateResponse);

  const handleEnableLocation = () => {
    if (!markerCoords) {
      toast.error("Please update your coordinates");
      return;
    }

    updateProfile({
      latitude: `${markerCoordinates.latitude}`,
      longitude: `${markerCoordinates.longitude}`,
    });
  };

  const {
    data: geolocationData,
    error: geolocationError,
    isLoading: isGeolocationLoading,
  } = useGetGeolocationQuery();
  useHandleNonFieldError(geolocationError);

  React.useEffect(() => {
    if (!!geolocationData) {
      console.log("running");
      setMarkerCoords(geolocationData.coords);
    }
  }, [geolocationData?.coords?.latitude, geolocationData?.coords?.longitude]);

  const markerCoordinates = React.useMemo(() => {
    return {
      latitude: markerCoords?.latitude ?? 0,
      longitude: markerCoords?.longitude ?? 0,
    };
  }, [markerCoords?.latitude, markerCoords?.longitude]);

  const initialRegion = React.useMemo(() => {
    return {
      latitudeDelta: 0.04,
      longitudeDelta: 0.05,
      latitude: geolocationData?.coords.latitude ?? 0,
      longitude: geolocationData?.coords.longitude ?? 0,
    };
  }, [geolocationData?.coords?.latitude, geolocationData?.coords?.longitude]);

  return (
    <View style={{padding: 30, flex: 1, backgroundColor: "white"}}>
      {isGeolocationLoading ? (
        <View
          style={{
            height: 200,
            alignItems: "center",
            justifyContent: "center",
            width: splitAppTheme.sizes.full,
          }}>
          <ActivityIndicator size={"small"} />
        </View>
      ) : (
        !!geolocationData && (
          <MapView initialRegion={initialRegion} style={styles.mapView}>
            {!!markerCoordinates && (
              <Marker
                draggable
                coordinate={markerCoordinates}
                onDragEnd={e => {
                  setMarkerCoords(e.nativeEvent.coordinate);
                }}>
                <MapMarker />
              </Marker>
            )}
          </MapView>
        )
      )}

      <Text
        style={{
          color: "#262B2E",
          textAlign: "center",
          margin: splitAppTheme.space[5],
          fontSize: splitAppTheme.fontSizes.md,
          fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
        }}>
        Set your location to start exploring club/bars around you
      </Text>

      <AppGradientButton
        width={"100%"}
        color={"primary"}
        variant={"solid"}
        touchableOpacityProps={{
          disabled: isGeolocationLoading,
        }}
        title={"Enable Location"}
        onPress={handleEnableLocation}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(OwnerStackRoutes.OWNER_MAIN_TABS, {
            screen: OwnerMainBottomTabRoutes.OWNER_TABLE,
          });
        }}>
        <View
          style={{
            padding: splitAppTheme.space[3],
            marginTop: splitAppTheme.space[5],
            borderRadius: splitAppTheme.radii.lg,
            borderWidth: splitAppTheme.borderWidths[2],
            borderColor: splitAppTheme.colors.blue[300],
          }}>
          <Text
            style={{
              textAlign: "center",
              color: splitAppTheme.colors.blue[300],
              fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
            }}>
            No, I do it later
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mapView: {
    height: 200,
    width: splitAppTheme.sizes.full,
    borderRadius: splitAppTheme.radii.lg,
  },
});

export default LocationEnablePromptScreen;
