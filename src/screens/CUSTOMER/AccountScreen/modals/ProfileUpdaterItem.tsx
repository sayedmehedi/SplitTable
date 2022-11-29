import React from "react";
import styles from "../styles";
import {splitAppTheme} from "@src/theme";
import {SocialLinks} from "@src/models";
import useAppToast from "@hooks/useAppToast";
import {useDisclosure} from "react-use-disclosure";
import {Controller, useForm} from "react-hook-form";
import MapView, {Marker} from "react-native-maps";
import MapMarker from "@assets/icons/map-marker.svg";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import AppGradientButton from "@components/AppGradientButton";
import {isResponseResultError} from "@utils/error-handling";
import useGetProfileQuery from "@hooks/auth/useGetProfileQuery";
import useGetGeolocationQuery from "@hooks/useGetGeolocationQuery";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useUpdateProfileMutation from "@hooks/user/useUpdateProfileMutation";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {isCustomerProfile} from "@utils/profile";
import truncate from "lodash.truncate";
import {TiktokIcon} from "@constants/iconPath";

type Props = {
  type:
    | "name"
    | "phone"
    | "email"
    | "password"
    | "address"
    | "facebook"
    | "twitter"
    | "linkedin"
    | "youtube"
    | "instagram"
    | "tiktok";
};

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
  social_links: SocialLinks;
};

