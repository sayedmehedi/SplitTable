import React from "react";
import styles from "../styles";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {Controller, useForm} from "react-hook-form";
import {isResponseResultError} from "@utils/error-handling";
import useGetProfileQuery from "@hooks/auth/useGetProfileQuery";
import useGetGeolocationQuery from "@hooks/useGetGeolocationQuery";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useUpdateProfileMutation from "@hooks/user/useUpdateProfileMutation";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import {splitAppTheme} from "@src/theme";
import useAppToast from "@hooks/useAppToast";
import MapView, {Marker} from "react-native-maps";
import MapMarker from "@assets/icons/map-marker.svg";
import Entypo from "react-native-vector-icons/Entypo";
import AppGradientButton from "@components/AppGradientButton";

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
  phone: string;
  latitude: string | null;
  longitude: string | null;
};

type Props = {
  type: "name" | "phone" | "email" | "password" | "address" | "";
  isOpen: boolean;
  onClose: () => void;
};

export default function ProfileUpdaterModal({type, onClose, isOpen}: Props) {
  const toast = useAppToast();

  const {data: profileDataResponse} = useGetProfileQuery();

  const {setValue, control, handleSubmit, watch} = useForm<FormValues>({
    defaultValues: {
      phone: "",
      email: "",
      password: "",
      last_name: "",
      first_name: "",
      old_password: "",
      latitude: null,
      longitude: null,
      password_confirmation: "",
    },
  });

  const lat = watch("latitude");
  const lng = watch("longitude");

  React.useEffect(() => {
    if (profileDataResponse) {
      setValue("email", profileDataResponse.email);
      setValue("phone", profileDataResponse.phone);
      setValue("first_name", profileDataResponse.first_name);
      setValue("last_name", profileDataResponse.last_name);
    }

    if (profileDataResponse?.latitude) {
      setValue("latitude", profileDataResponse.latitude);
    }

    if (profileDataResponse?.longitude) {
      setValue("longitude", profileDataResponse.longitude);
    }
  }, [profileDataResponse, setValue]);

  const {
    mutate: updateProfile,
    data: updateProfileResponse,
    isLoading: isUpdatingProfile,
    error: updateProfileError,
    // isError: isUpdateProfileError,
  } = useUpdateProfileMutation();
  useHandleNonFieldError(updateProfileError);
  useHandleResponseResultError(updateProfileResponse);

  const {
    data: geolocationData,
    error: geolocationError,
    isLoading: isGeolocationLoading,
  } = useGetGeolocationQuery();
  useHandleNonFieldError(geolocationError);

  React.useEffect(() => {
    if (!!geolocationData) {
      setValue("latitude", `${geolocationData.coords.latitude}`);
      setValue("longitude", `${geolocationData.coords.longitude}`);
    }
  }, [
    setValue,
    geolocationData?.coords?.latitude,
    geolocationData?.coords?.longitude,
  ]);

  const markerCoordinates = React.useMemo(() => {
    return {
      latitude: lat ? parseFloat(lat) : 0,
      longitude: lng ? parseFloat(lng) : 0,
    };
  }, [lat, lng]);

  const initialRegion = React.useMemo(() => {
    return {
      latitudeDelta: 0.04,
      longitudeDelta: 0.05,
      latitude: geolocationData?.coords.latitude ?? 0,
      longitude: geolocationData?.coords.longitude ?? 0,
    };
  }, [geolocationData?.coords?.latitude, geolocationData?.coords?.longitude]);

  const handleProfileUpdate = handleSubmit(values => {
    updateProfile(
      type === "name"
        ? {
            first_name: values.first_name,
            last_name: values.last_name,
          }
        : type === "phone"
        ? {
            phone: values.phone,
          }
        : type === "email"
        ? {
            email: values.email,
          }
        : type === "address"
        ? {
            latitude: values.latitude ?? undefined,
            longitude: values.longitude ?? undefined,
          }
        : {
            password: values.password,
            old_password: values.old_password,
            password_confirmation: values.password_confirmation,
          },
      {
        onSuccess(data) {
          console.log("update profile data", data);
          if (!isResponseResultError(data)) {
            toast.success(data.success);
            onClose();
          }
        },
      },
    );
  });

  return (
    <Modal transparent visible={isOpen} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={[styles.modalView, {padding: splitAppTheme.space[4]}]}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              marginBottom: 20,
              alignSelf: "flex-end",
            }}>
            <Entypo name="cross" size={30} color={"#023047"} />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: splitAppTheme.fontSizes.xl,
              fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
            }}>
            {type === "name"
              ? "Update Name"
              : type === "phone"
              ? "Update Phone"
              : type === "email"
              ? "Update Email"
              : type === "address"
              ? "Update Address"
              : "Update Password"}
          </Text>

          {type === "name" && (
            <View style={{flexDirection: "row"}}>
              <View style={{flex: 1}}>
                <Controller
                  control={control}
                  name={"first_name"}
                  render={({field}) => {
                    return (
                      <TextInput
                        placeholder={""}
                        value={field.value}
                        style={styles.modalInput}
                        onChangeText={field.onChange}
                      />
                    );
                  }}
                />
              </View>

              <View style={{flex: 1, marginLeft: 10}}>
                <Controller
                  control={control}
                  name={"last_name"}
                  render={({field}) => {
                    return (
                      <TextInput
                        placeholder={""}
                        value={field.value}
                        style={styles.modalInput}
                        onChangeText={field.onChange}
                      />
                    );
                  }}
                />
              </View>
            </View>
          )}

          {type === "phone" && (
            <View style={{flexDirection: "row"}}>
              <View style={{flex: 1}}>
                <Controller
                  name={"phone"}
                  control={control}
                  render={({field}) => {
                    return (
                      <TextInput
                        placeholder={""}
                        value={field.value}
                        style={styles.modalInput}
                        onChangeText={field.onChange}
                      />
                    );
                  }}
                />
              </View>
            </View>
          )}

          {type === "address" && (
            <View
              style={{
                flexDirection: "row",
                marginVertical: splitAppTheme.space[4],
              }}>
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
                  <MapView
                    initialRegion={initialRegion}
                    style={{
                      height: 200,
                      width: splitAppTheme.sizes.full,
                      borderRadius: splitAppTheme.radii.lg,
                    }}>
                    {!!markerCoordinates && (
                      <Marker
                        draggable
                        coordinate={markerCoordinates}
                        onDragEnd={e => {
                          const {latitude, longitude} =
                            e.nativeEvent.coordinate;
                          setValue("latitude", `${latitude}`);
                          setValue("longitude", `${longitude}`);
                        }}>
                        <MapMarker />
                      </Marker>
                    )}
                  </MapView>
                )
              )}
            </View>
          )}

          {type === "email" && (
            <View style={{flexDirection: "row"}}>
              <View style={{flex: 1}}>
                <Controller
                  name={"email"}
                  control={control}
                  render={({field}) => {
                    return (
                      <TextInput
                        placeholder={""}
                        value={field.value}
                        style={styles.modalInput}
                        onChangeText={field.onChange}
                      />
                    );
                  }}
                />
              </View>
            </View>
          )}

          {type === "password" && (
            <View style={{width: "100%"}}>
              <View style={{marginTop: splitAppTheme.space[3]}}>
                <Controller
                  control={control}
                  name={"old_password"}
                  render={({field}) => {
                    return (
                      <TextInput
                        secureTextEntry
                        value={field.value}
                        style={[
                          styles.modalInput,
                          {
                            marginVertical: splitAppTheme.space[2],
                          },
                        ]}
                        placeholder={"Old Password"}
                        onChangeText={field.onChange}
                      />
                    );
                  }}
                />
              </View>

              <View>
                <Controller
                  name={"password"}
                  control={control}
                  render={({field}) => {
                    return (
                      <TextInput
                        secureTextEntry
                        value={field.value}
                        placeholder={"Password"}
                        style={[
                          styles.modalInput,
                          {
                            marginVertical: splitAppTheme.space[2],
                          },
                        ]}
                        onChangeText={field.onChange}
                      />
                    );
                  }}
                />
              </View>

              <View>
                <Controller
                  control={control}
                  name={"password_confirmation"}
                  render={({field}) => {
                    return (
                      <TextInput
                        secureTextEntry
                        value={field.value}
                        style={[
                          styles.modalInput,
                          {
                            marginVertical: splitAppTheme.space[2],
                            marginBottom: splitAppTheme.space[3],
                          },
                        ]}
                        onChangeText={field.onChange}
                        placeholder={"Confirm Password"}
                      />
                    );
                  }}
                />
              </View>
            </View>
          )}

          <View>
            <AppGradientButton
              width={290}
              title={"Update"}
              color={"primary"}
              variant={"solid"}
              loading={isUpdatingProfile}
              onPress={handleProfileUpdate}
              textProps={{
                style: {
                  color: splitAppTheme.colors.white,
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                },
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
