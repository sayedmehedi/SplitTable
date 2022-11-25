import React from "react";
import dayjs from "dayjs";
import styles from "../styles";
import {splitAppTheme} from "@src/theme";
import useAppToast from "@hooks/useAppToast";
import DatePicker from "react-native-date-picker";
import {useDisclosure} from "react-use-disclosure";
import {Controller, useForm} from "react-hook-form";
import {OwnerStackRoutes} from "@constants/routes";
import {ErrorMessage} from "@hookform/error-message";
import Entypo from "react-native-vector-icons/Entypo";
import {isResponseResultError} from "@utils/error-handling";
import AppGradientButton from "@components/AppGradientButton";
import {StackNavigationProp} from "@react-navigation/stack";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {OwnerStackParamList, RootStackParamList} from "@src/navigation";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {Clock, MenuIcon} from "@constants/iconPath";
import useGetOwnerClubInfoQuery from "@hooks/clubs/useGetOwnerClubInfoQuery";
import {CompositeNavigationProp, useNavigation} from "@react-navigation/native";
import useUpdateOwnerClubInfoMutation from "@hooks/clubs/useUpdateOwnerClubInfoMutation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  type: "time" | "cuisine" | "cost" | "about" | "slider";
};

type FormValues = {
  opening_time: Date | null;
  closing_time: Date | null;
  cuisine: string;
  avg_cost_min: string;
  avg_cost_max: string;
  about: string;
};

