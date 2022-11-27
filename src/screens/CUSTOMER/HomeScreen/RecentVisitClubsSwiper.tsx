import React from "react";
import {BookedTable} from "@src/models";
import {splitAppTheme} from "@src/theme";
import EachRecentVisitsItem from "./EachRecentVisitsItem";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import useGetRecentViewsClubsQuery from "@hooks/clubs/useGetRecentViewedClubsQuery";

type Props = {
  onSeeAll: () => void;
  onItemPress: (club: BookedTable) => void;
};

export default function RecentVisitsSwiper({onItemPress, onSeeAll}: Props) {
  const {data: recentVisitClubsResponse, isLoading: isRecentVisitClubsLoading} =
    useGetRecentViewsClubsQuery({
      paginate: 5,
    });

  return !isRecentVisitClubsLoading &&
    recentVisitClubsResponse?.tables?.data?.length === 0 ? (
    <View
      style={{
        marginVertical: splitAppTheme.space[1],
      }}
    />
  ) : (
    <View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: splitAppTheme.sizes.full,
        }}>
        <View
          style={{
            width: splitAppTheme.sizes.full,
            marginVertical: splitAppTheme.space[1],
            paddingHorizontal: splitAppTheme.space[6],
          }}>
          <View
            style={{
              flexDirection: "row",
              marginVertical: splitAppTheme.space[2],
              width: splitAppTheme.sizes.full,
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Text
              style={{
                color: "#030819",
                fontSize: splitAppTheme.fontSizes.xl,
                fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
              }}>
              Your Recent Visits
            </Text>

            <TouchableOpacity onPress={onSeeAll}>
              <Text
                style={{
                  color: "#030819",
                  fontSize: splitAppTheme.fontSizes.sm,
                  fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
                }}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        style={{
          marginBottom: splitAppTheme.space[5],
        }}
        horizontal
        contentContainerStyle={{
          paddingBottom: 8,
          paddingHorizontal: splitAppTheme.space[6],
        }}
        showsHorizontalScrollIndicator={false}>
        {isRecentVisitClubsLoading
          ? new Array(7).fill(1).map((_, index) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: splitAppTheme.sizes[56],
                  marginRight: splitAppTheme.space[index === 6 ? 0 : 5],
                }}
                key={index}>
                <View
                  style={{
                    overflow: "hidden",
                    width: splitAppTheme.sizes[56],
                    borderWidth: splitAppTheme.sizes[1],
                    borderRadius: splitAppTheme.radii.md,
                  }}>
                  {/* <Skeleton height={"32"} />
                  <Skeleton.Text px={"2"} my={"4"} /> */}
                </View>
              </View>
            ))
          : recentVisitClubsResponse?.tables?.data?.map((item, index) => {
              return (
                <View
                  style={{
                    width: splitAppTheme.sizes[56],
                    marginRight:
                      splitAppTheme.space[
                        index ===
                        recentVisitClubsResponse.tables.data.length - 1
                          ? 0
                          : 5
                      ],
                  }}
                  key={item.id}>
                  <EachRecentVisitsItem item={item} onPress={onItemPress} />
                </View>
              );
            })}
      </ScrollView>
    </View>
  );
}
