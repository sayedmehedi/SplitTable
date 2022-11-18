import React from "react";
import {TTableItem} from "./shared";
import {splitAppTheme} from "@src/theme";
import TableListItem from "./TableListItem";
import {AppTableTypes} from "@constants/table";
import GenericListEmpty from "@components/GenericListEmpty";
import {
  BookedTable,
  SplitTable,
  TableCommonSearchParams,
  TableType,
} from "@src/models";
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
} & TableCommonSearchParams;

const TableListByClubId = ({clubId, onItemPress, ...params}: Props) => {
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
      tableType,
      ...params,
      page: 1,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.tables.has_more_data) {
          return {
            clubId,
            tableType,
            ...params,
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
        ListHeaderComponent={
          <View
            style={{
              flexDirection: "row",
              paddingVertical: splitAppTheme.space[3],
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <TouchableOpacity
                onPress={() => setTableType(AppTableTypes.BOOKED)}>
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
              <TouchableOpacity
                onPress={() => setTableType(AppTableTypes.SPLIT)}>
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
        }
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