function timeToDate(time: string) {
  const [hour, min, sec] = time.split(":") as [string, string, string];
  const date = new Date();
  date.setHours(parseInt(hour), parseInt(min), parseInt(sec));

  return date;
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<OwnerStackParamList, typeof OwnerStackRoutes.INFORMATION>,
  StackNavigationProp<RootStackParamList>
>;

export default function ProfileUpdaterItem({type}: Props) {
  const toast = useAppToast();
  const navigation = useNavigation<NavigationProp>();
  const {isOpen: isModalOpen, toggle: toggleModal} = useDisclosure();
  const {isOpen: isOpeningTimeOpen, toggle: toggleOpeningTime} =
    useDisclosure();
  const {isOpen: isClosingTimeOpen, toggle: toggleClosingTime} =
    useDisclosure();

  const {data: clubInfoData, isLoading: isLoadingClubInfo} =
    useGetOwnerClubInfoQuery();

  const {setValue, control, handleSubmit} = useForm<FormValues>({
    defaultValues: {},
  });

  React.useEffect(() => {
    if (clubInfoData?.about) {
      setValue("about", clubInfoData.about);
    }

    if (clubInfoData?.opening_time) {
      setValue("opening_time", timeToDate(clubInfoData.opening_time));
    }

    if (clubInfoData?.closing_time) {
      setValue("closing_time", timeToDate(clubInfoData.closing_time));
    }

    if (clubInfoData?.cuisine) {
      setValue("cuisine", clubInfoData.cuisine);
    }

    if (clubInfoData?.avg_cost_max !== undefined) {
      setValue("avg_cost_max", clubInfoData.avg_cost_max);
    }

    if (clubInfoData?.avg_cost_min !== undefined) {
      setValue("avg_cost_min", clubInfoData.avg_cost_min);
    }
  }, [clubInfoData, setValue]);

  const {
    mutate: updateClubInfo,
    isLoading: isUpdating,
    error: updateError,
    // isError: isUpdateProfileError,
  } = useUpdateOwnerClubInfoMutation();

  console.log("updateProfileError", updateError);

  useHandleNonFieldError(updateError);

  const handleProfileUpdate = handleSubmit(values => {
    const {opening_time, closing_time, ...rest} = values;

    const payload = {
      ...rest,

      opening_time: !!opening_time
        ? dayjs(opening_time).format("HH:mm:ss")
        : undefined,
      closing_time: !!closing_time
        ? dayjs(closing_time).format("HH:mm:ss")
        : undefined,
    };

    updateClubInfo(payload, {
      onSuccess(data) {
        if (!isResponseResultError(data)) {
          toast.success(data.success);
          toggleModal();
        }
      },
    });
  });

  if (isLoadingClubInfo) {
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

  let avgCost = "$0 - $0";
  if (
    clubInfoData?.avg_cost_max !== undefined &&
    clubInfoData?.avg_cost_min !== undefined
  ) {
    const {avg_cost_max, avg_cost_min} = clubInfoData;
    avgCost = `$${avg_cost_min} - $${avg_cost_max}`;
  }

  return (
    <React.Fragment>
      <View style={styles.buttonContainer}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          {type === "time" && (
            <React.Fragment>
              <Clock height={20} width={20} color={"#707070"} />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                Open:
                {clubInfoData?.opening_time
                  ? dayjs(timeToDate(clubInfoData.opening_time)).format(
                      "hh:mm A",
                    )
                  : ""}{" "}
                -{" "}
                {clubInfoData?.closing_time
                  ? dayjs(timeToDate(clubInfoData.closing_time)).format(
                      "hh:mm A",
                    )
                  : ""}
              </Text>
            </React.Fragment>
          )}

          {type === "cuisine" && (
            <React.Fragment>
              <MenuIcon height={20} width={20} color={"#707070"} />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                Cusines: {clubInfoData?.cuisine}
              </Text>
            </React.Fragment>
          )}

          {type === "cost" && (
            <React.Fragment>
              <MaterialCommunityIcons
                size={20}
                name="currency-usd"
                color={"#707070"}
              />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                Average Cost: {avgCost}
              </Text>
            </React.Fragment>
          )}

          {type === "about" && (
            <React.Fragment>
              <MaterialCommunityIcons
                name="information-outline"
                size={20}
                color={"#707070"}
              />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                Abount Club/Bar - Max 500 word
              </Text>
            </React.Fragment>
          )}

          {type === "slider" && (
            <React.Fragment>
              <MaterialCommunityIcons
                name="file-image"
                size={20}
                color={"#707070"}
              />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                Slider image - max 10/10
              </Text>
            </React.Fragment>
          )}
        </View>

        <TouchableOpacity
          onPress={() => {
            if (type !== "slider") {
              toggleModal();
            } else {
              navigation.navigate(OwnerStackRoutes.SLIDER_IMAGES);
            }
          }}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent
        visible={isModalOpen}
        onRequestClose={() => toggleModal()}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalView, {}]}>
            <TouchableOpacity
              onPress={() => toggleModal()}
              style={{
                margin: 20,
                marginLeft: "auto",
              }}>
              <Entypo name="cross" size={30} color={"#023047"} />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: splitAppTheme.fontSizes.xl,
                fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
              }}>
              {type === "time"
                ? "Update Time"
                : type === "cuisine"
                ? "Update Cuisine"
                : type === "cost"
                ? "Update Average Cost"
                : "Update About"}
            </Text>

            {type === "time" && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: splitAppTheme.space[3],
                  paddingVertical: splitAppTheme.space[5],
                }}>
                <View
                  style={{
                    flex: 1,
                    width: "40%",
                  }}>
                  <Controller
                    control={control}
                    name={"opening_time"}
                    rules={{
                      required: "This field is required",
                    }}
                    render={({field, formState: {errors}}) => {
                      return (
                        <React.Fragment>
                          <TouchableOpacity onPress={() => toggleOpeningTime()}>
                            <View
                              style={{
                                backgroundColor:
                                  splitAppTheme.colors.coolGray[50],
                                padding: splitAppTheme.space[5],
                              }}>
                              <View
                                style={{
                                  width: "100%",
                                  justifyContent: "flex-start",
                                }}>
                                <Text>
                                  {field.value
                                    ? dayjs(field.value).format("hh:mm A")
                                    : "Opening Time"}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>

                          <DatePicker
                            modal
                            mode={"time"}
                            open={isOpeningTimeOpen}
                            date={field.value ?? dayjs().toDate()}
                            onCancel={() => {
                              toggleOpeningTime();
                            }}
                            onConfirm={date => {
                              field.onChange(date);
                              toggleOpeningTime();
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
                      );
                    }}
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                    width: "40%",
                    marginLeft: splitAppTheme.space[2],
                  }}>
                  <Controller
                    control={control}
                    name={"closing_time"}
                    rules={{
                      required: "This field is required",
                    }}
                    render={({field, formState: {errors}}) => {
                      return (
                        <React.Fragment>
                          <TouchableOpacity onPress={() => toggleClosingTime()}>
                            <View
                              style={{
                                backgroundColor:
                                  splitAppTheme.colors.coolGray[50],
                                padding: splitAppTheme.space[5],
                              }}>
                              <View
                                style={{
                                  width: "100%",
                                  justifyContent: "flex-start",
                                }}>
                                <Text>
                                  {field.value
                                    ? dayjs(field.value).format("hh:mm A")
                                    : "Closing Time"}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>

                          <DatePicker
                            modal
                            mode={"time"}
                            open={isClosingTimeOpen}
                            date={field.value ?? dayjs().toDate()}
                            onCancel={() => {
                              toggleClosingTime();
                            }}
                            onConfirm={date => {
                              field.onChange(date);
                              toggleClosingTime();
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
                      );
                    }}
                  />
                </View>
              </View>
            )}

            {type === "cuisine" && (
              <View
                style={{
                  width: "100%",
                  paddingHorizontal: splitAppTheme.space[3],
                }}>
                <Controller
                  name={"cuisine"}
                  control={control}
                  render={({field}) => {
                    return (
                      <TextInput
                        value={field.value}
                        placeholder={"Cuisine"}
                        style={styles.modalInput}
                        onChangeText={field.onChange}
                      />
                    );
                  }}
                />
              </View>
            )}

            {type === "cost" && (
              <View
                style={{
                  flexDirection: "row",
                  padding: splitAppTheme.space[3],
                }}>
                <View style={{flex: 1}}>
                  <Controller
                    control={control}
                    name={"avg_cost_min"}
                    render={({field}) => {
                      return (
                        <TextInput
                          placeholder={"Min"}
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
                    name={"avg_cost_max"}
                    render={({field}) => {
                      return (
                        <TextInput
                          placeholder={"Max"}
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

            {type === "about" && (
              <View style={{width: "100%", padding: splitAppTheme.space[3]}}>
                <View>
                  <Controller
                    control={control}
                    name={"about"}
                    render={({field}) => {
                      return (
                        <TextInput
                          multiline
                          numberOfLines={5}
                          value={field.value}
                          placeholder={"About"}
                          textAlignVertical={"top"}
                          style={[
                            styles.modalInput,
                            {
                              height: 200,
                            },
                          ]}
                          onChangeText={field.onChange}
                        />
                      );
                    }}
                  />
                </View>
              </View>
            )}

            <View style={{paddingBottom: splitAppTheme.space[4]}}>
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
