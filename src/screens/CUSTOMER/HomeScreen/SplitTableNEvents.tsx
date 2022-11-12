import React from "react";
import {Text, View} from "react-native";
import {splitAppTheme} from "@src/theme";
import {SplitTableNEvent} from "@src/models";
import EachSplitTableNEventItem from "./EachSplitTableNEventItem";
import useGetSplitTableNEventsQuery from "@hooks/clubs/useGetSplitTableNEventsQuery";

type Props = {
  onItemPress: (item: SplitTableNEvent) => void;
};

export default function SplitTableNEvents({onItemPress}: Props) {
  const {data: splitTableNEventsResponse, isLoading: isNearbyClubsLoading} =
    useGetSplitTableNEventsQuery();

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
                <Text>Loading..</Text>
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
        : splitTableNEventsResponse?.tables.data.map(item => {
            return (
              <EachSplitTableNEventItem
                item={item}
                key={item.id}
                onPress={onItemPress}
              />
            );
          })}
    </View>
  );
}
