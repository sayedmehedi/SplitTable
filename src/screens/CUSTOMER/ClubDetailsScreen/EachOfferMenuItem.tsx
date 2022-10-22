import React from "react";
import truncate from "lodash.truncate";
import {ClubMenuItem} from "@src/models";
import {View, Text, Image, HStack, VStack, Box} from "native-base";

type Props = {
  item: ClubMenuItem;
};

const EachOfferMenuItem = ({item}: Props) => {
  return (
    <HStack h={"32"} space={"4"} alignItems={"center"} bg={"white"}>
      <Box width={"2/6"} height={"full"}>
        <Image
          width={"full"}
          height={"full"}
          alt={"offer-menu"}
          source={{uri: item.image}}
        />
      </Box>

      <VStack flex={1} justifyContent={"space-between"}>
        <Text
          fontSize={"lg"}
          color={"#262B2E"}
          fontWeight={"medium"}
          fontFamily={"satoshi"}>
          {item.name}
        </Text>

        <View maxW={"80%"}>
          <Text
            fontSize={"sm"}
            color={"#8A8D9F"}
            numberOfLines={3}
            fontFamily={"satoshi"}>
            {truncate(item.details, {
              length: 30,
            })}
          </Text>
        </View>

        <Text
          fontSize={"sm"}
          color={"blue.300"}
          fontWeight={"bold"}
          fontFamily={"satoshi"}
          pb={"1.5"}>
          Price: ${item.price}
        </Text>
      </VStack>
    </HStack>
  );
};

export default EachOfferMenuItem;
