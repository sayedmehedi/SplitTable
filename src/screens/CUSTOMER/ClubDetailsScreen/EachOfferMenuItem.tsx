import React from "react";
import truncate from "lodash.truncate";
import {ClubMenuItem} from "@src/models";
import {View, Text, Image, HStack, VStack, Box} from "@components/ui";

type Props = {
  item: ClubMenuItem;
};

const EachOfferMenuItem = ({item}: Props) => {
  return (
    <HStack height={"32"} alignItems={"center"} bg={"white"}>
      <Box width={"2/6"} height={"full"}>
        <Image
          width={"full"}
          height={"full"}
          alt={"offer-menu"}
          source={{uri: item.image}}
        />
      </Box>

      <VStack flex={1} justifyContent={"space-between"} ml={4}>
        <Text
          fontSize={"lg"}
          color={"#262B2E"}
          fontWeight={"medium"}
          fontFamily={"Satoshi-Regular"}>
          {item.name}
        </Text>

        <View maxWidth={"80%"}>
          <Text
            fontSize={"sm"}
            color={"#8A8D9F"}
            numberOfLines={3}
            fontFamily={"Satoshi-Regular"}>
            {truncate(item.details, {
              length: 30,
            })}
          </Text>
        </View>

        <Text
          pb={"1.5"}
          fontSize={"sm"}
          color={"blue.300"}
          fontFamily={"SatoshiVariable-Bold"}>
          Price: ${item.price}
        </Text>
      </VStack>
    </HStack>
  );
};

export default EachOfferMenuItem;
