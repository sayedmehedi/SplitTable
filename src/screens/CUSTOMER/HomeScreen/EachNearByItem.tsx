import React from "react";
import truncate from "lodash.truncate";
import {MapIcon} from "@constants/iconPath";
import {NearbyClubListItem} from "@src/models";
import Fontisto from "react-native-vector-icons/Fontisto";
import {Box, HStack, Image, Pressable, Text} from "native-base";

type Props = {
  item: NearbyClubListItem;
  onPress: (item: NearbyClubListItem) => void;
};

const EachNearByItem = ({item, onPress}: Props) => {
  const handlePress = React.useCallback(() => {
    onPress(item);
  }, [item, onPress]);

  return (
    <Pressable onPress={handlePress}>
      <HStack my={2} h={"24"} w={"full"} space={"5"}>
        <Image
          h={"24"}
          w={"24"}
          rounded={"sm"}
          alt={"recent-club"}
          source={{uri: item.image}}
        />
        <Box justifyContent={"space-between"}>
          <Text
            fontSize={"lg"}
            color={"#262B2E"}
            fontWeight={"semibold"}
            fontFamily={"satoshi"}>
            {truncate(item.name)}
          </Text>
          <HStack alignItems={"center"}>
            <MapIcon height={10} width={10} color={"#402B8C"} />
            <Text
              ml={1}
              fontSize={"sm"}
              color={"#8A8D9F"}
              fontFamily={"satoshi"}>
              {truncate(item.location)}
            </Text>
          </HStack>

          <HStack alignItems={"center"}>
            <MapIcon height={10} width={10} color={"#402B8C"} />
            <Text
              ml={1}
              fontSize={"sm"}
              color={"#8A8D9F"}
              fontFamily={"satoshi"}>
              {item.distance}
            </Text>
          </HStack>

          <HStack>
            <Text color={"black"}>{item.avg_rating}</Text>
            <Fontisto name="star" color={"#FFC529"} size={16} />
            <Text color={"black"}>({item.total_reviews})</Text>
          </HStack>
        </Box>
      </HStack>
    </Pressable>
  );
};

export default EachNearByItem;
