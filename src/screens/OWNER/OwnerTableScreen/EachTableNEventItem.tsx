import React from "react";
import dayjs from "dayjs";
import truncate from "lodash.truncate";
import {splitAppTheme} from "@src/theme";
import useAppToast from "@hooks/useAppToast";
import {TableBookingStatusType} from "@src/models";
import {isResponseResultError} from "@utils/error-handling";
import {MapIcon, Clock, JoinCountIcon} from "@constants/iconPath";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {
  Text,
  View,
  Alert,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import useDeleteOwnerTableMutation from "@hooks/clubs/useDeleteOwnerTableMutation";
import FastImage from "react-native-fast-image";
import {TableBookingStatusTypes} from "@constants/table";

type TableItem = {
  id: number;
  name: string;
  date: string;
  location: string;
  distance: string;
  image: string;
  total_joined?: number;
  status: TableBookingStatusType;
};

type Props = {
  item: TableItem;
  onPress: (table: TableItem) => void;
  onUpdatePress: (table: TableItem) => void;
};

const CARD_HEIGHT = 200;

const EachTableNEventItem = ({item, onPress, onUpdatePress}: Props) => {
  const toast = useAppToast();
  const handlePress = React.useCallback(() => {
    onPress(item);
  }, [onPress, item]);

  const {
    mutate: deleteTable,
    isLoading,
    error,
    data,
  } = useDeleteOwnerTableMutation({
    onSuccess(data) {
      if (!isResponseResultError(data)) {
        toast.success(data.success);
      }
    },
  });
  useHandleNonFieldError(error);
  useHandleResponseResultError(data);

  const handleDelete = () => {
    Alert.alert("Remove", "Are your sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sure",
        style: "destructive",
        onPress() {
          deleteTable({
            tableId: item.id,
          });
        },
      },
    ]);
  };

  return (
    <Pressable
      style={{
        flex: 1,
        minHeight: CARD_HEIGHT,
        backgroundColor: "white",
        ...splitAppTheme.shadows[3],
        borderRadius: splitAppTheme.radii.lg,
      }}
      onPress={handlePress}>
      <View
        style={{
          flex: 4,
        }}>
        <FastImage
          style={{
            height: CARD_HEIGHT - 40,
            width: splitAppTheme.sizes.full,
            borderTopLeftRadius: splitAppTheme.radii["2xl"],
            borderTopRightRadius: splitAppTheme.radii["2xl"],
          }}
          source={{uri: item.image}}>
          <View
            style={{
              justifyContent: "space-between",
              height: splitAppTheme.sizes.full,
            }}>
            <View>
              {item.status === TableBookingStatusTypes.BOOKED && (
                <View
                  style={{
                    alignSelf: "flex-end",
                    margin: splitAppTheme.space[3],
                    padding: splitAppTheme.space[2],
                    borderRadius: splitAppTheme.radii.lg,
                    backgroundColor: splitAppTheme.colors.green[400],
                  }}>
                  <Text
                    style={{
                      color: splitAppTheme.colors.white,
                      fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                    }}>
                    {item.status}
                  </Text>
                </View>
              )}
            </View>

            <View
              style={{flexDirection: "row", justifyContent: "space-between"}}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    onUpdatePress(item);
                  }}>
                  <View
                    style={{
                      padding: splitAppTheme.space[3],
                      borderTopRightRadius: splitAppTheme.radii.lg,
                      backgroundColor: splitAppTheme.colors.blue[500],
                    }}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                      <View style={{marginRight: splitAppTheme.space[2]}}>
                        <MaterialIcons
                          size={20}
                          name={"edit"}
                          color={splitAppTheme.colors.white}
                        />
                      </View>

                      <Text style={{color: splitAppTheme.colors.white}}>
                        Update
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity disabled={isLoading} onPress={handleDelete}>
                  <View
                    style={{
                      padding: splitAppTheme.space[3],
                      backgroundColor: splitAppTheme.colors.red[500],
                      borderTopLeftRadius: splitAppTheme.radii.lg,
                    }}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                      <View style={{marginRight: splitAppTheme.space[2]}}>
                        <MaterialIcons
                          size={20}
                          name={"close"}
                          color={splitAppTheme.colors.white}
                        />
                      </View>
                      <View>
                        <Text style={{color: splitAppTheme.colors.white}}>
                          Remove
                        </Text>
                      </View>
                      {isLoading && (
                        <View style={{marginLeft: splitAppTheme.space[2]}}>
                          <ActivityIndicator size={"small"} />
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </FastImage>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          paddingVertical: splitAppTheme.space[2],
          paddingHorizontal: splitAppTheme.space[3],
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Text
            style={{
              color: "#262B2E",
              fontSize: splitAppTheme.fontSizes.lg,
              fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
            }}>
            {truncate(item.name)}
          </Text>

          {item.total_joined !== undefined && (
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
              }}>
              <View>
                <JoinCountIcon height={15} width={15} />
              </View>

              <View
                style={{
                  marginLeft: splitAppTheme.space[1],
                }}>
                <Text
                  style={{
                    fontFamily: splitAppTheme.fontConfig.Roboto[700].normal,
                  }}>
                  {item.total_joined}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View
          style={{
            height: splitAppTheme.sizes["0.5"],
            marginVertical: splitAppTheme.space[1],
            backgroundColor: splitAppTheme.colors.coolGray[100],
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
            }}>
            <MapIcon height={12} width={12} color={"#402B8C"} />

            <Text
              style={{
                marginLeft: splitAppTheme.space[2],
              }}>
              {truncate(item.location)}
            </Text>
          </View>

          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
            }}>
            <Clock height={12} width={12} color={"#402B8C"} />

            <View
              style={{
                marginLeft: splitAppTheme.space[2],
              }}>
              <Text
                style={{
                  color: "#8A8D9F",
                  marginRight: splitAppTheme.space[1],
                  fontSize: splitAppTheme.fontSizes.sm,
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
                }}>
                {dayjs(item.date, "YYYY-MM-DD HH:mm:ss").format(
                  "DD MMM, hh:mm A",
                )}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default EachTableNEventItem;
