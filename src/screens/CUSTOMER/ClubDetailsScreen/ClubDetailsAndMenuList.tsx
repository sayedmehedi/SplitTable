import React from "react";
import {ClubMenuItem} from "@src/models";
import {splitAppTheme} from "@src/theme";
import EachOfferMenuItem from "./EachOfferMenuItem";
import GenericListEmpty from "@components/GenericListEmpty";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useInfiniteGetClubMenusQuery from "@hooks/menu/useInfiniteGetClubMenusQuery";
import {
  Text,
  View,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";

const keyExtractor = (item: {id: number}) => `menu-${item.id.toString()}`;

const renderOfferMenu: ListRenderItem<ClubMenuItem> = ({item}) => (
  <EachOfferMenuItem item={item} />
);

type Props = {clubId: number};

const ClubDetailsAndMenuListScreen = ({clubId}: Props) => {
  const {
    error: infiniteGetResourcesError,
    data: infiniteGetResourcesResponse,
    isLoading: isLoadingInfiniteResources,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteGetClubMenusQuery(
    {
      clubId: clubId,
      page: 1,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.menus.has_more_data) {
          return {
            page: lastPage.menus.current_page + 1,
          };
        }
      },
    },
  );
  useHandleNonFieldError(infiniteGetResourcesError);

  const resourceListData = React.useMemo(() => {
    return (
      infiniteGetResourcesResponse?.pages.flatMap(eachPage => {
        return eachPage.menus.data;
      }) ?? []
    );
  }, [infiniteGetResourcesResponse?.pages]);

  const handleFetchNextPage = React.useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  if (isLoadingInfiniteResources) {
    return <Text>Loading..</Text>;
    // return (
    //   <ScrollView>
    //     <Box p={6}>
    //       {new Array(5).fill(1).map((_, i) => (
    //         <Box width={"full"} key={i}>
    //           <HStack width={"full"} height={"32"} space={"5"} borderRadius={"md"}>
    //             <Skeleton
    //               height={"24"}
    //               width={"24"}
    //               borderRadius={"sm"}
    //               startColor="coolGray.100"
    //             />
    //             <VStack flex={"3"} space={"2.5"}>
    //               <Skeleton height={"5"} startColor="amber.300" />
    //               <Skeleton.Text lines={2} />

    //               <HStack space="2" alignItems="center">
    //                 <Skeleton size={"5"} borderRadius={"full"} />
    //                 <Skeleton height={"3"} flex={"2"} borderRadius={"full"} />
    //                 <Skeleton
    //                   height={"3"}
    //                   flex={"1"}
    //                   borderRadius={"full"}
    //                   startColor={"indigo.300"}
    //                 />
    //               </HStack>
    //             </VStack>
    //           </HStack>
    //         </Box>
    //       ))}
    //     </Box>
    //   </ScrollView>
    // );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: splitAppTheme.space["6"],
      }}>
      <FlatList
        onRefresh={refetch}
        listKey={"club-menus"}
        data={resourceListData}
        refreshing={isRefetching}
        keyExtractor={keyExtractor}
        renderItem={renderOfferMenu}
        onEndReached={handleFetchNextPage}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: splitAppTheme.space["4"],
            }}
          />
        )}
        // contentContainerStyle={{
        //   backgroundColor: "red",
        //   padding: splitAppTheme.space["6"],
        // }}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View>
              <ActivityIndicator />
            </View>
          ) : resourceListData.length === 0 ? (
            <GenericListEmpty />
          ) : null
        }
      />
    </View>
  );
};

export default ClubDetailsAndMenuListScreen;
