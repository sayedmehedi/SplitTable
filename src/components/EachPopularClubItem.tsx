import React from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import truncate from "lodash.truncate";
import {splitAppTheme} from "@src/theme";
import {ClubListItem} from "@src/models";
import useAppToast from "@hooks/useAppToast";
import {QueryKeys} from "@constants/query-keys";
import {RedMap, MapIcon} from "@constants/iconPath";
import {useQueryClient} from "@tanstack/react-query";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import {isResponseResultError} from "@utils/error-handling";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import useToggleFavoriteClubMutation from "@hooks/clubs/useToggleFavoriteClubMutation";

type Props = {
  item: ClubListItem;
  onPress: (club: ClubListItem) => void;
};

const EachPopularClubItem = ({item, onPress}: Props) => {
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
    <Pressable
      style={{
        flex: 1,
        minHeight: 238,
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
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: splitAppTheme.space[2],
            }}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: splitAppTheme.space[1],
              }}>
              <Text style={{color: splitAppTheme.colors.black}}>
                {item.avg_rating}
              </Text>
              <Fontisto name="star" color={"#FFC529"} size={16} />
              <Text style={{color: splitAppTheme.colors.black}}>
                ({item.total_reviews})
              </Text>
            </View>

            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
              }}>
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
            alignItems: "center",
            flexDirection: "row",
          }}>
          <MapIcon height={20} width={20} color={"#402B8C"} />

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

        <View
          style={{
            flexWrap: "wrap",
            alignItems: "center",
            flexDirection: "row",
            paddingBottom: splitAppTheme.space[2],
          }}>
          {item.menus.map((menu, index) => (
            <View
              style={[
                styles.menuContainer,
                index === 1
                  ? {backgroundColor: "rgba(255,188,0,0.2)"}
                  : index === 2
                  ? {backgroundColor: "rgba(29,191,115,0.2)"}
                  : {},
              ]}
              key={menu.id}>
              <Text
                style={{
                  fontSize: splitAppTheme.fontSizes.sm,
                  color: splitAppTheme.colors.primary[300],
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
                }}>
                {truncate(menu.name, {
                  length: 12,
                })}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDF2EE",
    padding: splitAppTheme.space[1],
    marginRight: splitAppTheme.space[2],
    marginBottom: splitAppTheme.space[2],
  },
});

export default EachPopularClubItem;