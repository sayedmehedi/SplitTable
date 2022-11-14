import React from "react";
import {TableType} from "@src/models";
import {Controller, useForm} from "react-hook-form";
import useAppToast from "@hooks/useAppToast";
import {OwnerStackRoutes} from "@constants/routes";
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import ActionSheet, {ActionSheetRef} from "react-native-actions-sheet";
import {CompositeScreenProps} from "@react-navigation/native";
import {OwnerStackParamList, RootStackParamList} from "@src/navigation";
import {AppTableTypes} from "@constants/table";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import useCreateOwnerTableMutation from "@hooks/clubs/useCreateOwnerTableMutation";
import {addServerErrors, isResponseResultError} from "@utils/error-handling";
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import dayjs from "dayjs";
import {splitAppTheme} from "@src/theme";
import {useDisclosure} from "react-use-disclosure";
import DatePicker from "react-native-date-picker";
import {ErrorMessage} from "@hookform/error-message";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {numberTransformer} from "@utils/form";
import AppGradientButton from "@components/AppGradientButton";
import useGetTableDetailsQuery from "@hooks/clubs/useGetTableDetailsQuery";
import {isSplitTableDetails} from "@utils/table";
import useUpdateOwnerTableMutation from "@hooks/clubs/useUpdateOwnerTableMutation";

type Props = CompositeScreenProps<
  StackScreenProps<OwnerStackParamList, typeof OwnerStackRoutes.UPSERT_TABLE>,
  StackScreenProps<RootStackParamList>
>;

type FormValues = {
  name: string;
  type: TableType;
  date_time: Date | null;
  performer?: string;
  cuisines?: string;
  age_limit?: number;
  description?: string;
  image: {
    name: string;
    type: string;
    uri: string;
  };

  price: number;
  total_seat: number;

  men_seat: number;
  men_seat_price: number;
  women_seat: number;
  women_seat_price: number;
};

const minimunDateTime = dayjs().toDate();

