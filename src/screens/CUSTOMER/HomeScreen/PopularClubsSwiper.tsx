import React from "react";
import {ClubListItem} from "@src/models";
import EachPopularClubItem from "@components/EachPopularClubItem";
import useGetPopularClubsQuery from "@hooks/clubs/useGetPopularClubsQuery";
import {ScrollView, View} from "react-native";
import {splitAppTheme} from "@src/theme";

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
            <View
              style={{
                width: splitAppTheme.sizes[72],
                marginRight: splitAppTheme.space[index === 6 ? 0 : 5],
              }}
              key={index}>
              <View
                style={{
                  overflow: "hidden",
                  width: splitAppTheme.sizes[72],
                  borderWidth: splitAppTheme.sizes[1],
                  borderRadius: splitAppTheme.radii.md,
                }}>
                {/* <Skeleton height={"32"} />
                <Skeleton.Text px={"2"} my={"4"} /> */}
              </View>
            </View>
          ))
        : popularClubsResponse?.clubs.data.map((item, index) => {
            return (
              <View
                style={{
                  width: splitAppTheme.sizes[72],
                  marginRight:
                    splitAppTheme.space[
                      index === popularClubsResponse.clubs.data.length - 1
                        ? 0
                        : 5
                    ],
                }}
                key={item.id}>
                <EachPopularClubItem item={item} onPress={onItemPress} />
              </View>
            );
          })}
    </ScrollView>
  );
}
