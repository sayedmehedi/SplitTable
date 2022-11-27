import React from "react";
import {SplitTable} from "@src/models";
import {ActivityIndicator, View} from "react-native";
import EachSplitTableNEventItem from "./EachSplitTableNEventItem";
import useGetSplitTablesQuery from "@hooks/clubs/useGetSplitTablesQuery";

type Props = {
  onItemPress: (item: SplitTable) => void;
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
