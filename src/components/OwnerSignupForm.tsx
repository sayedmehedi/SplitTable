import React from "react";
import {splitAppTheme} from "@src/theme";
import FastImage from "react-native-fast-image";
import {RootStackRoutes} from "@constants/routes";
import {RootStackParamList} from "@src/navigation";
import {ErrorMessage} from "@hookform/error-message";
import {Controller, useForm} from "react-hook-form";
import {StackNavigationProp} from "@react-navigation/stack";
import AppGradientButton from "@components/AppGradientButton";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {AutocompleteDropdown} from "react-native-autocomplete-dropdown";
import {
  Text,
  View,
  Alert,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import useAppToast from "@hooks/useAppToast";
import useRegisterMutation from "@hooks/auth/useRegisterMutation";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useGetLocationsQuery from "@hooks/clubs/useGetLocationsQuery";
import ActionSheet, {ActionSheetRef} from "react-native-actions-sheet";
import {addServerErrors, isResponseResultError} from "@utils/error-handling";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from "react-native-image-picker";

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  typeof RootStackRoutes.SIGNUP
>;

type FormValues = {
  image: {
    name: string;
    type: string;
    uri: string;
  };
  first_name: string;
  last_name: string;
  club: string;
  location_id: string;
  job_role: string;
  phone: string;
  email: string;
  dob: string;
  password: string;
  password_confirmation: string;
};

const OwnerSignUpForm = ({navigation}: {navigation: NavigationProp}) => {
  const toast = useAppToast();
  const actionSheetRef = React.useRef<ActionSheetRef>(null!);

  const {
    error: locationsError,
    data: locationsResponse,
    isLoading: isLocationsLoading,
  } = useGetLocationsQuery();
  useHandleNonFieldError(locationsError);

  const {control, handleSubmit, setValue, setError} = useForm<FormValues>({
    defaultValues: {
      image: {
        uri: "",
        type: "",
        name: "",
      },
      first_name: "",
      last_name: "",
      club: "",
      location_id: "",
      job_role: "",
      phone: "",
      email: "",
      dob: "",
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

  const locationList = React.useMemo(() => {
    return (
      locationsResponse?.items?.map(location => ({
        id: location.id.toString(),
        title: location.location,
      })) ?? []
    );
  }, [locationsResponse?.items]);

  const handleUserRegistration = handleSubmit(values => {
    registerUser(values, {
      onSuccess(data) {
        if (!isResponseResultError(data)) {
          toast.success(data.success);
          navigation.navigate(RootStackRoutes.EMAIL_VERIFICATION, {
            email: values.email,
          });
        }
      },
    });
  });

  const handleImageResult = (result: ImagePickerResponse) => {
    actionSheetRef.current.hide();

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
      setValue("image.uri", result.assets[0].uri!, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      setValue("image.type", result.assets[0].type!, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      setValue("image.name", result.assets[0].fileName!, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
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
      <View style={{flex: 1, marginTop: 20}}>
        <Controller
          name={"image.uri"}
          rules={{
            required: "This field is required",
          }}
          control={control}
          render={({field, formState: {errors}}) => (
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
                  <FastImage
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

              <ActionSheet ref={actionSheetRef}>
                <View
                  style={{
                    paddingTop: splitAppTheme.space[3],
                  }}>
                  <TouchableOpacity onPress={handleTakePicture}>
                    <View
                      style={{
                        padding: splitAppTheme.space[3],
                      }}>
                      <Text
                        style={{
                          fontSize: splitAppTheme.fontSizes.md,
                          fontFamily:
                            splitAppTheme.fontConfig.Roboto[500].normal,
                        }}>
                        Take photo
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleSelectImage}>
                    <View
                      style={{
                        padding: splitAppTheme.space[3],
                      }}>
                      <Text
                        style={{
                          fontSize: splitAppTheme.fontSizes.md,
                          fontFamily:
                            splitAppTheme.fontConfig.Roboto[500].normal,
                        }}>
                        Select photo
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
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
          name={"club"}
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
                  placeholder="Club/Bar Name"
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
          name={"location_id"}
          rules={{
            required: "This field is required",
          }}
          control={control}
          render={({field, formState: {errors}}) => (
            <React.Fragment>
              <View style={[styles.SectionStyle, {zIndex: 10}]}>
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
          name={"job_role"}
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
                  style={{flex: 1, paddingLeft: 20}}
                  placeholder="Your Position/Job Role"
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

        <View
          style={{
            marginTop: splitAppTheme.space[3],
          }}>
          <AppGradientButton
            width={"100%"}
            color={"primary"}
            variant={"solid"}
            title={"Sign Up"}
            loading={isRegisteringUser}
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

export default OwnerSignUpForm;
