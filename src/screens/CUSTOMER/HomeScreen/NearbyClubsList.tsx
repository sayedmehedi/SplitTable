import React from "react";
import EachNearByItem from "./EachNearByItem";
import {NearbyClubListItem} from "@src/models";
import {Box, HStack, VStack} from "@components/ui";
import useGetNearbyClubsQuery from "@hooks/clubs/useGetNearbyClubsQuery";

type Props = {
  onItemPress: (item: NearbyClubListItem) => void;
};

export default function NearbyClubsList({onItemPress}: Props) {
  const {data: nearbyClubsResponse, isLoading: isNearbyClubsLoading} =
    useGetNearbyClubsQuery();

  return (
    <Box>
      {isNearbyClubsLoading
        ? new Array(5).fill(1).map((_, i) => (
            <Box width={"full"} key={i}>
              <HStack
                width={"full"}
                height={"32"}
                space={"5"}
                borderRadius={"md"}>
                {/* <Skeleton
                  height={"24"}
                  width={"24"}
                  borderRadius={"sm"}
                  startColor="coolGray.100"
                />
                <VStack flex={"3"} space={"2.5"}>
                  <Skeleton height={"5"} startColor="amber.300" />
                  <Skeleton.Text lines={2} />

                  <HStack space="2" alignItems="center">
                    <Skeleton size={"5"} borderRadius={"full"} />
                    <Skeleton height={"3"} flex={"2"} borderRadius={"full"} />
                    <Skeleton
                      height={"3"}
                      flex={"1"}
                      borderRadius={"full"}
                      startColor={"indigo.300"}
                    />
                  </HStack>
                </VStack> */}
              </HStack>
            </Box>
          ))
        : nearbyClubsResponse?.clubs.data.map(item => {
            return (
              <EachNearByItem key={item.id} item={item} onPress={onItemPress} />
            );
          })}
    </Box>
  );
}
