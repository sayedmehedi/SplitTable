import React from "react";
import {TTableItem} from "./shared";
import TableListItem from "./TableListItem";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  View,
} from "react-native";
import GenericListEmpty from "@components/GenericListEmpty";
import useInfiniteGetRecentViewsQuery from "@hooks/clubs/useInfiniteGetRecentViewsQuery";
import {splitAppTheme} from "@src/theme";
import {TableCommonSearchParams} from "@src/models";

type Props = {
  onItemPress: (item: TTableItem) => void;
} & TableCommonSearchParams;

const RecentVisits = ({onItemPress, ...params}: Props) => {
  const {
    refetch,
    isLoading,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    data: infiniteGetClubsByLocationsResponse,
  } = useInfiniteGetRecentViewsQuery(
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
        contentContainerStyle={{
          padding: splitAppTheme.space[6],
        }}
        ListEmptyComponent={<GenericListEmpty height={300} width={300} />}
      />
    </View>
  );
};

export default RecentVisits;
