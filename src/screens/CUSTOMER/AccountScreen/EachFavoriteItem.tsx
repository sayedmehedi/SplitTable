import React from "react";
import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {FavoriteClub} from "@src/models";
import useAppToast from "@hooks/useAppToast";
import {QueryKeys} from "@constants/query-keys";
import {useQueryClient} from "@tanstack/react-query";
import Fontisto from "react-native-vector-icons/Fontisto";
import {isResponseResultError} from "@utils/error-handling";
import AntDesign from "react-native-vector-icons/AntDesign";
import {MapIcon, Clock, DeleteIcon} from "@constants/iconPath";
import {Swipeable, GestureHandlerRootView} from "react-native-gesture-handler";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import useToggleFavoriteClubMutation from "@hooks/clubs/useToggleFavoriteClubMutation";
import {splitAppTheme} from "@src/theme";
import FastImage from "react-native-fast-image";

export default function EachFavoriteItem({item}: {item: FavoriteClub}) {
  const toast = useAppToast();
  const queryClient = useQueryClient();
  const {
    mutate: toggleFavoriteClub,
    error: toggleFavoriteError,
    isLoading: isTogglingFavorite,
    data: toggleFavoriteClubResponse,
  } = useToggleFavoriteClubMutation();

  const handleToggleFavorite = React.useCallback(() => {
    toggleFavoriteClub(
      {clubId: item.id},
      {
        onSuccess(data) {
          if (!isResponseResultError(data)) {
            toast.success(data.message);
            queryClient.invalidateQueries([QueryKeys.FAVORITE, "LIST"]);
          }
        },
      },
    );
  }, [toggleFavoriteClub]);

  const rightSwipeActions = () => {
    return isTogglingFavorite ? (
      <View style={{padding: splitAppTheme.space[3]}}>
        <ActivityIndicator color={"white"} size={"small"} />
      </View>
    ) : (
      <TouchableOpacity
        onPress={handleToggleFavorite}
        style={{
          marginLeft: 20,
          justifyContent: "center",
        }}>
        <DeleteIcon />
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable friction={2} renderRightActions={rightSwipeActions}>
        <View
          style={{
            flex: 1,
            height: 236,
            width: "100%",
            elevation: 15,
            marginBottom: 20,
            borderRadius: 15,
            backgroundColor: "white",
            shadowColor: "#D6D6D6",
          }}>
          <View style={{flex: 2}}>
            <FastImage
              source={{uri: item.image}}
              style={{
                height: "100%",
                width: "100%",
                borderTopLeftRadius: splitAppTheme.radii["2xl"],
                borderTopRightRadius: splitAppTheme.radii["2xl"],
              }}>
              <View
                style={{
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <View
                  style={{
                    width: 76,
                    height: 24,
                    borderRadius: 15,
                    alignItems: "center",
                    flexDirection: "row",
                    backgroundColor: "white",
                    justifyContent: "center",
                  }}>
                  <Text style={{color: "black"}}>4.5</Text>
                  <Fontisto name="star" color={"#FFC529"} size={16} />
                  <Text style={{color: "black"}}>(20)</Text>
                </View>

                {isTogglingFavorite ? (
                  <View style={{padding: splitAppTheme.space[3]}}>
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
            </FastImage>
          </View>

          <View style={{flex: 1, justifyContent: "space-around", padding: 12}}>
            <Text
              style={{
                fontSize: 18,
                color: "#262B2E",
                fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
              }}>
              {item.name}
            </Text>
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#E2E2E2",
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <MapIcon
                  width={10}
                  height={10}
                  color={splitAppTheme.colors.secondary[400]}
                />
                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: 5,
                    color: "#8A8D9F",
                    fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
                  }}>
                  {item.location}
                </Text>
              </View>

              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Clock />
                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: 10,
                    color: "#8A8D9F",
                    fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
                  }}>
                  Open {item.opening_time}-{item.closing_time}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}
