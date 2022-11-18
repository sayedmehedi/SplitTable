import React from "react";
import {splitAppTheme} from "@src/theme";
import {Controller, useForm} from "react-hook-form";
import {StackScreenProps} from "@react-navigation/stack";
import AntDesign from "react-native-vector-icons/AntDesign";
import AppGradientButton from "@components/AppGradientButton";
import {CompositeScreenProps} from "@react-navigation/native";
import {OwnerStackParamList, RootStackParamList} from "@src/navigation";
import {OwnerMainBottomTabRoutes, OwnerStackRoutes} from "@constants/routes";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import useGetOwnerClubInfoQuery from "@hooks/clubs/useGetOwnerClubInfoQuery";
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import useAppToast from "@hooks/useAppToast";
import {ErrorMessage} from "@hookform/error-message";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import ActionSheet, {ActionSheetRef} from "react-native-actions-sheet";
import {addServerErrors, isResponseResultError} from "@utils/error-handling";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import useCreateOwnerClubMenuMutation from "@hooks/clubs/useCreateOwnerClubMenuMutation";
import useUpdateOwnerClubMenuMutation from "@hooks/clubs/useUpdateOwnerClubMenuMutation";

type Props = CompositeScreenProps<
  StackScreenProps<OwnerStackParamList, typeof OwnerStackRoutes.UPSERT_MENU>,
  StackScreenProps<RootStackParamList>
>;

type FormVlaues = {
  name: string;
  price: number;
  qty: number;
  details: string;
  status: number;
  club_id: number;
  image?: {
    name: string;
    type: string;
    uri: string;
  };
};

const UpsertMenuScreen = ({navigation, route}: Props) => {
  const toast = useAppToast();
  const actionSheetRef = React.useRef<ActionSheetRef>(null!);

  const {data: clubInfoData, isLoading: isClubInfoLoading} =
    useGetOwnerClubInfoQuery();

  const {control, setValue, handleSubmit, setError} = useForm<FormVlaues>({
    defaultValues: {
      name: "",
      details: "",
    },
  });

  React.useEffect(() => {
    if (clubInfoData?.id) {
      setValue("club_id", clubInfoData.id);
    }
  }, [clubInfoData?.id, setValue]);

  React.useEffect(() => {
    if (route.params.actionMode === "update") {
      setValue("name", route.params.menu.name);

      setValue("details", route.params.menu.details);

      setValue("price", parseFloat(route.params.menu.price));

      setValue("qty", route.params.menu.qty);
    }
  }, [
    setValue,
    "menu" in route.params && route.params.menu.id,
    route.params.actionMode,
  ]);

  const {
    mutate: createMenu,
    data: createResponse,
    isLoading: isCreating,
    isError: isCreateError,
    error: createError,
  } = useCreateOwnerClubMenuMutation();
  useHandleNonFieldError(createError);
  useHandleResponseResultError(createResponse);

  const {
    error: upateError,
    mutate: updateMenu,
    data: updateResponse,
    isLoading: isUpdating,
    isError: isUpdateError,
  } = useUpdateOwnerClubMenuMutation();
  useHandleNonFieldError(upateError);
  useHandleResponseResultError(updateResponse);

  React.useEffect(() => {
    if (isUpdateError) {
      addServerErrors(upateError.field_errors, setError);
    }
  }, [upateError, isUpdateError, setError]);

  React.useEffect(() => {
    if (isCreateError) {
      addServerErrors(createError.field_errors, setError);
    }
  }, [createError, isCreateError, setError]);

  const handleUpsert = handleSubmit(
    values => {
      if (route.params.actionMode === "create") {
        createMenu(
          {...values, status: 0},
          {
            onSuccess(data) {
              if (!isResponseResultError(data)) {
                toast.success(data.success);
                navigation.navigate(OwnerStackRoutes.OWNER_MAIN_TABS, {
                  screen: OwnerMainBottomTabRoutes.MENU,
                });
              }
            },
          },
        );
      }

      if (route.params.actionMode === "update") {
        updateMenu(
          {...values, menuId: route.params.menu.id},

          {
            onSuccess(data) {
              if (!isResponseResultError(data)) {
                toast.success(data.success);
                navigation.navigate(OwnerStackRoutes.OWNER_MAIN_TABS, {
                  screen: OwnerMainBottomTabRoutes.MENU,
                });
              }
            },
          },
        );
      }
    },
    errors => {
      console.log("errors", errors);
    },
  );

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

  if (isClubInfoLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        padding: splitAppTheme.space[6],
      }}>
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
              ) : route.params.actionMode === "update" &&
                !!route.params.menu.image ? (
                <Image
                  source={{
                    uri: route.params.menu.image,
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
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FFE1F7",
                  }}>
                  <AntDesign name="camerao" color={"#402B8C"} size={20} />
                  <Text style={{color: "#402B8C", fontSize: 10}}>
                    Add Image
                  </Text>
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

      <View style={{flex: 1, marginTop: 20}}>
        <Controller
          control={control}
          name={"name"}
          render={({field, formState: {errors}}) => (
            <React.Fragment>
              <View style={styles.SectionStyle}>
                <TextInput
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  placeholder={"Menu Title"}
                  style={{flex: 1, paddingLeft: 20}}
                />
              </View>

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

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <View style={[{width: "47%"}]}>
            <Controller
              control={control}
              name={"price"}
              render={({field, formState: {errors}}) => (
                <React.Fragment>
                  <View style={styles.SectionStyle}>
                    <TextInput
                      onBlur={field.onBlur}
                      placeholder={"Price"}
                      value={`${field.value ?? ""}`}
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
          </View>

          <View style={[{width: "47%"}]}>
            <Controller
              name={"qty"}
              control={control}
              render={({field, formState: {errors}}) => (
                <React.Fragment>
                  <View style={styles.SectionStyle}>
                    <TextInput
                      onBlur={field.onBlur}
                      value={`${field.value ?? ""}`}
                      onChangeText={field.onChange}
                      placeholder={"Qty. Stock"}
                      style={{flex: 1, paddingLeft: 20}}
                    />
                  </View>

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
          </View>
        </View>

        <View
          style={{
            marginBottom: 10,
          }}>
          <Controller
            name={"details"}
            control={control}
            render={({field, formState: {errors}}) => (
              <React.Fragment>
                <View style={{height: 100}}>
                  <TextInput
                    style={{
                      flex: 1,
                      borderRadius: 5,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      backgroundColor: "#F4F5F7",
                      padding: splitAppTheme.space[5],
                    }}
                    multiline
                    textAlignVertical="top"
                    placeholder={"Item Short Details"}
                    onBlur={field.onBlur}
                    value={`${field.value ?? ""}`}
                    onChangeText={field.onChange}
                  />
                </View>

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
        </View>

        <AppGradientButton
          width={"100%"}
          title={"Submit"}
          color={"primary"}
          variant={"solid"}
          touchableOpacityProps={{
            disabled: isCreating || isUpdating,
          }}
          onPress={handleUpsert}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  SectionStyle: {
    height: 50,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#F4F5F7",
  },
});

export default UpsertMenuScreen;
