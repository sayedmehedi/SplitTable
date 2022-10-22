import React from "react";
import {TClubItem} from "./shared";
import truncate from "lodash.truncate";
import useAppToast from "@hooks/useAppToast";
import {QueryKeys} from "@constants/query-keys";
import {Clock, MapIcon} from "@constants/iconPath";
import {useQueryClient} from "@tanstack/react-query";
import {ImageBackground, StyleSheet} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import {isResponseResultError} from "@utils/error-handling";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import useToggleFavoriteClubMutation from "@hooks/clubs/useToggleFavoriteClubMutation";
import {
  Box,
  Icon,
  Text,
  Divider,
  HStack,
  Spinner,
  Pressable,
  IconButton,
} from "native-base";

type Props = {
  item: TClubItem;
  onPress: (item: TClubItem) => void;
};

const ClubListItem = ({item, onPress}: Props) => {
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
    <Pressable mb={5} onPress={handlePress}>
      <Box
        flex={1}
        shadow={"3"}
        height={"64"}
        rounded={"lg"}
        width={"full"}
        backgroundColor={"white"}>
        <Box flex={2}>
          <ImageBackground
            source={{uri: item.image}}
            style={styles.ImageBackground}
            imageStyle={styles.ImageBackgroundImg}>
            <HStack
              alignItems={"center"}
              justifyContent={"space-between"}
              p={2}>
              <HStack
                p={1}
                px={"2.5"}
                space={"0.5"}
                rounded={"full"}
                alignItems={"center"}
                justifyContent={"center"}
                backgroundColor={"white"}>
                <Text style={{color: "black"}}>{item.avgRating}</Text>
                <Fontisto name="star" color={"#FFC529"} size={16} />
                <Text style={{color: "black"}}>({item.totalReviews})</Text>
              </HStack>

              {isTogglingFavorite ? (
                <Box p={3}>
                  <Spinner color={"white"} size={22} />
                </Box>
              ) : (
                <IconButton
                  rounded={"full"}
                  onPress={handleToggleFavorite}
                  icon={
                    <Icon
                      size={22}
                      as={AntDesign}
                      color={"white"}
                      name={item.isFavorite ? "heart" : "hearto"}
                    />
                  }
                />
              )}
            </HStack>
          </ImageBackground>
        </Box>

        <Box flex={1} justifyContent={"space-around"} p={"3"}>
          <Text
            fontFamily={"satoshi"}
            color={"#262B2E"}
            fontSize={"lg"}
            fontWeight={"bold"}>
            {truncate(item.name)}
          </Text>
          <Divider />
          <HStack
            space={2}
            alignItems={"center"}
            justifyContent={"space-between"}>
            <HStack alignItems={"center"}>
              <MapIcon height={10} width={10} color={"#402B8C"} />
              <Text
                ml={1}
                fontSize={"sm"}
                color={"#8A8D9F"}
                fontFamily={"satoshi"}
                fontWeight={"semibold"}>
                {truncate(item.location, {
                  length: 20,
                })}
              </Text>
            </HStack>

            <HStack alignItems={"center"}>
              <Clock height={10} width={10} color={"#402B8C"} />
              <Text
                ml={1}
                fontSize={"sm"}
                color={"#8A8D9F"}
                fontFamily={"satoshi"}
                fontWeight={"semibold"}>
                Open: {item.openingTime} - {item.closingTime}
              </Text>
            </HStack>
          </HStack>
        </Box>
      </Box>
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

export default ClubListItem;
