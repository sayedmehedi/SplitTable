import React from "react";
import truncate from "lodash.truncate";
import {splitAppTheme} from "@src/theme";
import {BookedTable} from "@src/models";
import useAppToast from "@hooks/useAppToast";
import {QueryKeys} from "@constants/query-keys";
import {useQueryClient} from "@tanstack/react-query";
import {RedMap, MapIcon, Clock} from "@constants/iconPath";
import {isResponseResultError} from "@utils/error-handling";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {
  Text,
  View,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import useToggleFavoriteClubMutation from "@hooks/clubs/useToggleFavoriteClubMutation";
import useDeleteOwnerTableMutation from "@hooks/clubs/useDeleteOwnerTableMutation";

type Props = {
  item: BookedTable;
  onPress: (club: BookedTable) => void;
  onUpdatePress: (club: BookedTable) => void;
};

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
    deleteTable({
      tableId: item.id,
    });
  };

  return (
    <Pressable
      style={{
        flex: 1,
        minHeight: 200,
        backgroundColor: "white",
        ...splitAppTheme.shadows[3],
        borderRadius: splitAppTheme.radii.lg,
      }}
      onPress={handlePress}>
      <View
        style={{
          flex: 1.5,
        }}>
        <ImageBackground
          style={{
            width: splitAppTheme.sizes.full,
            height: splitAppTheme.sizes.full,
          }}
          source={{uri: item.image}}
          imageStyle={{borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
          <View
            style={{
              height: splitAppTheme.sizes.full,
              justifyContent: "space-between",
            }}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: splitAppTheme.space[2],
              }}>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: splitAppTheme.space[1],
                    borderRadius: splitAppTheme.radii.full,
                    backgroundColor: splitAppTheme.colors.white,
                  }}>
                  <RedMap height={16} width={16} />
                  <Text
                    style={{
                      color: splitAppTheme.colors.black,
                    }}>
                    {item.distance}
                  </Text>
                </View>
              </View>
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
                      backgroundColor: splitAppTheme.colors.blue[300],
                    }}>
                    <Text style={{color: splitAppTheme.colors.white}}>
                      Update
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity disabled={isLoading} onPress={handleDelete}>
                  <View
                    style={{
                      padding: splitAppTheme.space[3],
                      backgroundColor: splitAppTheme.colors.red[300],
                      borderTopLeftRadius: splitAppTheme.radii.lg,
                    }}>
                    <View style={{flexDirection: "row"}}>
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
        </ImageBackground>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          paddingHorizontal: splitAppTheme.space[2],
        }}>
        <Text
          style={{
            color: "#262B2E",
            fontSize: splitAppTheme.fontSizes.lg,
            fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
          }}>
          {item.name}
        </Text>

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
            <Clock height={12} width={12} color={"#402B8C"} />

            <Text
              style={{
                marginLeft: splitAppTheme.space[2],
              }}>
              {item.date}
            </Text>
          </View>

          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
            }}>
            <MapIcon height={12} width={12} color={"#402B8C"} />

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
                {truncate(item.location)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default EachTableNEventItem;
