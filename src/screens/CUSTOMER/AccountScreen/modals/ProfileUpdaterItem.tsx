import React from "react";
import styles from "../styles";
import {splitAppTheme} from "@src/theme";
import {useDisclosure} from "react-use-disclosure";
import {Controller, useForm} from "react-hook-form";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import useGetProfileQuery from "@hooks/auth/useGetProfileQuery";
import Feather from "react-native-vector-icons/Feather";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import AppGradientButton from "@components/AppGradientButton";
import {View, Text, TouchableOpacity, Modal, TextInput} from "react-native";
import useUpdateProfileMutation from "@hooks/user/useUpdateProfileMutation";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {addServerErrors, isResponseResultError} from "@utils/error-handling";
import useAppToast from "@hooks/useAppToast";

type Props = {
  type: "name" | "phone" | "email" | "password";
};

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
  phone: string;
};

export default function ProfileUpdaterItem({type}: Props) {
  const toast = useAppToast();
  const {isOpen, toggle} = useDisclosure();
  const {data: profileDataResponse} = useGetProfileQuery();

  const {setValue, control, handleSubmit} = useForm<FormValues>({
    defaultValues: {
      phone: "",
      email: "",
      password: "",
      last_name: "",
      first_name: "",
      old_password: "",
      password_confirmation: "",
    },
  });

  React.useEffect(() => {
    if (profileDataResponse) {
      setValue("email", profileDataResponse.email);
      setValue("phone", profileDataResponse.phone);
    }
  }, [profileDataResponse, setValue]);

  const {
    mutate: updateProfile,
    isLoading: isUpdating,
    error: updateProfileError,
    // isError: isUpdateProfileError,
  } = useUpdateProfileMutation();

  useHandleNonFieldError(updateProfileError);

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
            toggle();
          }
        },
      },
    );
  });

  return (
    <React.Fragment>
      <View style={styles.buttonContainer}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          {type === "name" && (
            <React.Fragment>
              <AntDesign name="user" size={20} color={"#707070"} />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                {profileDataResponse?.name}
              </Text>
            </React.Fragment>
          )}

          {type === "phone" && (
            <React.Fragment>
              <Feather name="phone" size={20} color={"#707070"} />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                {profileDataResponse?.phone}
              </Text>
            </React.Fragment>
          )}

          {type === "password" && (
            <React.Fragment>
              <EvilIcons name="lock" size={30} color={"#707070"} />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                Update Password
              </Text>
            </React.Fragment>
          )}

          {type === "email" && (
            <React.Fragment>
              <Fontisto name="email" size={20} color={"#707070"} />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                {profileDataResponse?.email}
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
          <View style={styles.modalView}>
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
                <View>
                  <Controller
                    control={control}
                    name={"old_password"}
                    render={({field}) => {
                      return (
                        <TextInput
                          secureTextEntry
                          value={field.value}
                          style={styles.modalInput}
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
                          style={styles.modalInput}
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
                          style={styles.modalInput}
                          onChangeText={field.onChange}
                          placeholder={"Confirm Password"}
                        />
                      );
                    }}
                  />
                </View>
              </View>
            )}

            <View style={{marginTop: 10}}>
              <AppGradientButton
                width={290}
                title={"Update"}
                color={"primary"}
                variant={"solid"}
                onPress={handleProfileUpdate}
                touchableOpacityProps={{
                  disabled: isUpdating,
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
