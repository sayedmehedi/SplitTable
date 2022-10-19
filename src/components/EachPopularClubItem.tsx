import React from "react";
import truncate from "lodash.truncate";
import {ClubListItem} from "@src/models";
import {RedMap, MapIcon} from "@constants/iconPath";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import {ImageBackground, StyleSheet} from "react-native";
import {Badge, Box, HStack, Icon, Pressable, Text} from "native-base";

type Props = {
  item: ClubListItem;
  onPress: (club: ClubListItem) => void;
};

const EachPopularClubItem = ({item, onPress}: Props) => {
  const handlePress = () => {
    onPress(item);
  };

  return (
    <Pressable
      flex={1}
      minH={238}
      shadow={"3"}
      bg={"white"}
      rounded={"lg"}
      onPress={handlePress}>
      <Box flex={1.5}>
        <ImageBackground
          source={{uri: item.image}}
          style={{height: "100%", width: "100%"}}
          imageStyle={{borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
          <HStack
            padding={2}
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

            <HStack alignItems={"center"} space={2}>
              {item.is_favourite ? (
                <AntDesign name="heart" size={22} color={"white"} />
              ) : (
                <AntDesign name="hearto" size={22} color={"white"} />
              )}

              <Badge
                py={1}
                bg={"white"}
                rounded={"full"}
                startIcon={<Icon as={RedMap} height={16} width={16} />}>
                {item.distance}
              </Badge>
            </HStack>
          </HStack>
        </ImageBackground>
      </Box>

      <Box px={2} flex={1} justifyContent={"space-around"}>
        <Text
          fontSize={"lg"}
          color={"#262B2E"}
          fontFamily={"satoshi"}
          fontWeight={"semibold"}>
          {item.name}
        </Text>

        <HStack alignItems="center" space={2}>
          <MapIcon height={20} width={20} color={"#402B8C"} />

          <Text mr={1} fontSize={"sm"} color={"#8A8D9F"} fontFamily={"satoshi"}>
            {truncate(item.location)}
          </Text>
        </HStack>

        <HStack alignItems={"center"} pb={2}>
          {item.menus.map((menu, index) => (
            <Box
              p={1}
              style={[
                styles.menuContainer,
                index === 1
                  ? {backgroundColor: "rgba(255,188,0,0.2)"}
                  : index === 2
                  ? {backgroundColor: "rgba(29,191,115,0.2)"}
                  : {},
              ]}
              key={menu.id}>
              <Text color={"#FF3FCB"} fontFamily={"satoshi"} fontSize={"sm"}>
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
    marginRight: 8,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDF2EE",
  },
});

export default EachPopularClubItem;
