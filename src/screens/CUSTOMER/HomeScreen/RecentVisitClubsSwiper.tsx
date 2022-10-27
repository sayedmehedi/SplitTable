import React from "react";
import {ClubListItem} from "@src/models";
import EachRecentVisitsItem from "./EachRecentVisitsItem";
import useGetRecentViewedClubsQuery from "@hooks/clubs/useGetRecentViewedClubsQuery";
import {
  Box,
  Text,
  VStack,
  Center,
  HStack,
  ScrollView,
  TouchableOpacity,
} from "@components/ui";

type Props = {
  onSeeAll: () => void;
  onItemPress: (club: ClubListItem) => void;
};

export default function RecentVisitClubsSwiper({onItemPress, onSeeAll}: Props) {
  const {data: recentVisitClubsResponse, isLoading: isRecentVisitClubsLoading} =
    useGetRecentViewedClubsQuery();

  return !isRecentVisitClubsLoading &&
    recentVisitClubsResponse?.clubs.data.length === 0 ? (
    <Box my={1} />
  ) : (
    <Box>
      <Center width={"full"}>
        <Box px={6} width={"full"} my={1}>
          <HStack
            my={2}
            width={"full"}
            alignItems={"center"}
            justifyContent={"space-between"}>
            <Text
              fontSize={"xl"}
              color={"#030819"}
              fontFamily={"SatoshiVariable-Bold"}>
              Your Recent Visits
            </Text>

            <TouchableOpacity onPress={onSeeAll}>
              <Text
                fontSize={"sm"}
                color={"#262B2E"}
                fontFamily={"Roboto-Regular"}>
                See all
              </Text>
            </TouchableOpacity>
          </HStack>
        </Box>
      </Center>

      <ScrollView
        mb={5}
        horizontal
        contentContainerStyle={{
          paddingBottom: 8,
          paddingHorizontal: 24,
        }}
        showsHorizontalScrollIndicator={false}>
        {isRecentVisitClubsLoading
          ? new Array(7).fill(1).map((_, index) => (
              <Center width={"56"} key={index} mr={index === 6 ? 0 : 5}>
                <VStack
                  space={8}
                  width={"56"}
                  borderRadius={"md"}
                  borderWidth={"1"}
                  overflow={"hidden"}>
                  {/* <Skeleton height={"32"} />
                  <Skeleton.Text px={"2"} my={"4"} /> */}
                </VStack>
              </Center>
            ))
          : recentVisitClubsResponse?.clubs.data.map((item, index) => {
              return (
                <Box
                  width={"56"}
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
    </Box>
  );
}
