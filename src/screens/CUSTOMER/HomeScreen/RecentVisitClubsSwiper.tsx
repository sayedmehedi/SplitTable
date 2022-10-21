import React from "react";
import {ClubListItem} from "@src/models";
import EachRecentVisitsItem from "./EachRecentVisitsItem";
import {Box, Center, ScrollView, Skeleton, VStack} from "native-base";
import useGetRecentViewedClubsQuery from "@hooks/frontend/useGetRecentViewedClubsQuery";

type Props = {
  onItemPress: (club: ClubListItem) => void;
};

export default function RecentVisitClubsSwiper({onItemPress}: Props) {
  const {data: recentVisitClubsResponse, isLoading: isRecentVisitClubsLoading} =
    useGetRecentViewedClubsQuery();

  return (
    <ScrollView
      mb={5}
      horizontal
      _contentContainerStyle={{
        px: 9,
        pb: 2,
      }}
      showsHorizontalScrollIndicator={false}>
      {isRecentVisitClubsLoading
        ? new Array(7).fill(1).map((_, index) => (
            <Center w={"56"} key={index} mr={index === 6 ? 0 : 5}>
              <VStack
                w={"56"}
                space={8}
                rounded={"md"}
                borderWidth={"1"}
                overflow={"hidden"}>
                <Skeleton h={"32"} />
                <Skeleton.Text px={"2"} my={"4"} />
              </VStack>
            </Center>
          ))
        : recentVisitClubsResponse?.clubs.data.map((item, index) => {
            return (
              <Box
                w={"56"}
                key={item.id}
                mr={
                  index === recentVisitClubsResponse.clubs.data.length - 1
                    ? 0
                    : 5
                }>
                <EachRecentVisitsItem item={item} onPress={onItemPress} />
              </Box>
            );
          })}
    </ScrollView>
  );
}
