import React from "react";
import {Text, HStack, Box, VStack, Image} from "@components/ui";

const EachBookingItem = ({item}: any) => {
  return (
    <HStack
      px={"4"}
      py={"1.5"}
      bg={"white"}
      width={"full"}
      borderWidth={1}
      borderRadius={"xl"}
      alignItems={"center"}
      borderColor={"#F1F1F1"}>
      <Image
        size={65}
        borderRadius={"full"}
        source={{
          uri: "https://www.tripsavvy.com/thmb/gauQCVHTK9uk1QZYdM4k2UeRBO8=/640x427/filters:fill(auto,1)/club-56a3e8683df78cf7727fcf6d.jpg",
        }}
      />

      <VStack flex={1} ml={4}>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Text
              fontSize={"sm"}
              color={"#8A8D9F"}
              fontFamily={"Roboto-Regular"}>
              {item.dateTime}
            </Text>
          </Box>

          <HStack alignItems={"center"}>
            <Box
              width={"2"}
              height={"2"}
              bg={"blue.300"}
              borderRadius={"full"}
            />

            <Text
              ml={"1"}
              fontSize={"sm"}
              color={"#8A8D9F"}
              fontFamily={"Roboto-Regular"}>
              {item.totalGuest} Guest
            </Text>
          </HStack>

          <Box>
            <Text
              fontSize={"sm"}
              color={"blue.300"}
              fontFamily={"SatoshiVariable-Bold"}>
              {item.totalPrice}
            </Text>
          </Box>
        </HStack>

        <Text
          fontSize={"md"}
          color={"#262B2E"}
          fontFamily={"SatoshiVariable-Bold"}>
          {item.name}
        </Text>

        <Text fontSize={"md"} color={"#8A8D9F"} fontFamily={"Roboto-Regular"}>
          {item.tableName}
        </Text>

        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <HStack alignItems={"center"}>
            <Box
              width={"2"}
              height={"2"}
              bg={"green.300"}
              borderRadius={"full"}
            />

            <Text
              ml={"1"}
              fontSize={"sm"}
              color={"green.300"}
              fontFamily={"Roboto-Regular"}>
              {item.status}
            </Text>
          </HStack>

          {/* <Button
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
          </Button> */}
        </HStack>
      </VStack>
    </HStack>
  );
};

export default EachBookingItem;
