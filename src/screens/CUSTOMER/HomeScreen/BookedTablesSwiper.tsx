import React from "react";
import {BookedTable} from "@src/models";
import {splitAppTheme} from "@src/theme";
import {ScrollView, View} from "react-native";
import EachTableNEventItem from "@components/EachTableNEventItem";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import useGetBookedTablesQuery from "@hooks/clubs/useGetBookedTablesQuery";

type Props = {
  onItemPress: (club: BookedTable) => void;
};

export default function BookedTablesSwiper({onItemPress}: Props) {
  const {data: tableNEventsResponse, isLoading: isPopularClubsLoading} =
    useGetBookedTablesQuery();

  console.log("tableNEventsResponse", tableNEventsResponse);

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        paddingBottom: 30,
        paddingHorizontal: 24,
      }}
      showsHorizontalScrollIndicator={false}>
      {isPopularClubsLoading ? (
        <SkeletonPlaceholder>
          <View
            style={{
              flexDirection: "row",
            }}>
            {new Array(7).fill(1).map((_, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: "#218acc",
                  width: splitAppTheme.sizes[72],
                  borderRadius: splitAppTheme.radii.lg,
                  marginRight: splitAppTheme.space[index === 6 ? 0 : 5],
                }}>
                <View
                  style={{
                    overflow: "hidden",
                    width: splitAppTheme.sizes[72],
                  }}>
                  <View
                    style={{
                      borderRadius: 0,
                      height: splitAppTheme.sizes[32],
                    }}></View>

                  <View
                    style={{
                      borderRadius: 0,
                      height: splitAppTheme.sizes[4],
                      width: splitAppTheme.sizes["1/3"],
                      marginTop: splitAppTheme.space["4"],
                      paddingHorizontal: splitAppTheme.space["2"],
                    }}></View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginVertical: splitAppTheme.space["4"],
                    }}>
                    <View
                      style={{
                        borderRadius: 0,
                        height: splitAppTheme.sizes[2],
                        width: splitAppTheme.sizes["2/5"],
                      }}></View>

                    <View
                      style={{
                        borderRadius: 0,
                        height: splitAppTheme.sizes[2],
                        width: splitAppTheme.sizes["1/5"],
                      }}></View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </SkeletonPlaceholder>
      ) : (
        tableNEventsResponse?.tables?.data.map((item, index) => {
          return (
            <View
              style={{
                width: splitAppTheme.sizes[72],
                marginRight:
                  splitAppTheme.space[
                    index === tableNEventsResponse.tables.data.length - 1
                      ? 0
                      : 5
                  ],
              }}
              key={item.id}>
              <EachTableNEventItem item={item} onPress={onItemPress} />
            </View>
          );
        })
      )}
    </ScrollView>
  );
}
