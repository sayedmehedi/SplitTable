import React from "react";
import truncate from "lodash.truncate";
import {ClubListItem} from "@src/models";
import {Box, HStack, Pressable, Text} from "native-base";
import {MapIcon, Clock} from "@constants/iconPath";
import {ImageBackground, StyleSheet} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";

type Props = {
  item: ClubListItem;
  onPress: (item: ClubListItem) => void;
};

const EachRecentVisitsItem = ({item, onPress}: Props) => {
  const handlePress = React.useCallback(() => {
    onPress(item);
  }, [item, onPress]);

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

              {item.is_favourite ? (
                <AntDesign name="heart" size={22} color={"white"} />
              ) : (
                <AntDesign name="hearto" size={22} color={"white"} />
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
