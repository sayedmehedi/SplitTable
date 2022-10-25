import React from "react";
import truncate from "lodash.truncate";
import {ReviewItem} from "@src/models";
import {Rating} from "react-native-ratings";
import {
  View,
  Text,
  Image,
  HStack,
  VStack,
  Box,
  Avatar,
  Heading,
  Flex,
} from "native-base";

type Props = {
  item: ReviewItem;
};

const EachReviewItem = ({item}: Props) => {
  return (
    <VStack h={"32"} space={"4"}>
      <HStack space={"4"} alignItems={"center"}>
        <Avatar size={"lg"} source={{uri: item.user_image}} />

        <HStack flexWrap={"wrap"} flex={1} justifyContent={"flex-start"}>
          <HStack justifyContent={"space-between"} w={"full"}>
            <Heading size={"md"}>{item.user_name}</Heading>

            <Text fontSize={"md"}>{item.date}</Text>
          </HStack>

          <Rating
            readonly
            imageSize={15}
            showRating={false}
            tintColor={"white"}
            startingValue={item.rating}
          />
        </HStack>
      </HStack>

      <Text fontSize={"md"}>{item.review}</Text>
    </VStack>
  );
};

export default EachReviewItem;
