import React from "react";
import {ClubListItem} from "@src/models";
import {Box, Center, ScrollView, VStack} from "@components/ui";
import EachPopularClubItem from "@components/EachPopularClubItem";
import useGetPopularClubsQuery from "@hooks/clubs/useGetPopularClubsQuery";

type Props = {
  onItemPress: (club: ClubListItem) => void;
};

export default function PopularClubsSwiper({onItemPress}: Props) {
  const {data: popularClubsResponse, isLoading: isPopularClubsLoading} =
    useGetPopularClubsQuery();

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        paddingBottom: 30,
        paddingHorizontal: 24,
      }}
      showsHorizontalScrollIndicator={false}>
      {isPopularClubsLoading
        ? new Array(7).fill(1).map((_, index) => (
            <Center width={"72"} key={index} mr={index === 6 ? 0 : 5}>
              <VStack
                space={8}
                width={"72"}
                borderRadius={"md"}
                borderWidth={"1"}
                overflow={"hidden"}>
                {/* <Skeleton height={"32"} />
                <Skeleton.Text px={"2"} my={"4"} /> */}
              </VStack>
            </Center>
          ))
        : popularClubsResponse?.clubs.data.map((item, index) => {
            return (
              <Box
                width={"72"}
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
