import React from "react";
import EachNearByItem from "./EachNearByItem";
import {NearbyClubListItem} from "@src/models";
import useGetNearbyClubsQuery from "@hooks/clubs/useGetNearbyClubsQuery";
import {splitAppTheme} from "@src/theme";
import {View} from "react-native";

type Props = {
  onItemPress: (item: NearbyClubListItem) => void;
};

export default function NearbyClubsList({onItemPress}: Props) {
  const {data: nearbyClubsResponse, isLoading: isNearbyClubsLoading} =
    useGetNearbyClubsQuery();

  return (
    <View>
      {isNearbyClubsLoading
        ? new Array(5).fill(1).map((_, i) => (
            <View
              style={{
                width: splitAppTheme.sizes.full,
              }}
              key={i}>
              <View
                style={{
                  flexDirection: "row",
                  width: splitAppTheme.sizes.full,
                  height: splitAppTheme.sizes[32],
                  borderRadius: splitAppTheme.radii.md,
                }}>
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
              </View>
            </View>
          ))
        : nearbyClubsResponse?.clubs.data.map(item => {
            return (
              <EachNearByItem key={item.id} item={item} onPress={onItemPress} />
            );
          })}
    </View>
  );
}
