import React from "react";
import {TTableItem} from "./shared";
import {splitAppTheme} from "@src/theme";
import TableListItem from "./TableListItem";
import {TableCommonSearchParams} from "@src/models";
import GenericListEmpty from "@components/GenericListEmpty";
import {ActivityIndicator, FlatList, ListRenderItem, View} from "react-native";
import useInfiniteGetSplitTablesQuery from "@hooks/clubs/useInfiniteGetSplitTablesQuery";

type Props = {
  onItemPress: (item: TTableItem) => void;
} & TableCommonSearchParams;

const SplitTableList = ({onItemPress, ...params}: Props) => {
  const {
    refetch,
    isLoading,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    data: infiniteGetClubsByLocationsResponse,
  } = useInfiniteGetSplitTablesQuery(
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

  // if (isLoading) {
  //   return (
  //     <Box p={6}>
  //       {new Array(7).fill(1).map((_, index) => (
  //         <Box width={"full"} key={index} mb={index === 6 ? 0 : 5}>
  //           <VStack
  //             space={8}
  //             width={"full"}
  //             borderRadius={"md"}
  //             borderWidth={"1"}
  //             overflow={"hidden"}>
  //             <Skeleton height={"32"} />
  //             <Skeleton.Text px={"2"} my={"4"} />
  //           </VStack>
  //         </Box>
  //       ))}
  //     </Box>
  //   );
  // }

  return (
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
      ListFooterComponent={
        isFetchingNextPage ? (
          <View>
            <ActivityIndicator size={"small"} />
          </View>
        ) : null
      }
      ListEmptyComponent={<GenericListEmpty />}
    />
  );
};

export default SplitTableList;