export default function UpsertTableScreen({route, navigation}: Props) {
  const toast = useAppToast();
  const {isOpen, toggle} = useDisclosure();
  const actionSheetRef = React.useRef<ActionSheetRef>(null!);

  const {control, handleSubmit, setValue, setError, watch} =
    useForm<FormValues>({
      defaultValues: {
        name: "",
        date_time: null,
        type: AppTableTypes.BOOKED,
        performer: "",
        cuisines: "",
        description: "",

        // age_limit: "",
        // price: "",
        // total_seat: "",

        // men_seat: "",
        // men_seat_price: "",
        // women_seat: "",
        // women_seat_price: "",
      },
    });

  const tableType = watch("type");

  const {
    error: tableDetailsError,
    data: tableDetailsResponse,
    isLoading: isTableDetailsLoading,
  } = useGetTableDetailsQuery(
    route.params.actionMode === "update" ? route.params.tableId : 0,
    {
      enabled: route.params.actionMode === "update",
    },
  );
  useHandleNonFieldError(tableDetailsError);

  React.useEffect(() => {
    if (!!tableDetailsResponse && !("error" in tableDetailsResponse)) {
      setValue(
        "type",
        isSplitTableDetails(tableDetailsResponse)
          ? AppTableTypes.SPLIT
          : AppTableTypes.BOOKED,
      );

      setValue("name", tableDetailsResponse.name);

      // setValue("date_time", dayjs(tableDetailsResponse.date).toDate());
      // console.log(
      //   tableDetailsResponse.date,
      //   dayjs("15 Nov, 04:11 AM", "DD MMM, HH:mm A"),
      // );
      // setValue("date_time", dayjs("Nov 2022", "MMM YYYY").toDate());

      if (tableDetailsResponse.min_age !== undefined) {
        setValue("age_limit", tableDetailsResponse.min_age);
      }

      if (tableDetailsResponse.performer !== undefined) {
        setValue("performer", tableDetailsResponse.performer);
      }

      if (tableDetailsResponse.cuisines !== undefined) {
        setValue("cuisines", tableDetailsResponse.cuisines);
      }

      if (tableDetailsResponse.description !== undefined) {
        setValue("description", tableDetailsResponse.description);
      }

      if (isSplitTableDetails(tableDetailsResponse)) {
        setValue("men_seat", tableDetailsResponse.men_seat);
        setValue(
          "men_seat_price",
          parseFloat(tableDetailsResponse.men_seat_price),
        );
        setValue("women_seat", tableDetailsResponse.women_seat);
        setValue(
          "women_seat_price",
          parseFloat(tableDetailsResponse.women_seat_price),
        );
      } else {
        setValue("price", parseFloat(tableDetailsResponse.price));
        setValue("total_seat", tableDetailsResponse.total_seat);
      }
    }
  }, [setValue, tableDetailsResponse]);

  const {
    mutate: createTable,
    data: createResponse,
    isLoading: isCreating,
    isError: isCreateError,
    error: createError,
  } = useCreateOwnerTableMutation();
  useHandleNonFieldError(createError);
  useHandleResponseResultError(createResponse);

  const {
    mutate: updateTable,
    data: updateResponse,
    isLoading: isUpdating,
    isError: isUpdateError,
    error: upateError,
  } = useUpdateOwnerTableMutation();
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

  const handleUpsertTable = handleSubmit(values => {
    const {
      type,
      date_time,
      men_seat,
      women_seat,
      men_seat_price,
      women_seat_price,
      price,
      total_seat,
      ...data
    } = values;
    const splitTablePaylod = {
      type: AppTableTypes.SPLIT,
      men_seat,
      women_seat,
      men_seat_price,
      women_seat_price,
      ...data,
      date_time: dayjs(date_time).format("YYYY-MM-DD HH:mm:ss"),
    };
    const bookTablePaylod = {
      type: AppTableTypes.BOOKED,
      price,
      total_seat,
      ...data,
      date_time: dayjs(date_time).format("YYYY-MM-DD HH:mm:ss"),
    };

    if (route.params.actionMode === "create") {
      createTable(
        type === AppTableTypes.SPLIT ? splitTablePaylod : bookTablePaylod,
        {
          onSuccess(data) {
            if (!isResponseResultError(data)) {
              toast.success(data.success);
              navigation.navigate(OwnerStackRoutes.MY_TABLES);
            }
          },
        },
      );
    }

    if (route.params.actionMode === "update") {
      updateTable(
        type === AppTableTypes.SPLIT
          ? {...splitTablePaylod, tableId: route.params.tableId}
          : {...bookTablePaylod, tableId: route.params.tableId},
        {
          onSuccess(data) {
            if (!isResponseResultError(data)) {
              toast.success(data.success);
              navigation.navigate(OwnerStackRoutes.MY_TABLES);
            }
          },
        },
      );
    }
  });

  if (route.params.actionMode === "update" && isTableDetailsLoading) {
    return <Text>Loading...</Text>;
  }

  if (
    (route.params.actionMode === "update" && !tableDetailsResponse) ||
    (route.params.actionMode === "update" &&
      !!tableDetailsResponse &&
      "error" in tableDetailsResponse)
  ) {
    return <Text>Not Found</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView
        contentContainerStyle={{
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
                ) : !!tableDetailsResponse?.image ? (
                  <Image
                    source={{
                      uri: tableDetailsResponse.image,
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

        <Controller
          name={"name"}
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
                  placeholder={"Table/Event Name"}
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

        <Controller
          name={"type"}
          rules={{
            required: "This field is required",
          }}
          control={control}
          render={({field, formState: {errors}}) => (
            <React.Fragment>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert("Select", "Please select a table type", [
                      {
                        text: "Booked",
                        onPress() {
                          field.onChange(AppTableTypes.BOOKED);
                        },
                      },
                      {
                        text: "Split",
                        onPress() {
                          field.onChange(AppTableTypes.SPLIT);
                        },
                      },
                    ]);
                  }}>
                  <View
                    style={{
                      height: 50,
                      marginTop: 10,
                      borderRadius: 10,
                      alignItems: "center",
                      flexDirection: "row",
                      backgroundColor: "#F4F5F7",
                      padding: splitAppTheme.space[3],
                    }}>
                    <Text>
                      {field.value === AppTableTypes.BOOKED
                        ? "Booked"
                        : "Split"}
                    </Text>
                  </View>
                </TouchableOpacity>
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
          name={"date_time"}
          rules={{
            required: "This field is required",
          }}
          control={control}
          render={({field, formState: {errors}}) => (
            <React.Fragment>
              <TouchableOpacity onPress={() => toggle()}>
                <View
                  style={[
                    styles.SectionStyle,
                    {
                      height: 50,
                    },
                  ]}>
                  <View
                    style={{
                      width: "100%",
                      paddingLeft: 20,
                      justifyContent: "flex-start",
                    }}>
                    <Text>
                      {field.value
                        ? dayjs(field.value).format("YYYY-MM-DD")
                        : "Date & Time"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <DatePicker
                modal
                open={isOpen}
                mode={"datetime"}
                minimumDate={minimunDateTime}
                date={field.value ?? minimunDateTime}
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

        {tableType === AppTableTypes.BOOKED && (
          <React.Fragment>
            <Controller
              name={"total_seat"}
              shouldUnregister
              rules={{
                required: "This field is required",
              }}
              control={control}
              render={({field, formState: {errors}}) => (
                <React.Fragment>
                  <View style={styles.SectionStyle}>
                    <TextInput
                      onBlur={field.onBlur}
                      value={`${field.value ?? ""}`}
                      placeholder={"Total Seat/Guest"}
                      style={{flex: 1, paddingLeft: 20}}
                      onChangeText={value => field.onChange(value)}
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

            <Controller
              name={"price"}
              shouldUnregister
              rules={{
                required: "This field is required",
              }}
              control={control}
              render={({field, formState: {errors}}) => (
                <React.Fragment>
                  <View style={styles.SectionStyle}>
                    <TextInput
                      onBlur={field.onBlur}
                      value={`${field.value ?? ""}`}
                      placeholder={"Price/Whole table"}
                      style={{flex: 1, paddingLeft: 20}}
                      onChangeText={value => field.onChange(value)}
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
          </React.Fragment>
        )}

        {tableType === AppTableTypes.SPLIT && (
          <React.Fragment>
            <Controller
              name={"men_seat"}
              shouldUnregister
              rules={{
                required: "This field is required",
              }}
              control={control}
              render={({field, formState: {errors}}) => (
                <React.Fragment>
                  <View style={styles.SectionStyle}>
                    <TextInput
                      value={`${field.value ?? ""}`}
                      keyboardType="numeric"
                      onBlur={field.onBlur}
                      placeholder={"Total Men Seat/Guest"}
                      style={{flex: 1, paddingLeft: 20}}
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

            <Controller
              shouldUnregister
              rules={{
                required: "This field is required",
              }}
              name={"men_seat_price"}
              control={control}
              render={({field, formState: {errors}}) => (
                <React.Fragment>
                  <View style={styles.SectionStyle}>
                    <TextInput
                      value={`${field.value ?? ""}`}
                      keyboardType="numeric"
                      onBlur={field.onBlur}
                      placeholder={"Price/Each Men Guest"}
                      style={{flex: 1, paddingLeft: 20}}
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

            <Controller
              shouldUnregister
              rules={{
                required: "This field is required",
              }}
              name={"women_seat"}
              control={control}
              render={({field, formState: {errors}}) => (
                <React.Fragment>
                  <View style={styles.SectionStyle}>
                    <TextInput
                      value={`${field.value ?? ""}`}
                      keyboardType="numeric"
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                      placeholder={"Total Women Seat/Guest"}
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

            <Controller
              shouldUnregister
              rules={{
                required: "This field is required",
              }}
              name={"women_seat_price"}
              control={control}
              render={({field, formState: {errors}}) => (
                <React.Fragment>
                  <View style={styles.SectionStyle}>
                    <TextInput
                      value={`${field.value ?? ""}`}
                      keyboardType="numeric"
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                      placeholder={"Price/Each Women Guest"}
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
          </React.Fragment>
        )}

        <Controller
          name={"performer"}
          control={control}
          render={({field, formState: {errors}}) => (
            <React.Fragment>
              <View style={styles.SectionStyle}>
                <TextInput
                  onBlur={field.onBlur}
                  value={field.value}
                  placeholder={"Performer"}
                  style={{flex: 1, paddingLeft: 20}}
                  onChangeText={value => field.onChange(value)}
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

        <Controller
          name={"cuisines"}
          control={control}
          render={({field, formState: {errors}}) => (
            <React.Fragment>
              <View style={styles.SectionStyle}>
                <TextInput
                  onBlur={field.onBlur}
                  value={field.value}
                  style={{flex: 1, paddingLeft: 20}}
                  placeholder={"Cuisines/Menu Offer"}
                  onChangeText={value => field.onChange(value)}
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

        <Controller
          name={"age_limit"}
          control={control}
          render={({field, formState: {errors}}) => (
            <React.Fragment>
              <View style={styles.SectionStyle}>
                <TextInput
                  value={`${field.value}`}
                  keyboardType="numeric"
                  onBlur={field.onBlur}
                  placeholder={"Age limit"}
                  style={{flex: 1, paddingLeft: 20}}
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

        <Controller
          name={"description"}
          control={control}
          render={({field, formState: {errors}}) => (
            <React.Fragment>
              <View style={styles.SectionStyle}>
                <TextInput
                  multiline
                  numberOfLines={5}
                  value={field.value}
                  onBlur={field.onBlur}
                  textAlignVertical="top"
                  placeholder={"Additional Info"}
                  style={{flex: 1, paddingLeft: 20, height: 100}}
                  onChangeText={value =>
                    field.onChange(numberTransformer.output(value))
                  }
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
            marginTop: splitAppTheme.space[5],
          }}>
          <AppGradientButton
            color="primary"
            variant="solid"
            title="Submit"
            touchableOpacityProps={{
              disabled: isCreating || isUpdating,
            }}
            onPress={handleUpsertTable}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  SectionStyle: {
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#F4F5F7",
  },
});