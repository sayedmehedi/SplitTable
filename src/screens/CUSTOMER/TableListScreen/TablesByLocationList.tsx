import React from "react";
import {TTableItem} from "./shared";
import {splitAppTheme} from "@src/theme";
import TableListItem from "./TableListItem";
import {TableByLocationItem, TableType} from "@src/models";
import GenericListEmpty from "@components/GenericListEmpty";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useInfiniteGetTablesByLocationQuery from "@hooks/clubs/useInfiniteGetTablesByLocationQuery";

type Props = {
  locationId: number;
  onItemPress: (item: TTableItem) => void;
};

const TablesByLocationList = ({locationId, onItemPress}: Props) => {
  const [tableType, setTableType] = React.useState<TableType>("booked");

  const {
    refetch,
    isLoading,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    data: infiniteGetClubsByLocationsResponse,
  } = useInfiniteGetTablesByLocationQuery(
    {
      page: 1,
      locationId,
      tableType,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.tables.has_more_data) {
          return {
            locationId,
            tableType,
            page: lastPage.tables.current_page + 1,
          };
        }
      },
    },
  );

  const clubListData = React.useMemo(() => {
    return (
      infiniteGetClubsByLocationsResponse?.pages.flatMap(eachPage => {
        return eachPage.tables.data;
      }) ?? []
    );
  }, [infiniteGetClubsByLocationsResponse?.pages]);

  const renderClubList: ListRenderItem<TableByLocationItem> = React.useCallback(
    ({item}) => (
      <TableListItem
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
    ),
    [onItemPress],
  );

  const handleFetchNextPage = React.useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  if (isLoading) {
    return <Text>Loading..</Text>;
  }

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          padding: splitAppTheme.space[6],
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <TouchableOpacity onPress={() => setTableType("booked")}>
            <View
              style={{
                padding: splitAppTheme.space[3],
                borderRadius: splitAppTheme.radii.md,
                borderWidth: splitAppTheme.borderWidths[2],
                borderColor: splitAppTheme.colors.blue[300],
              }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: splitAppTheme.fontSizes.lg,
                  color: splitAppTheme.colors.blue[300],
                  fontFamily: splitAppTheme.fontConfig.Roboto[700].normal,
                }}>
                Book Table
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, marginLeft: splitAppTheme.space[3]}}>
          <TouchableOpacity onPress={() => setTableType("split")}>
            <View
              style={{
                padding: splitAppTheme.space[3],
                borderRadius: splitAppTheme.radii.md,
                borderWidth: splitAppTheme.borderWidths[2],
                borderColor: splitAppTheme.colors.secondary[300],
              }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: splitAppTheme.fontSizes.lg,
                  color: splitAppTheme.colors.secondary[300],
                  fontFamily: splitAppTheme.fontConfig.Roboto[700].normal,
                }}>
                Split Table
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={clubListData}
        onRefresh={refetch}
        refreshing={isRefetching}
        renderItem={renderClubList}
        onEndReached={handleFetchNextPage}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 0,
          padding: splitAppTheme.space[6],
        }}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View>
              <ActivityIndicator size={"small"} />
            </View>
          ) : null
        }
        ListEmptyComponent={<GenericListEmpty />}
      />
    </View>
  );
};

export default TablesByLocationList;
