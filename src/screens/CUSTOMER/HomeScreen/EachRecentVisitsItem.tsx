import React from "react";
import truncate from "lodash.truncate";
import {ClubListItem} from "@src/models";
import useAppToast from "@hooks/useAppToast";
import {QueryKeys} from "@constants/query-keys";
import {MapIcon, Clock} from "@constants/iconPath";
import {useQueryClient} from "@tanstack/react-query";
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import {isResponseResultError} from "@utils/error-handling";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";

import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import useToggleFavoriteClubMutation from "@hooks/clubs/useToggleFavoriteClubMutation";
import {splitAppTheme} from "@src/theme";

type Props = {
  item: ClubListItem;
  onPress: (item: ClubListItem) => void;
};

const EachRecentVisitsItem = ({item, onPress}: Props) => {
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
            queryClient.invalidateQueries([QueryKeys.CLUB, "LIST"]);
          }
        },
      },
    );
  }, [toggleFavoriteClub]);

  return (
    <Pressable onPress={handlePress}>
      <View
        style={[
          {
            flex: 1,
            height: 238,
            borderRadius: 15,
            backgroundColor: "white",
          },
          splitAppTheme.shadows[3],
        ]}>
        <View style={{flex: 1.5}}>
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  padding: splitAppTheme.space[1],
                  borderRadius: splitAppTheme.radii.full,
                }}>
                <Text style={{color: "black"}}>{item.avg_rating}</Text>
                <Fontisto name="star" color={"#FFC529"} size={16} />
                <Text style={{color: "black"}}>({item.total_reviews})</Text>
              </View>

              {isTogglingFavorite ? (
                <View
                  style={{
                    padding: splitAppTheme.space[3],
                  }}>
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
                    name={item.is_favourite ? "heart" : "hearto"}
                  />
                </TouchableOpacity>
              )}
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
            {truncate(item.name)}
          </Text>
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
                fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
              }}>
              {truncate(item.location)}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: splitAppTheme.space[2],
            }}>
            <Clock height={10} width={10} color={"#402B8C"} />
            <Text
              style={{
                color: "#8A8D9F",
                marginLeft: splitAppTheme.space[1],
                fontSize: splitAppTheme.fontSizes.sm,
                fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
              }}>
              Open: {item.opening_time} - {item.closing_time}
            </Text>
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

export default EachRecentVisitsItem;
