import React from "react";
import {TClubItem} from "./shared";
import truncate from "lodash.truncate";
import {StyleSheet} from "react-native";
import useAppToast from "@hooks/useAppToast";
import {QueryKeys} from "@constants/query-keys";
import {Clock, MapIcon} from "@constants/iconPath";
import {useQueryClient} from "@tanstack/react-query";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import {isResponseResultError} from "@utils/error-handling";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {
  Box,
  Text,
  Divider,
  HStack,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  Spinner,
} from "@components/ui";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import useToggleFavoriteClubMutation from "@hooks/clubs/useToggleFavoriteClubMutation";
import {splitAppTheme} from "@src/theme";

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
        height={"64"}
        width={"full"}
        borderRadius={"lg"}
        backgroundColor={"white"}
        style={splitAppTheme.shadows[3]}>
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
                borderRadius={"full"}
                alignItems={"center"}
                justifyContent={"center"}
                backgroundColor={"white"}>
                <Text style={{color: "black"}}>{item.avgRating}</Text>
                <Box mx={"0.5"}>
                  <Fontisto name="star" color={"#FFC529"} size={16} />
                </Box>
                <Text style={{color: "black"}}>({item.totalReviews})</Text>
              </HStack>

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
                    name={item.isFavorite ? "heart" : "hearto"}
                  />
                </TouchableOpacity>
              )}
            </HStack>
          </ImageBackground>
        </Box>

        <Box flex={1} justifyContent={"space-around"} p={"3"}>
          <Text
            fontSize={"lg"}
            color={"#262B2E"}
            fontFamily={"SatoshiVariable-Bold"}>
            {truncate(item.name)}
          </Text>
          <Divider />
          <HStack alignItems={"center"} justifyContent={"space-between"}>
            <HStack alignItems={"center"}>
              <MapIcon height={10} width={10} color={"#402B8C"} />
              <Text
                ml={1}
                fontSize={"sm"}
                color={"#8A8D9F"}
                fontFamily={"Satoshi-Medium"}>
                {truncate(item.location, {
                  length: 15,
                })}
              </Text>
            </HStack>

            <HStack alignItems={"center"} ml={2}>
              <Clock height={10} width={10} color={"#402B8C"} />
              <Text
                ml={1}
                fontSize={"sm"}
                color={"#8A8D9F"}
                fontFamily={"Satoshi-Medium"}>
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
