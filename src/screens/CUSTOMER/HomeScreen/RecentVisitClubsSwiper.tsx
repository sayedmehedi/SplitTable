import React from "react";
import {ClubListItem} from "@src/models";
import EachRecentVisitsItem from "./EachRecentVisitsItem";
import useGetRecentViewedClubsQuery from "@hooks/clubs/useGetRecentViewedClubsQuery";
import {
  Box,
  Text,
  VStack,
  Button,
  Center,
  HStack,
  Skeleton,
  ScrollView,
} from "native-base";

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
      <Center w={"full"}>
        <Box px={6} w={"full"} my={1}>
          <HStack
            my={2}
            w={"full"}
            alignItems={"center"}
            justifyContent={"space-between"}>
            <Text
              fontSize={"xl"}
              color={"#030819"}
              fontWeight={"bold"}
              fontFamily={"satoshi"}>
              Your Recent Visits
            </Text>
            <Button
              p={0}
              fontSize={"sm"}
              onPress={onSeeAll}
              variant={"unstyled"}
              fontFamily={"satoshi"}
              colorScheme={"transparent"}
              _text={{
                color: "#262B2E",
              }}>
              See all
            </Button>
          </HStack>
        </Box>
      </Center>

      <ScrollView
        mb={5}
        horizontal
        _contentContainerStyle={{
          px: 6,
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
    </Box>
  );
}
