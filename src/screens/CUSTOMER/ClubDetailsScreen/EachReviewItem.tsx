import React from "react";
import truncate from "lodash.truncate";
import {ReviewItem} from "@src/models";
import {Rating} from "react-native-ratings";
import {Text, HStack, VStack, Image} from "@components/ui";

type Props = {
  item: ReviewItem;
};

const EachReviewItem = ({item}: Props) => {
  return (
    <VStack height={"32"}>
      <HStack alignItems={"center"}>
        <Image
          size={50}
          source={{uri: item.user_image}}
          borderRadius={"full"}
        />

        <HStack ml={4} flexWrap={"wrap"} flex={1} justifyContent={"flex-start"}>
          <HStack justifyContent={"space-between"} width={"full"} mb={1}>
            <Text fontSize={"md"}>{item.user_name}</Text>

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

      <Text mt={4} fontSize={"md"}>
        {truncate(item.review)}
      </Text>
    </VStack>
  );
};

export default EachReviewItem;
