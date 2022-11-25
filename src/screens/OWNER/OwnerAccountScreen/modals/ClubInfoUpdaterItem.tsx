import React from "react";
import styles from "../styles";
import {splitAppTheme} from "@src/theme";
import useAppToast from "@hooks/useAppToast";
import {useDisclosure} from "react-use-disclosure";
import {Controller, useForm} from "react-hook-form";
import Entypo from "react-native-vector-icons/Entypo";
import {isResponseResultError} from "@utils/error-handling";
import AppGradientButton from "@components/AppGradientButton";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
} from "react-native";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import useUpdateOwnerClubInfoMutation from "@hooks/clubs/useUpdateOwnerClubInfoMutation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import useGetOwnerClubInfoQuery from "@hooks/clubs/useGetOwnerClubInfoQuery";
import {AutocompleteDropdown} from "react-native-autocomplete-dropdown";
import useGetLocationsQuery from "@hooks/clubs/useGetLocationsQuery";
import {ErrorMessage} from "@hookform/error-message";

type Props = {
  type: "name" | "job_role" | "location";
};

type FormValues = {
  name: string;
  job_role: string;
  location_id: string;
};

export default function ClubInfoUpdaterItem({type}: Props) {
  const toast = useAppToast();
  const {isOpen, toggle} = useDisclosure();
  const {data: clubInfoResponse} = useGetOwnerClubInfoQuery();

  const {
    error: locationsError,
    data: locationsResponse,
    isLoading: isLocationsLoading,
  } = useGetLocationsQuery();
  useHandleNonFieldError(locationsError);

  const locationList = React.useMemo(() => {
    return (
      locationsResponse?.items?.map(location => ({
        id: location.id.toString(),
        title: location.location,
      })) ?? []
    );
  }, [locationsResponse?.items]);

  const {setValue, control, handleSubmit} = useForm<FormValues>({
    defaultValues: {
      name: "",
      job_role: "",
    },
  });

  React.useEffect(() => {
    if (clubInfoResponse) {
      setValue("name", clubInfoResponse.name);
      setValue("job_role", clubInfoResponse.job_role);
    }
  }, [clubInfoResponse, setValue]);

  const {
    mutate: updateClubInfo,
    error: updateClubInfoError,
    data: updateClubInfoResponse,
    isLoading: isUpdatingClubInfo,
  } = useUpdateOwnerClubInfoMutation();
  useHandleNonFieldError(updateClubInfoError);
  useHandleResponseResultError(updateClubInfoResponse);

  const handleProfileUpdate = handleSubmit(values => {
    updateClubInfo(values, {
      onSuccess(data) {
        console.log("update profile data", data);
        if (!isResponseResultError(data)) {
          toast.success(data.success);
          toggle();
        }
      },
    });
  });

  return (
    <React.Fragment>
      <View style={styles.buttonContainer}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          {type === "name" && (
            <React.Fragment>
              <MaterialCommunityIcons
                name="food-fork-drink"
                size={20}
                color={"#707070"}
              />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                {clubInfoResponse?.name}
              </Text>
            </React.Fragment>
          )}

          {type === "job_role" && (
            <React.Fragment>
              <MaterialCommunityIcons
                name="card-account-details-outline"
                size={20}
                color={"#707070"}
              />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                {clubInfoResponse?.job_role}
              </Text>
            </React.Fragment>
          )}

          {type === "location" && (
            <React.Fragment>
              <MaterialCommunityIcons
                size={20}
                name="map-check-outline"
                color={"#707070"}
              />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                {clubInfoResponse?.location}
              </Text>
            </React.Fragment>
          )}
        </View>

        <TouchableOpacity onPress={() => toggle()}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
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
                ? "Update Club Name"
                : type === "job_role"
                ? "Update Job Role"
                : "Update Location"}
            </Text>

            {type === "name" && (
              <View style={{flexDirection: "row"}}>
                <Controller
                  control={control}
                  name={"name"}
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
            )}

            {type === "job_role" && (
              <View style={{flexDirection: "row"}}>
                <Controller
                  name={"job_role"}
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
            )}

            {type === "location" && (
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: splitAppTheme.space[4],
                }}>
                <Controller
                  name={"location_id"}
                  rules={{
                    required: "This field is required",
                  }}
                  control={control}
                  render={({field, formState: {errors}}) => (
                    <>
                      <View
                        style={[
                          {flex: 1},
                          Platform.select({ios: {zIndex: 10}}),
                        ]}>
                        <AutocompleteDropdown
                          inputHeight={50}
                          dataSet={locationList}
                          loading={isLocationsLoading}
                          containerStyle={{flexGrow: 1, flexShrink: 1}}
                          onSelectItem={item => {
                            field.onChange(item?.id ?? "");
                          }}
                          textInputProps={{
                            autoCorrect: false,
                            autoCapitalize: "none",
                            placeholder: "Club Location",
                            style: {
                              borderRadius: 0,
                              color: splitAppTheme.colors.black,
                            },
                          }}
                          rightButtonsContainerStyle={{
                            right: 8,
                            height: 30,

                            alignSelf: "center",
                          }}
                          inputContainerStyle={{
                            borderRadius: 0,
                            backgroundColor: "#F4F5F7",
                          }}
                        />
                      </View>

                      <ErrorMessage
                        errors={errors}
                        name={field.name}
                        render={({message}) => (
                          <Text
                            style={{
                              marginTop: 5,
                              textAlign: "center",
                              color: splitAppTheme.colors.red[300],
                            }}>
                            {message}
                          </Text>
                        )}
                      />
                    </>
                  )}
                />
              </View>
            )}

            <View>
              <AppGradientButton
                width={290}
                title={"Update"}
                color={"primary"}
                variant={"solid"}
                onPress={handleProfileUpdate}
                touchableOpacityProps={{
                  disabled: isUpdatingClubInfo,
                }}
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
