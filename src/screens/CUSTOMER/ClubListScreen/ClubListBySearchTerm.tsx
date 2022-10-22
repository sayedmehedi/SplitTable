import React from "react";
import {TClubItem} from "./shared";
import ClubListItem from "./ClubListItem";
import {ListRenderItem} from "react-native";
import GenericListEmpty from "@components/GenericListEmpty";
import {Box, Center, FlatList, Skeleton, Spinner, VStack} from "native-base";
import useInfiniteGetClubsBySearchTermQuery from "@hooks/clubs/useInfiniteGetClubsBySearchTermQuery";

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

  if (isLoading) {
    return (
      <Box p={6}>
        {new Array(7).fill(1).map((_, index) => (
          <Center w={"full"} key={index} mb={index === 6 ? 0 : 5}>
            <VStack
              space={8}
              w={"full"}
              rounded={"md"}
              borderWidth={"1"}
              overflow={"hidden"}>
              <Skeleton h={"32"} />
              <Skeleton.Text px={"2"} my={"4"} />
            </VStack>
          </Center>
        ))}
      </Box>
    );
  }

  return (
    <FlatList<typeof clubListData[0]>
      data={clubListData}
      onRefresh={refetch}
      refreshing={isRefetching}
      renderItem={renderClubList}
      onEndReached={handleFetchNextPage}
      showsVerticalScrollIndicator={false}
      _contentContainerStyle={{
        p: 6,
      }}
      ListFooterComponent={
        isFetchingNextPage ? (
          <Box>
            <Spinner />
          </Box>
        ) : null
      }
      ListEmptyComponent={<GenericListEmpty />}
    />
  );
};

export default ClubListBySearchTerm;
