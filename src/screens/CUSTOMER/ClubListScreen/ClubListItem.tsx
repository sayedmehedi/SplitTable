import React from "react";
import {TClubItem} from "./shared";
import truncate from "lodash.truncate";
import {Clock, MapIcon} from "@constants/iconPath";
import {Box, Divider, HStack, Text} from "native-base";
import {ImageBackground, StyleSheet} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";

type Props = {
  item: TClubItem;
  onPress: (item: TClubItem) => void;
};

const ClubListItem = ({item}: Props) => {
  return (
    <Box
      mb={5}
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
          <HStack alignItems={"center"} justifyContent={"space-between"} p={2}>
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

            {item.isFavotire ? (
              <AntDesign name="heart" size={22} color={"white"} />
            ) : (
              <AntDesign name="hearto" size={22} color={"white"} />
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