export default function ProfileUpdaterItem({type}: Props) {
  const toast = useAppToast();
  const {isOpen, toggle} = useDisclosure();
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
      social_links: {
        facebook: "",
        instgram: "",
        linkendin: "",
        tiktok: "",
        twitter: "",
        youtube: "",
      },
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

    if (
      profileDataResponse !== undefined &&
      isCustomerProfile(profileDataResponse) &&
      !!profileDataResponse.social_links?.facebook
    ) {
      setValue(
        "social_links.facebook",
        profileDataResponse.social_links.facebook,
      );
    }

    if (
      profileDataResponse !== undefined &&
      isCustomerProfile(profileDataResponse) &&
      !!profileDataResponse.social_links?.twitter
    ) {
      setValue(
        "social_links.twitter",
        profileDataResponse.social_links.twitter,
      );
    }

    if (
      profileDataResponse !== undefined &&
      isCustomerProfile(profileDataResponse) &&
      !!profileDataResponse.social_links?.tiktok
    ) {
      setValue("social_links.tiktok", profileDataResponse.social_links.tiktok);
    }

    if (
      profileDataResponse !== undefined &&
      isCustomerProfile(profileDataResponse) &&
      !!profileDataResponse.social_links?.linkendin
    ) {
      setValue(
        "social_links.linkendin",
        profileDataResponse.social_links.linkendin,
      );
    }

    if (
      profileDataResponse !== undefined &&
      isCustomerProfile(profileDataResponse) &&
      !!profileDataResponse.social_links?.youtube
    ) {
      setValue(
        "social_links.youtube",
        profileDataResponse.social_links.youtube,
      );
    }

    if (
      profileDataResponse !== undefined &&
      isCustomerProfile(profileDataResponse) &&
      !!profileDataResponse.social_links?.instgram
    ) {
      setValue(
        "social_links.instgram",
        profileDataResponse.social_links.instgram,
      );
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
        : type === "password"
        ? {
            password: values.password,
            old_password: values.old_password,
            password_confirmation: values.password_confirmation,
          }
        : {
            social_links: values.social_links,
          },
      {
        onSuccess(data) {
          console.log("update profile data", data);
          if (!isResponseResultError(data)) {
            toast.success(data.success);
            toggle();
          }
        },
      },
    );
  });

  function getEditText(keyName: keyof SocialLinks) {
    if (
      isCustomerProfile(profileDataResponse) &&
      !profileDataResponse.social_links?.[keyName]
    ) {
      return "Add";
    }

    return "Edit";
  }

  return (
    <React.Fragment>
      <View style={styles.buttonContainer}>
        <React.Fragment>
          {type === "name" && (
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={{flexDirection: "row", flex: 1}}>
                <AntDesign name="user" size={20} color={"#707070"} />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  {profileDataResponse?.name}
                </Text>
              </View>

              <TouchableOpacity onPress={() => toggle()}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}

          {type === "phone" && (
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={{flexDirection: "row", flex: 1}}>
                <Feather name="phone" size={20} color={"#707070"} />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  {profileDataResponse?.phone}
                </Text>
              </View>

              <TouchableOpacity onPress={() => toggle()}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}

          {type === "password" && (
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={{flexDirection: "row", flex: 1}}>
                <MaterialCommunityIcons
                  name="lock-check-outline"
                  size={20}
                  color={"#707070"}
                />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  Update Password
                </Text>
              </View>

              <TouchableOpacity onPress={() => toggle()}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}

          {type === "email" && (
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={{flexDirection: "row", flex: 1}}>
                <Fontisto name="email" size={20} color={"#707070"} />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  {profileDataResponse?.email}
                </Text>
              </View>

              <TouchableOpacity onPress={() => toggle()}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}

          {type === "address" && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
              <View
                style={{
                  width: "80%",
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={20}
                  color={"#707070"}
                />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  {profileDataResponse?.location}
                </Text>
              </View>

              <View style={{flex: 1}} />

              <View>
                <TouchableOpacity onPress={() => toggle()}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {isCustomerProfile(profileDataResponse) && type === "facebook" && (
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={{flexDirection: "row", flex: 1}}>
                <MaterialCommunityIcons
                  name="facebook"
                  size={20}
                  color={"#707070"}
                />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  {!!profileDataResponse?.social_links?.facebook
                    ? truncate(profileDataResponse?.social_links?.facebook)
                    : "Facebook"}
                </Text>
              </View>

              <TouchableOpacity onPress={() => toggle()}>
                <Text style={styles.editText}>{getEditText("facebook")}</Text>
              </TouchableOpacity>
            </View>
          )}

          {isCustomerProfile(profileDataResponse) && type === "twitter" && (
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={{flexDirection: "row", flex: 1}}>
                <MaterialCommunityIcons
                  name="twitter"
                  size={20}
                  color={"#707070"}
                />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  {!!profileDataResponse?.social_links?.twitter
                    ? truncate(profileDataResponse?.social_links?.twitter)
                    : "Twitter"}
                </Text>
              </View>

              <TouchableOpacity onPress={() => toggle()}>
                <Text style={styles.editText}>{getEditText("twitter")}</Text>
              </TouchableOpacity>
            </View>
          )}

          {isCustomerProfile(profileDataResponse) && type === "linkedin" && (
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={{flexDirection: "row", flex: 1}}>
                <MaterialCommunityIcons
                  name="linkedin"
                  size={20}
                  color={"#707070"}
                />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  {!!profileDataResponse?.social_links?.linkendin
                    ? truncate(profileDataResponse?.social_links?.linkendin)
                    : "Linkedin"}
                </Text>
              </View>

              <TouchableOpacity onPress={() => toggle()}>
                <Text style={styles.editText}>{getEditText("linkendin")}</Text>
              </TouchableOpacity>
            </View>
          )}

          {isCustomerProfile(profileDataResponse) && type === "instagram" && (
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={{flexDirection: "row", flex: 1}}>
                <MaterialCommunityIcons
                  name="instagram"
                  size={20}
                  color={"#707070"}
                />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  {!!profileDataResponse?.social_links?.instgram
                    ? truncate(profileDataResponse?.social_links?.instgram)
                    : "Instagram"}
                </Text>
              </View>

              <TouchableOpacity onPress={() => toggle()}>
                <Text style={styles.editText}>{getEditText("instgram")}</Text>
              </TouchableOpacity>
            </View>
          )}

          {isCustomerProfile(profileDataResponse) && type === "youtube" && (
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={{flexDirection: "row", flex: 1}}>
                <MaterialCommunityIcons
                  name="youtube"
                  size={20}
                  color={"#707070"}
                />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  {!!profileDataResponse?.social_links?.youtube
                    ? truncate(profileDataResponse?.social_links?.youtube)
                    : "Youtube"}
                </Text>
              </View>

              <TouchableOpacity onPress={() => toggle()}>
                <Text style={styles.editText}>{getEditText("youtube")}</Text>
              </TouchableOpacity>
            </View>
          )}

          {isCustomerProfile(profileDataResponse) && type === "tiktok" && (
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={{flexDirection: "row", flex: 1}}>
                <TiktokIcon height={20} width={20} color={"#707070"} />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  {!!profileDataResponse?.social_links?.tiktok
                    ? truncate(profileDataResponse?.social_links?.tiktok)
                    : "Tiktok"}
                </Text>
              </View>

              <TouchableOpacity onPress={() => toggle()}>
                <Text style={styles.editText}>{getEditText("tiktok")}</Text>
              </TouchableOpacity>
            </View>
          )}
        </React.Fragment>
      </View>

      <Modal transparent visible={isOpen} onRequestClose={() => toggle()}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalView, {padding: splitAppTheme.space[4]}]}>
            <TouchableOpacity
              onPress={() => toggle()}
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
                : type === "password"
                ? "Update Password"
                : type === "facebook"
                ? "Update Facebook"
                : type === "twitter"
                ? "Update Twitter"
                : type === "instagram"
                ? "Update Instagram"
                : type === "linkedin"
                ? "Update Linkedin"
                : type === "tiktok"
                ? "Update Tiktok"
                : type === "youtube"
                ? "Update Youtube"
                : ""}
            </Text>

            {type === "name" && (
              <View
                style={{
                  flexDirection: "row",
                }}>
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

            {type === "facebook" && (
              <View style={{flexDirection: "row"}}>
                <View style={{flex: 1}}>
                  <Controller
                    name={"social_links.facebook"}
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

            {type === "twitter" && (
              <View style={{flexDirection: "row"}}>
                <View style={{flex: 1}}>
                  <Controller
                    name={"social_links.twitter"}
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

            {type === "linkedin" && (
              <View style={{flexDirection: "row"}}>
                <View style={{flex: 1}}>
                  <Controller
                    name={"social_links.linkendin"}
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

            {type === "youtube" && (
              <View style={{flexDirection: "row"}}>
                <View style={{flex: 1}}>
                  <Controller
                    name={"social_links.youtube"}
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

            {type === "instagram" && (
              <View style={{flexDirection: "row"}}>
                <View style={{flex: 1}}>
                  <Controller
                    name={"social_links.instgram"}
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

            {type === "tiktok" && (
              <View style={{flexDirection: "row"}}>
                <View style={{flex: 1}}>
                  <Controller
                    name={"social_links.tiktok"}
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

            <View
              style={{
                marginTop: splitAppTheme.space[3],
              }}>
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
    </React.Fragment>
  );
}
