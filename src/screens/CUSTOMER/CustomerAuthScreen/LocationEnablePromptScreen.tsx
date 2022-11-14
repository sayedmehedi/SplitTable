import React from "react";
import {splitAppTheme} from "@src/theme";
import useAppToast from "@hooks/useAppToast";
import MapView, {Marker} from "react-native-maps";
import MapMarker from "@assets/icons/map-marker.svg";
import {
  CustomerStackRoutes,
  CustomerMainBottomTabRoutes,
} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import AppGradientButton from "@components/AppGradientButton";
import {CompositeScreenProps} from "@react-navigation/native";
import useGetGeolocationQuery from "@hooks/useGetGeolocationQuery";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {RootStackParamList, CustomerStackParamList} from "@src/navigation";
import useUpdateProfileMutation from "@hooks/user/useUpdateProfileMutation";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

type Props = CompositeScreenProps<
  StackScreenProps<
    CustomerStackParamList,
    typeof CustomerStackRoutes.LOCATION_ENABLE
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
          navigation.navigate(CustomerStackRoutes.CUSTOMER_MAIN_TAB, {
            screen: CustomerMainBottomTabRoutes.HOME,
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
