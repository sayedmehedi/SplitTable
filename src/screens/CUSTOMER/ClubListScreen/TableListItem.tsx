import React from "react";
import {TTableItem} from "./shared";
import truncate from "lodash.truncate";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {splitAppTheme} from "@src/theme";
import useAppToast from "@hooks/useAppToast";
import {QueryKeys} from "@constants/query-keys";
import {Clock, MapIcon} from "@constants/iconPath";
import {useQueryClient} from "@tanstack/react-query";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import {isResponseResultError} from "@utils/error-handling";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import useToggleFavoriteClubMutation from "@hooks/clubs/useToggleFavoriteClubMutation";

type Props = {
  item: TTableItem;
  onPress: (item: TTableItem) => void;
};

const TableListItem = ({item, onPress}: Props) => {
  const toast = useAppToast();
  const queryClient = useQueryClient();
  const handlePress = React.useCallback(() => {
    onPress(item);
  }, [onPress, item]);

  const {
    mutate: toggleFavoriteClub,
    error: toggleFavoriteError,
    isLoading: isTogglingFavorite,
    data: toggleFavoriteClubResponse,
  } = useToggleFavoriteClubMutation();

  useHandleNonFieldError(toggleFavoriteError);
  useHandleResponseResultError(toggleFavoriteClubResponse);

  const handleToggleFavorite = React.useCallback(() => {
    toggleFavoriteClub(
      {clubId: item.id},
      {
        onSuccess(data) {
          if (!isResponseResultError(data)) {
            toast.success(data.message);
            queryClient.invalidateQueries([QueryKeys.TABLE, "LIST"]);
          }
        },
      },
    );
  }, [toggleFavoriteClub]);

  return (
    <Pressable
      style={{
        marginBottom: splitAppTheme.space[5],
      }}
      onPress={handlePress}>
      <View
        style={[
          splitAppTheme.shadows[3],
          {
            flex: 1,
            height: splitAppTheme.sizes[64],
            width: splitAppTheme.sizes.full,
            borderRadius: splitAppTheme.radii.lg,
            backgroundColor: splitAppTheme.colors.white,
          },
        ]}>
        <View style={{flex: 2}}>
          <ImageBackground
            source={{uri: item.image}}
            style={styles.ImageBackground}
            imageStyle={styles.ImageBackgroundImg}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: splitAppTheme.space[2],
              }}>
              {/* <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: splitAppTheme.space[1],
                  borderRadius: splitAppTheme.radii.full,
                  backgroundColor: splitAppTheme.colors.white,
                  paddingHorizontal: splitAppTheme.space["2.5"],
                }}>
                <Text style={{color: "black"}}>{item.avgRating}</Text>
                <View style={{marginHorizontal: splitAppTheme.space["0.5"]}}>
                  <Fontisto name="star" color={"#FFC529"} size={16} />
                </View>
                <Text style={{color: "black"}}>({item.totalReviews})</Text>
              </View> */}

              {/* {isTogglingFavorite ? (
                <View style={{padding: splitAppTheme.space["3"]}}>
                  <ActivityIndicator color={"white"} size={"small"} />
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: splitAppTheme.radii.full,
                  }}
                  onPress={handleToggleFavorite}>
                  <AntDesign
                    size={22}
                    color={"white"}
                    name={item.isFavorite ? "heart" : "hearto"}
                  />
                </TouchableOpacity>
              )} */}
            </View>
          </ImageBackground>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
            padding: splitAppTheme.space[3],
          }}>
          <Text
            style={{
              color: "#262B2E",
              fontSize: splitAppTheme.fontSizes.lg,
              fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
            }}>
            {truncate(item.name)}
          </Text>
          <View
            style={{height: 1, backgroundColor: splitAppTheme.colors.gray[300]}}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
              <MapIcon height={10} width={10} color={"#402B8C"} />
              <Text
                style={{
                  color: "#8A8D9F",
                  marginLeft: splitAppTheme.space[1],
                  fontSize: splitAppTheme.fontSizes.sm,
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
                }}>
                {truncate(item.location, {
                  length: 15,
                })}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: splitAppTheme.space[2],
              }}>
              <Clock height={10} width={10} color={"#402B8C"} />
              <Text
                style={{
                  color: "#8A8D9F",
                  marginLeft: splitAppTheme.space[1],
                  fontSize: splitAppTheme.fontSizes.sm,
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
                }}>
                {item.date}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  ImageBackground: {
    height: "100%",
    width: "100%",
  },
  ImageBackgroundImg: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default TableListItem;
