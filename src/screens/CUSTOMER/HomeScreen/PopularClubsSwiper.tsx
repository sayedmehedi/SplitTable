import React from "react";
import {ClubListItem} from "@src/models";
import EachPopularClubItem from "@components/EachPopularClubItem";
import {Box, Center, ScrollView, Skeleton, VStack} from "native-base";
import useGetPopularClubsQuery from "@hooks/frontend/useGetPopularClubsQuery";

type Props = {
  onItemPress: (club: ClubListItem) => void;
};

export default function PopularClubsSwiper({onItemPress}: Props) {
  const {data: popularClubsResponse, isLoading: isPopularClubsLoading} =
    useGetPopularClubsQuery();

  return (
    <ScrollView
      horizontal
      _contentContainerStyle={{
        px: 9,
        pb: 5,
      }}
      showsHorizontalScrollIndicator={false}>
      {isPopularClubsLoading
        ? new Array(7).fill(1).map((_, index) => (
            <Center w={"72"} key={index} mr={index === 6 ? 0 : 5}>
              <VStack
                w={"72"}
                space={8}
                rounded={"md"}
                borderWidth={"1"}
                overflow={"hidden"}>
                <Skeleton h={"32"} />
                <Skeleton.Text px={"2"} my={"4"} />
              </VStack>
            </Center>
          ))
        : popularClubsResponse?.clubs.data.map((item, index) => {
            return (
              <Box
                w={"72"}
                key={item.id}
                mr={
                  index === popularClubsResponse.clubs.data.length - 1 ? 0 : 5
                }>
                <EachPopularClubItem item={item} onPress={onItemPress} />
              </Box>
            );
          })}
    </ScrollView>
  );
}
