import React from "react";
import {SvgUri} from "react-native-svg";
import {LocationItem} from "@src/models";
import useGetLocationsQuery from "@hooks/frontend/useGetLocationsQuery";
import {Box, Center, Pressable, ScrollView, Skeleton, Text} from "native-base";

type Props = {
  onItemPress?: (item: LocationItem) => void;
};

const LocationSwiper = ({onItemPress}: Props) => {
  const {data: locationsResponse, isLoading: isLocationLoading} =
    useGetLocationsQuery();

  const handleItemPress = (item: LocationItem) => {
    onItemPress?.(item);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      _contentContainerStyle={{
        px: 9,
      }}>
      {isLocationLoading
        ? new Array(6).fill(1).map((_, index) => {
            return (
              <Center w={"24"} key={index}>
                <Skeleton size={"20"} rounded={"full"} />
                <Skeleton size={"2"} w={"1/2"} mt={"3"} />
              </Center>
            );
          })
        : locationsResponse?.items.data.map((item, index) => {
            return (
              <Pressable
                key={item.id}
                mr={index === locationsResponse.items.data.length - 1 ? 0 : 3}
                onPress={handleItemPress.bind(null, item)}>
                <Box m={1} alignItems={"center"}>
                  <SvgUri uri={item.image} />

                  <Text
                    mt={2}
                    color={"black"}
                    fontWeight={"600"}
                    fontFamily={"roboto"}>
                    {item.location}
                  </Text>
                </Box>
              </Pressable>
            );
          })}
    </ScrollView>
  );
};

export default LocationSwiper;
