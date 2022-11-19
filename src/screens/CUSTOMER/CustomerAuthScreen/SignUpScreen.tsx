import React from "react";
import dayjs from "dayjs";
import {splitAppTheme} from "@src/theme";
import DatePicker from "react-native-date-picker";
import {makeGenderLabelFromValue} from "@utils/auth";
import {ErrorMessage} from "@hookform/error-message";
import {useDisclosure} from "react-use-disclosure";
import {Controller, useForm} from "react-hook-form";
import {AuthGender, GenderType} from "@constants/auth";
import ModalSelector from "react-native-modal-selector";
import {CustomerAuthStackRoutes} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import AppGradientButton from "@components/AppGradientButton";
import {CompositeScreenProps} from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";
import {
  RootStackParamList,
  CustomerStackParamList,
  CustomerAuthStackParamList,
} from "@src/navigation";
import {
  Text,
  View,
  Alert,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import useAppToast from "@hooks/useAppToast";
import useRegisterMutation from "@hooks/auth/useRegisterMutation";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import ActionSheet, {ActionSheetRef} from "react-native-actions-sheet";
import {addServerErrors, isResponseResultError} from "@utils/error-handling";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from "react-native-image-picker";

type Props = CompositeScreenProps<
  CompositeScreenProps<
    StackScreenProps<
      CustomerAuthStackParamList,
      typeof CustomerAuthStackRoutes.SIGNUP
    >,
    StackScreenProps<CustomerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

type FormValues = {
  image: {
    name: string;
    type: string;
    uri: string;
  };
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  dob: Date | null;
  password: string;
  password_confirmation: string;
  gender: GenderType | null;
};

const maximumDob = dayjs().subtract(18, "years").toDate();

const SignUpScreen = ({navigation}: Props) => {
  const toast = useAppToast();
  const {isOpen, toggle} = useDisclosure();
  const actionSheetRef = React.useRef<ActionSheetRef>(null!);

  const {control, handleSubmit, setValue, setError} = useForm<FormValues>({
    defaultValues: {
      image: {
        uri: "",
        type: "",
        name: "",
      },
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      dob: null,
      gender: null,
      password: "",
      password_confirmation: "",
    },
  });

  const {
    mutate: registerUser,
    data: registerResponse,
    error: registerUserError,
    isLoading: isRegisteringUser,
    isError: isRegisterError,
  } = useRegisterMutation();
  useHandleNonFieldError(registerUserError);
  useHandleResponseResultError(registerResponse);

  React.useEffect(() => {
    if (isRegisterError) {
      addServerErrors(registerUserError.field_errors, setError);
    }
  }, [registerUserError, isRegisterError, setError]);

  const handleUserRegistration = handleSubmit(({dob, ...values}) => {
    registerUser(
      {
        ...values,
        dob: dayjs(dob).format("YYYY-MM-DD"),
      },
      {
        onSuccess(data) {
          if (!isResponseResultError(data)) {
            toast.success(data.success);
            navigation.navigate(CustomerAuthStackRoutes.EMAIL_VERIFICATION, {
              email: values.email,
            });
          }
        },
      },
    );
  });

  const handleImageResult = (result: ImagePickerResponse) => {
    if (result.errorCode) {
      switch (result.errorCode) {
        case "camera_unavailable":
          Alert.alert("Error", "Your device has no camera");
          break;
        case "permission":
          Alert.alert(
            "Permission Error",
            "Please allow permission to open camera and gallery",
          );
          break;
        default:
          Alert.alert("Error", result.errorMessage);
          break;
      }
    }
    if (
      !result.didCancel &&
      result.assets !== undefined &&
      result.assets.length === 1
    ) {
      setValue("image.uri", result.assets[0].uri!);
      setValue("image.type", result.assets[0].type!);
      setValue("image.name", result.assets[0].fileName!);
    }
  };

  const handleTakePicture = async () => {
    try {
      // You can also use as a promise without 'callback':
      const result = await launchCamera({
        quality: 0.8,
        maxWidth: 800,
        maxHeight: 800,
        mediaType: "photo",
      });

      handleImageResult(result);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  };

  const handleSelectImage = async () => {
    try {
      // You can also use as a promise without 'callback':
      const result = await launchImageLibrary({
        quality: 0.8,
        maxWidth: 800,
        maxHeight: 800,
        mediaType: "photo",
      });

      handleImageResult(result);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: "#FFFFFF",
        padding: splitAppTheme.space[6],
      }}>
      <FocusAwareStatusBar
      // barStyle={"dark-content"}
      // backgroundColor={splitAppTheme.colors.white}
      />

      <View style={{flex: 1, marginTop: 20}}>
        <Controller
          name={"image.uri"}
          control={control}
          render={({field}) => (
            <React.Fragment>
              <TouchableOpacity
                onPress={() => {
                  if (actionSheetRef.current.isOpen()) {
                    actionSheetRef.current.hide();
                  } else {
                    actionSheetRef.current.show();
                  }
                }}>
                {!!field.value ? (
                  <Image
                    source={{
                      uri: field.value,
                    }}
                    style={{
                      width: 100,
                      height: 100,
                      marginBottom: 10,
                      borderRadius: 50,
                      alignSelf: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#D6D6D6",
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: 100,
                      height: 100,
                      marginBottom: 10,
                      borderRadius: 50,
                      alignSelf: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#D6D6D6",
                    }}>
                    <FontAwesome name="camera" size={30} color={"#BA8D9F"} />
                  </View>
                )}
              </TouchableOpacity>

              <ActionSheet ref={actionSheetRef}>
                <TouchableOpacity onPress={handleTakePicture}>
                  <View
                    style={{
                      padding: splitAppTheme.space[3],
                    }}>
                    <Text>Take photo</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSelectImage}>
                  <View
                    style={{
                      padding: splitAppTheme.space[3],
                    }}>
                    <Text>Select photo</Text>
                  </View>
                </TouchableOpacity>
              </ActionSheet>
            </React.Fragment>
          )}
        />

        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <Controller
            control={control}
            rules={{
              required: "This field is required",
            }}
            name={"first_name"}
            render={({field, formState: {errors}}) => (
              <View style={{width: "47%"}}>
                <View style={[styles.SectionStyle]}>
                  <TextInput
                    value={field.value}
                    onBlur={field.onBlur}
                    placeholder="First Name"
                    onChangeText={field.onChange}
                    style={{flex: 1, paddingLeft: 20}}
                  />
                </View>

                <ErrorMessage
                  errors={errors}
                  name={field.name}
                  render={({message}) => (
                    <Text
                      style={{
                        color: splitAppTheme.colors.red[300],
                        marginTop: 5,
                      }}>
                      {message}
                    </Text>
                  )}
                />
              </View>
            )}
          />

          <Controller
            control={control}
            rules={{
              required: "This field is required",
            }}
            name={"last_name"}
            render={({field, formState: {errors}}) => (
              <View style={{width: "47%"}}>
                <View style={[styles.SectionStyle]}>
                  <TextInput
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    placeholder="Last Name"
                    style={{flex: 1, paddingLeft: 20}}
                  />
                </View>

                <ErrorMessage
                  errors={errors}
                  name={field.name}
                  render={({message}) => (
                    <Text
                      style={{
                        color: splitAppTheme.colors.red[300],
                        marginTop: 5,
                      }}>
                      {message}
                    </Text>
                  )}
                />
              </View>
            )}
          />
        </View>

        <Controller
          name={"dob"}
          rules={{
            required: "This field is required",
          }}
          control={control}
          render={({field, formState: {errors}}) => (
            <React.Fragment>
              <TouchableOpacity onPress={() => toggle()}>
                <View style={styles.SectionStyle}>
                  <View
                    style={{
                      width: "100%",
                      paddingLeft: 20,
                      justifyContent: "flex-start",
                    }}>
                    <Text>
                      {field.value
                        ? dayjs(field.value).format("YYYY-MM-DD")
                        : "Date of Birth"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <DatePicker
                modal
                mode={"date"}
                open={isOpen}
                maximumDate={maximumDob}
                date={field.value ?? maximumDob}
                onCancel={() => {
                  toggle();
                }}
                onConfirm={date => {
                  field.onChange(date);
                  toggle();
                }}
              />

              <ErrorMessage
                errors={errors}
                name={field.name}
                render={({message}) => (
                  <Text
                    style={{
                      marginTop: 5,
                      color: splitAppTheme.colors.red[300],
                    }}>
                    {message}
                  </Text>
                )}
              />
            </React.Fragment>
          )}
        />

        <Controller
          name={"gender"}
          rules={{
            required: "This field is required",
          }}
          control={control}
          render={({field, formState: {errors}}) => (
            <React.Fragment>
              <ModalSelector
                data={[
                  {
                    key: 1,
                    label: makeGenderLabelFromValue(AuthGender.MEN),
                    value: AuthGender.MEN,
                  },
                  {
                    key: 2,
                    label: makeGenderLabelFromValue(AuthGender.WOMEN),
                    value: AuthGender.WOMEN,
                  },
                  {
                    key: 3,
                    label: makeGenderLabelFromValue(AuthGender.OTHER),
                    value: AuthGender.OTHER,
                  },
                ]}
                supportedOrientations={["landscape"]}
                onChange={option => {
                  // this.setState({textInputValue: option.label});
                  field.onChange(option.value);
                }}>
                {/* <TouchableOpacity
                onPress={() => {
                  Alert.prompt("Select Gender", "Please select your gender", [
                    {
                      text: "Male",
                      onPress() {
                        field.onChange(AuthGender.MEN);
                      },
                    },
                    {
                      text: "Female",
                      onPress() {
                        field.onChange(AuthGender.WOMEN);
                      },
                    },
                    {
                      text: "Other",
                      onPress() {
                        field.onChange(AuthGender.OTHER);
                      },
                    },
                  ]);
                }}
                
                > */}
                <View style={styles.SectionStyle}>
                  <View
                    style={{
                      width: "100%",
                      paddingLeft: 20,
                      justifyContent: "flex-start",
                    }}>
                    <Text>
                      {field.value === null
                        ? "Gender"
                        : makeGenderLabelFromValue(field.value)}
                    </Text>
                  </View>
                </View>
                {/* </TouchableOpacity> */}
              </ModalSelector>

              <ErrorMessage
                errors={errors}
                name={field.name}
                render={({message}) => (
                  <Text
                    style={{
                      marginTop: 5,
                      color: splitAppTheme.colors.red[300],
                    }}>
                    {message}
                  </Text>
                )}
              />
            </React.Fragment>
          )}
        />

        <Controller
          name={"phone"}
          rules={{
            required: "This field is required",
          }}
          control={control}
          render={({field, formState: {errors}}) => (
            <React.Fragment>
              <View style={styles.SectionStyle}>
                <TextInput
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  placeholder="Phone Number"
                  style={{flex: 1, paddingLeft: 20}}
                />
              </View>

              <ErrorMessage
                errors={errors}
                name={field.name}
                render={({message}) => (
                  <Text
                    style={{
                      color: splitAppTheme.colors.red[300],
                      marginTop: 5,
                    }}>
                    {message}
                  </Text>
                )}
              />
            </React.Fragment>
          )}
        />

        <Controller
          name={"email"}
          rules={{
            required: "This field is required",
          }}
          control={control}
          render={({field, formState: {errors}}) => (
            <React.Fragment>
              <View style={styles.SectionStyle}>
                <TextInput
                  placeholder="Email"
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  style={{flex: 1, paddingLeft: 20}}
                />
              </View>

              <ErrorMessage
                errors={errors}
                name={field.name}
                render={({message}) => (
                  <Text
                    style={{
                      color: splitAppTheme.colors.red[300],
                      marginTop: 5,
                    }}>
                    {message}
                  </Text>
                )}
              />
            </React.Fragment>
          )}
        />

        <Controller
          name={"password"}
          rules={{
            required: "This field is required",
          }}
          control={control}
          render={({field, formState: {errors}}) => (
            <React.Fragment>
              <View style={styles.SectionStyle}>
                <TextInput
                  secureTextEntry
                  placeholder="Password"
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  style={{flex: 1, paddingLeft: 20}}
                />
              </View>

              <ErrorMessage
                errors={errors}
                name={field.name}
                render={({message}) => (
                  <Text
                    style={{
                      color: splitAppTheme.colors.red[300],
                      marginTop: 5,
                    }}>
                    {message}
                  </Text>
                )}
              />
            </React.Fragment>
          )}
        />

        <Controller
          control={control}
          name={"password_confirmation"}
          rules={{
            required: "This field is required",
          }}
          render={({field, formState: {errors}}) => (
            <React.Fragment>
              <View style={styles.SectionStyle}>
                <TextInput
                  secureTextEntry
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  placeholder="Confirm Password"
                  style={{flex: 1, paddingLeft: 20}}
                />
              </View>

              <ErrorMessage
                errors={errors}
                name={field.name}
                render={({message}) => (
                  <Text
                    style={{
                      color: splitAppTheme.colors.red[300],
                      marginTop: 5,
                    }}>
                    {message}
                  </Text>
                )}
              />
            </React.Fragment>
          )}
        />

        <View style={{marginTop: splitAppTheme.space[2]}}>
          <AppGradientButton
            width={"100%"}
            color={"primary"}
            touchableOpacityProps={{
              disabled: isRegisteringUser,
            }}
            variant={"solid"}
            title={"Sign Up"}
            onPress={handleUserRegistration}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  SectionStyle: {
    height: 50,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#F4F5F7",
  },
});

export default SignUpScreen;
