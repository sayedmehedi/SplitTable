import React from "react";
import {TClubItem} from "./shared";
import ClubListItem from "./ClubListItem";
import {ListRenderItem} from "react-native";
import {ClubByLocationItem} from "@src/models";
import GenericListEmpty from "@components/GenericListEmpty";
import {Box, Center, VStack, Spinner, FlatList, Skeleton} from "native-base";
import useInfiniteGetClubsByLocationQuery from "@hooks/clubs/useInfiniteGetClubsByLocationQuery";

type Props = {
  locationId: number;
  onItemPress: (item: TClubItem) => void;
};

const ClubsByLocationList = ({locationId, onItemPress}: Props) => {
  const {
    refetch,
    isLoading,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    data: infiniteGetClubsByLocationsResponse,
  } = useInfiniteGetClubsByLocationQuery(
    {
      locationId,
      page: 1,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.clubs.has_more_data) {
          return {
            locationId,
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

  const renderClubList: ListRenderItem<ClubByLocationItem> = React.useCallback(
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

export default ClubsByLocationList;
