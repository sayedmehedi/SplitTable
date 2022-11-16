import React from "react";
import {TTableItem} from "./shared";
import {splitAppTheme} from "@src/theme";
import TableListItem from "./TableListItem";
import {TableCommonSearchParams} from "@src/models";
import GenericListEmpty from "@components/GenericListEmpty";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  View,
} from "react-native";
import useInfiniteGetJoinTablesQuery from "@hooks/clubs/useInfiniteGetJoinTablesQuery";

type Props = {
  onItemPress: (item: TTableItem) => void;
} & TableCommonSearchParams;

const JoinTableList = ({onItemPress, ...params}: Props) => {
  console.log("params in join table", params);
  const {
    refetch,
    isLoading,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    data: infiniteGetClubsByLocationsResponse,
  } = useInfiniteGetJoinTablesQuery(
    {
      page: 1,
      ...params,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.tables.has_more_data) {
          return {
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
          padding: splitAppTheme.space[6],
        }}
        ListEmptyComponent={<GenericListEmpty height={300} width={300} />}
      />
    </View>
  );
};

export default JoinTableList;
