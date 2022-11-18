import React from "react";
import {TTableItem} from "./shared";
import TableListItem from "./TableListItem";
import {AppTableTypes} from "@constants/table";
import {TableCommonSearchParams} from "@src/models";
import GenericListEmpty from "@components/GenericListEmpty";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  View,
} from "react-native";
import useInfiniteGetBookedTablesQuery from "@hooks/clubs/useInfiniteGetBookedTablesQuery";

type Props = {
  onItemPress: (item: TTableItem) => void;
} & TableCommonSearchParams;

const BookedTableList = ({onItemPress, ...params}: Props) => {
  const {
    refetch,
    isLoading,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    data: infiniteGetClubsByLocationsResponse,
  } = useInfiniteGetBookedTablesQuery(
    {
      page: 1,
      tableType: AppTableTypes.BOOKED,
      ...params,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.tables.has_more_data) {
          return {
            tableType: AppTableTypes.BOOKED,
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

  const renderClubList: ListRenderItem<typeof clubListData[0]> =
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
        contentContainerStyle={{
          padding: 24,
        }}
        ListEmptyComponent={<GenericListEmpty height={300} width={300} />}
      />
    </View>
  );
};

export default BookedTableList;
