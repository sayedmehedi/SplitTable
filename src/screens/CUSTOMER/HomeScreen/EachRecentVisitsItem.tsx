import React from "react";
import truncate from "lodash.truncate";
import {ClubListItem} from "@src/models";
import useAppToast from "@hooks/useAppToast";
import {QueryKeys} from "@constants/query-keys";
import {MapIcon, Clock} from "@constants/iconPath";
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
  HStack,
  Spinner,
  Pressable,
  IconButton,
} from "native-base";

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
      <Box flex={1} height={238} shadow={"3"} borderRadius={15} bg={"white"}>
        <Box flex={1.5}>
          <ImageBackground
            source={{uri: item.image}}
            style={styles.ImageBackground}
            imageStyle={styles.ImageBackgroundImg}>
            <HStack
              p={2}
              alignItems={"center"}
              justifyContent={"space-between"}>
              <HStack
                p={1}
                bg={"white"}
                rounded={"full"}
                alignItems={"center"}
                justifyContent={"center"}>
                <Text color={"black"}>{item.avg_rating}</Text>
                <Fontisto name="star" color={"#FFC529"} size={16} />
                <Text color={"black"}>({item.total_reviews})</Text>
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
                      name={item.is_favourite ? "heart" : "hearto"}
                    />
                  }
                />
              )}
            </HStack>
          </ImageBackground>
        </Box>

        <Box flex={1} px={2} justifyContent={"space-around"}>
          <Text
            fontSize={"lg"}
            color={"#262B2E"}
            fontWeight={"bold"}
            fontFamily={"satoshi"}>
            {truncate(item.name)}
          </Text>
          <HStack alignItems={"center"}>
            <MapIcon height={10} width={10} color={"#402B8C"} />
            <Text
              ml={1}
              fontSize={"sm"}
              color={"#8A8D9F"}
              fontFamily={"satoshi"}
              fontWeight={"semibold"}>
              {truncate(item.location)}
            </Text>
          </HStack>

          <HStack alignItems={"center"} pb={2}>
            <Clock height={10} width={10} color={"#402B8C"} />
            <Text
              ml={1}
              fontSize={"sm"}
              color={"#8A8D9F"}
              fontFamily={"satoshi"}
              fontWeight={"semibold"}>
              Open: {item.opening_time} - {item.closing_time}
            </Text>
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

export default EachRecentVisitsItem;
