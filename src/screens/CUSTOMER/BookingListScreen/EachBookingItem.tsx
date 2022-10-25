import React from "react";
import {Text, HStack, Avatar, Box, VStack, Button} from "native-base";

const EachBookingItem = ({item}: any) => {
  return (
    <HStack
      px={"4"}
      py={"1.5"}
      space={"4"}
      bg={"white"}
      rounded={"xl"}
      width={"full"}
      borderWidth={1}
      alignItems={"center"}
      borderColor={"#F1F1F1"}>
      <Avatar
        size={"lg"}
        rounded={"full"}
        source={{
          uri: "https://www.tripsavvy.com/thmb/gauQCVHTK9uk1QZYdM4k2UeRBO8=/640x427/filters:fill(auto,1)/club-56a3e8683df78cf7727fcf6d.jpg",
        }}
      />

      <VStack flex={"1"}>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Text fontFamily={"satoshi"} fontSize={"sm"} color={"#8A8D9F"}>
              {item.dateTime}
            </Text>
          </Box>

          <HStack alignItems={"center"} space={"1"}>
            <Box w={"2"} h={"2"} bg={"blue.300"} rounded={"full"} />

            <Text fontSize={"sm"} color={"#8A8D9F"} fontFamily={"satoshi"}>
              {item.totalGuest} Guest
            </Text>
          </HStack>

          <Box>
            <Text
              fontSize={"sm"}
              color={"blue.300"}
              fontWeight={"bold"}
              fontFamily={"satoshi"}>
              {item.totalPrice}
            </Text>
          </Box>
        </HStack>

        <Text
          fontSize={"md"}
          color={"#262B2E"}
          fontWeight={"bold"}
          fontFamily={"satoshi"}>
          {item.name}
        </Text>

        <Text fontSize={"md"} color={"#8A8D9F"} fontFamily={"satoshi"}>
          {item.tableName}
        </Text>

        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <HStack alignItems={"center"} space={"1"}>
            <Box w={"2"} h={"2"} bg={"green.300"} rounded={"full"} />

            <Text fontSize={"sm"} color={"green.300"} fontFamily={"satoshi"}>
              {item.status}
            </Text>
          </HStack>

          <Button
            variant={"link"}
            _text={{
              fontSize: "sm",
              color: "blue.300",
              fontFamily: "satoshi",
            }}>
            Add Review
          </Button>

          <Button
            variant={"link"}
            _text={{
              fontSize: "sm",
              color: "red.300",
              fontFamily: "satoshi",
            }}>
            Cancel
          </Button>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default EachBookingItem;
