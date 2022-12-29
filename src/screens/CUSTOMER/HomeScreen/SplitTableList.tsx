import React from "react";
import {splitAppTheme} from "@src/theme";
import {TTableItem} from "@components/owner/shared";
import {ActivityIndicator, View} from "react-native";
import EachTableNEventItem from "@components/EachTableNEventItem";
import useGetSplitTablesQuery from "@hooks/clubs/useGetSplitTablesQuery";

type Props = {
  onItemPress: (item: TTableItem) => void;
};

export default function SplitTableList({onItemPress}: Props) {
  const {data: splitTableNEventsResponse, isLoading: isNearbyClubsLoading} =
    useGetSplitTablesQuery({
      paginate: 5,
    });

  if (isNearbyClubsLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  return (
    <View>
      {splitTableNEventsResponse?.tables.data.map(item => {
        return (
          <View
            key={item.id}
            style={{
              marginBottom: splitAppTheme.space[5],
            }}>
            <EachTableNEventItem
              item={{
                id: item.id,
                date: item.date,
                name: item.name,
                image: item.image,
                location: item.location,
                distance: item.distance,
                total_joined: item.total_joined,
              }}
              onPress={onItemPress}
            />
          </View>
        );
      })}
    </View>
  );
}
