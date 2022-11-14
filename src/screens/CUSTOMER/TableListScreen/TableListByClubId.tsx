import React from "react";
import {TTableItem} from "./shared";
import {splitAppTheme} from "@src/theme";
import TableListItem from "./TableListItem";
import {AppTableTypes} from "@constants/table";
import GenericListEmpty from "@components/GenericListEmpty";
import {BookedTable, SplitTable, TableType} from "@src/models";
import useInfiniteGetTablesByClubIdQuery from "@hooks/clubs/useInfiniteGetTablesByClubIdQuery";
import {
  Text,
  View,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

type Props = {
  clubId: number;
  onItemPress: (item: TTableItem) => void;
};

const TableListByClubId = ({clubId, onItemPress}: Props) => {
  const [tableType, setTableType] = React.useState<TableType>(
    AppTableTypes.BOOKED,
  );

  const {
    refetch,
    isLoading,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    data: infiniteGetClubsByLocationsResponse,
  } = useInfiniteGetTablesByClubIdQuery(
    {
      clubId,
      page: 1,
      tableType,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.tables.has_more_data) {
          return {
            clubId,
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

  const renderClubList: ListRenderItem<BookedTable | SplitTable> =
    React.useCallback(
      ({item}) => (
        <TableListItem
          item={{
            id: item.id,
            date: item.date,
            name: item.name,
            image: item.image,
            location: item.location,
            distance: item.distance,
            total_joined:
              "total_joined" in item ? item.total_joined : undefined,
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
          <TouchableOpacity onPress={() => setTableType(AppTableTypes.BOOKED)}>
            <View
              style={{
                padding: splitAppTheme.space[3],
                borderRadius: splitAppTheme.radii.md,
                borderWidth: splitAppTheme.borderWidths[2],
                borderColor: splitAppTheme.colors.blue[300],
                backgroundColor:
                  tableType === AppTableTypes.BOOKED
                    ? splitAppTheme.colors.blue[300]
                    : splitAppTheme.colors.white,
              }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: splitAppTheme.fontSizes.lg,
                  fontFamily: splitAppTheme.fontConfig.Roboto[700].normal,
                  color:
                    tableType === AppTableTypes.BOOKED
                      ? splitAppTheme.colors.white
                      : splitAppTheme.colors.blue[300],
                }}>
                Book Table
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, marginLeft: splitAppTheme.space[3]}}>
          <TouchableOpacity onPress={() => setTableType(AppTableTypes.SPLIT)}>
            <View
              style={{
                padding: splitAppTheme.space[3],
                borderRadius: splitAppTheme.radii.md,
                borderWidth: splitAppTheme.borderWidths[2],
                borderColor: splitAppTheme.colors.secondary[300],
                backgroundColor:
                  tableType === AppTableTypes.SPLIT
                    ? splitAppTheme.colors.secondary[300]
                    : splitAppTheme.colors.white,
              }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: splitAppTheme.fontSizes.lg,
                  fontFamily: splitAppTheme.fontConfig.Roboto[700].normal,
                  color:
                    tableType === AppTableTypes.SPLIT
                      ? splitAppTheme.colors.white
                      : splitAppTheme.colors.secondary[300],
                }}>
                Split Table
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {isFetchingNextPage ? (
        <View>
          <ActivityIndicator size={"small"} />
        </View>
      ) : null}
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
        ListEmptyComponent={<GenericListEmpty height={300} width={300} />}
      />
    </View>
  );
};

export default TableListByClubId;
