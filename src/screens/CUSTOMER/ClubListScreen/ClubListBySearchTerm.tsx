import React from "react";
import {TClubItem} from "./shared";
import ClubListItem from "./ClubListItem";
import {ActivityIndicator, FlatList, ListRenderItem, View} from "react-native";
import GenericListEmpty from "@components/GenericListEmpty";
import useInfiniteGetClubsBySearchTermQuery from "@hooks/clubs/useInfiniteGetClubsBySearchTermQuery";
import {splitAppTheme} from "@src/theme";

type Props = {
  searchTerm?: string;
  onItemPress: (item: TClubItem) => void;
};

const ClubListBySearchTerm = ({onItemPress, searchTerm}: Props) => {
  const {
    refetch,
    isLoading,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    data: infiniteGetClubsByLocationsResponse,
  } = useInfiniteGetClubsBySearchTermQuery(
    {
      page: 1,
      search: searchTerm,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.clubs.has_more_data) {
          return {
            search: searchTerm,
            page: lastPage.clubs.current_page + 1,
          };
        }
      },
    },
  );

  const clubListData = React.useMemo(() => {
    return (
      infiniteGetClubsByLocationsResponse?.pages.flatMap(eachPage => {
        return eachPage.clubs.data;
      }) ?? []
    );
  }, [infiniteGetClubsByLocationsResponse?.pages]);

  const renderClubList: ListRenderItem<typeof clubListData[0]> =
    React.useCallback(
      ({item}) => (
        <ClubListItem
          item={{
            id: item.id,
            name: item.name,
            image: item.image,
            location: item.location,
            avgRating: item.avg_rating,
            isFavorite: item.is_favourite,
            closingTime: item.closing_time,
            openingTime: item.opening_time,
            totalReviews: item.total_reviews,
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

export default ClubListBySearchTerm;
