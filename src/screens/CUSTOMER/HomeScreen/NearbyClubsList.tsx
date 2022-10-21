import React from "react";
import {Box, Center, HStack, Skeleton, VStack} from "native-base";
import EachNearByItem from "./EachNearByItem";
import useGetNearbyClubsQuery from "@hooks/frontend/useGetNearbyClubsQuery";
import {NearbyClubListItem} from "@src/models";

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
            <Center w={"full"} key={i}>
              <HStack w={"full"} h={"32"} space={"5"} rounded={"md"}>
                <Skeleton
                  h={"24"}
                  w={"24"}
                  rounded={"sm"}
                  startColor="coolGray.100"
                />
                <VStack flex={"3"} space={"2.5"}>
                  <Skeleton h={"5"} startColor="amber.300" />
                  <Skeleton.Text lines={2} />

                  <HStack space="2" alignItems="center">
                    <Skeleton size={"5"} rounded={"full"} />
                    <Skeleton h={"3"} flex={"2"} rounded={"full"} />
                    <Skeleton
                      h={"3"}
                      flex={"1"}
                      rounded={"full"}
                      startColor={"indigo.300"}
                    />
                  </HStack>
                </VStack>
              </HStack>
            </Center>
          ))
        : nearbyClubsResponse?.clubs.data.map(item => {
            return (
              <EachNearByItem key={item.id} item={item} onPress={onItemPress} />
            );
          })}
    </Box>
  );
}
