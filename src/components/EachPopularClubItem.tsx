import React from "react";
import {StyleSheet} from "react-native";
import truncate from "lodash.truncate";
import {ClubListItem} from "@src/models";
import useAppToast from "@hooks/useAppToast";
import {QueryKeys} from "@constants/query-keys";
import {Box, HStack, Pressable, Text, TouchableOpacity} from "./ui";
import {RedMap, MapIcon} from "@constants/iconPath";
import {useQueryClient} from "@tanstack/react-query";
import {ImageBackground, Spinner} from "@components/ui";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import {isResponseResultError} from "@utils/error-handling";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import useToggleFavoriteClubMutation from "@hooks/clubs/useToggleFavoriteClubMutation";
import {splitAppTheme} from "@src/theme";

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
      flex={1}
      bg={"white"}
      minHeight={238}
      borderRadius={"lg"}
      onPress={handlePress}
      style={splitAppTheme.shadows[3]}>
      <Box flex={1.5}>
        <ImageBackground
          width={"full"}
          height={"full"}
          source={{uri: item.image}}
          imageStyle={{borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
          <HStack
            padding={2}
            alignItems={"center"}
            justifyContent={"space-between"}>
            <HStack
              p={1}
              bg={"white"}
              borderRadius={"full"}
              alignItems={"center"}
              justifyContent={"center"}>
              <Text color={"black"}>{item.avg_rating}</Text>
              <Fontisto name="star" color={"#FFC529"} size={16} />
              <Text color={"black"}>({item.total_reviews})</Text>
            </HStack>

            <HStack alignItems={"center"}>
              {isTogglingFavorite ? (
                <Box p={3}>
                  <Spinner color={"white"} size={"small"} />
                </Box>
              ) : (
                <TouchableOpacity
                  size={50}
                  borderRadius={"full"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  onPress={handleToggleFavorite}>
                  <AntDesign
                    size={22}
                    color={"white"}
                    name={item.is_favourite ? "heart" : "hearto"}
                  />
                </TouchableOpacity>
              )}

              <HStack
                p={1}
                bg={"white"}
                borderRadius={"full"}
                alignItems={"center"}
                justifyContent={"center"}>
                <RedMap height={16} width={16} />
                <Text color={"black"}>{item.distance}</Text>
              </HStack>
            </HStack>
          </HStack>
        </ImageBackground>
      </Box>

      <Box px={2} flex={1} justifyContent={"space-around"}>
        <Text fontSize={"lg"} color={"#262B2E"} fontFamily={"Roboto-Medium"}>
          {item.name}
        </Text>

        <HStack alignItems="center">
          <MapIcon height={20} width={20} color={"#402B8C"} />

          <Box ml={2}>
            <Text
              mr={1}
              fontSize={"sm"}
              color={"#8A8D9F"}
              fontFamily={"Satoshi-Regular"}>
              {truncate(item.location)}
            </Text>
          </Box>
        </HStack>

        <HStack alignItems={"center"} pb={2} flexWrap={"wrap"}>
          {item.menus.map((menu, index) => (
            <Box
              p={1}
              mr={2}
              mb={2}
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
                fontSize={"sm"}
                color={"#FF3FCB"}
                fontFamily={"Satoshi-Regular"}>
                {truncate(menu.name, {
                  length: 12,
                })}
              </Text>
            </Box>
          ))}
        </HStack>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDF2EE",
  },
});

export default EachPopularClubItem;
