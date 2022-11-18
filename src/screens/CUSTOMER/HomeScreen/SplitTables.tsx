import React from "react";
import {ActivityIndicator, Text, View} from "react-native";
import {splitAppTheme} from "@src/theme";
import {SplitTable} from "@src/models";
import EachSplitTableNEventItem from "./EachSplitTableNEventItem";
import useGetSplitTablesQuery from "@hooks/clubs/useGetSplitTablesQuery";

type Props = {
  onItemPress: (item: SplitTable) => void;
};

export default function SplitTables({onItemPress}: Props) {
  const {data: splitTableNEventsResponse, isLoading: isNearbyClubsLoading} =
    useGetSplitTablesQuery();

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
