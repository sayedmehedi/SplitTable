import dayjs from "dayjs";
import React from "react";
import {ReviewItem} from "@src/models";
import {splitAppTheme} from "@src/theme";
import {Rating} from "react-native-ratings";
import EachReviewItem from "./EachReviewItem";
import relativeTime from "dayjs/plugin/relativeTime";
import Fontisto from "react-native-vector-icons/Fontisto";
import GenericListEmpty from "@components/GenericListEmpty";
import {useDimensions} from "@react-native-community/hooks";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useGetClubDetailsQuery from "@hooks/clubs/useGetClubDetailsQuery";
import useInfiniteGetClubReviewsQuery from "@hooks/review/useInfiniteGetClubReviewsQuery";
import {
  Text,
  View,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";

dayjs.extend(relativeTime);

const keyExtractor = (item: {id: number}) => `review-${item.id.toString()}`;

const renderEachReview: ListRenderItem<ReviewItem> = ({item}) => (
  <View>
    <EachReviewItem item={item} />
    <View
      style={{
        borderStyle: "dashed",
        borderColor: splitAppTheme.colors.coolGray[300],
        borderBottomWidth: splitAppTheme.borderWidths[2],
      }}
    />
  </View>
);

type Props = {
  clubId: number;
};

const ClubDetailsAndReviewList = ({clubId}: Props) => {
  const {
    window: {width: WINDOW_WIDTH},
  } = useDimensions();
  const {
    error: clubDetailsError,
    data: clubDetailsResponse,
    isLoading: isClubDetailsLoading,
  } = useGetClubDetailsQuery(clubId);
  useHandleNonFieldError(clubDetailsError);

  const {
    error: infiniteGetResourcesError,
    data: infiniteGetResourcesResponse,
    isLoading: isLoadingInfiniteResources,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteGetClubReviewsQuery(
    {
      page: 1,
      ownerId: clubDetailsResponse?.club?.owner_id ?? 0,
    },
    {
      enabled: clubDetailsResponse?.club?.owner_id !== undefined,
      getNextPageParam(lastPage) {
        if (lastPage.reviews?.has_more_data) {
          return {
            page: lastPage.reviews.current_page + 1,
          };
        }
      },
    },
  );
  useHandleNonFieldError(infiniteGetResourcesError);

  const resourceListData = React.useMemo(() => {
    return (
      infiniteGetResourcesResponse?.pages?.flatMap(eachPage => {
        return (
          eachPage?.reviews?.data?.map(eachReview => ({
            ...eachReview,
            // date: dayjs(eachReview.date, "DD MMM YYYY").fromNow(),
            date: eachReview.date,
          })) ?? []
        );
      }) ?? []
    );
  }, [infiniteGetResourcesResponse?.pages]);

  const handleFetchNextPage = React.useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  // if (isClubDetailsLoading) {
  //   return (
  //     <ScrollView>
  //       <Skeleton height={300} />

  //       <View mx={"6"}>
  //         <Skeleton
  //           width={"full"}
  //           borderRadius={"xl"}
  //           height={CARD_HEIGHT}
  //           bg={"tomato"}
  //           marginTop={CARD_NEGATIVE_MARGIN}
  //         />

  //         <Skeleton
  //           height={"12"}
  //           my={"5"}
  //           width={"full"}
  //           borderRadius={"lg"}
  //           borderWidth={"2"}
  //           borderColor={"primary.300"}
  //         />

  //         <HStack space={"2"}>
  //           <View flex={1}>
  //             <Skeleton
  //               height={"12"}
  //               my={"5"}
  //               width={"full"}
  //               borderRadius={"lg"}
  //               bg={"secondary.300"}
  //             />
  //           </View>

  //           <View flex={1}>
  //             <Skeleton
  //               height={"12"}
  //               my={"5"}
  //               width={"full"}
  //               borderRadius={"lg"}
  //               bg={"blue.300"}
  //             />
  //           </View>

  //           <View flex={1}>
  //             <Skeleton
  //               height={"12"}
  //               my={"5"}
  //               width={"full"}
  //               borderRadius={"lg"}
  //               bg={"secondary.100"}
  //             />
  //           </View>
  //         </HStack>
  //       </View>

  //       <View p={6}>
  //         {new Array(5).fill(1).map((_, i) => (
  //           <Center width={"full"} key={i}>
  //             <HStack width={"full"} height={"32"} space={"5"} borderRadius={"md"}>
  //               <Skeleton
  //                 height={"24"}
  //                 width={"24"}
  //                 borderRadius={"sm"}
  //                 startColor="coolGray.100"
  //               />
  //               <VStack flex={"3"} space={"2.5"}>
  //                 <Skeleton height={"5"} startColor="amber.300" />
  //                 <Skeleton.Text lines={2} />

  //                 <HStack space="2" alignItems="center">
  //                   <Skeleton size={"5"} borderRadius={"full"} />
  //                   <Skeleton height={"3"} flex={"2"} borderRadius={"full"} />
  //                   <Skeleton
  //                     height={"3"}
  //                     flex={"1"}
  //                     borderRadius={"full"}
  //                     startColor={"indigo.300"}
  //                   />
  //                 </HStack>
  //               </VStack>
  //             </HStack>
  //           </Center>
  //         ))}
  //       </View>
  //     </ScrollView>
  //   );
  // }

  if (!clubDetailsResponse) {
    return (
      <View
        style={{
          width: WINDOW_WIDTH,
          flexDirection: "row",
          height: splitAppTheme.sizes.full,
        }}>
        <View
          style={{
            height: splitAppTheme.sizes.full,
            width: splitAppTheme.sizes.full,
          }}>
          <GenericListEmpty />
        </View>
      </View>
    );
  }

  // if (isLoadingInfiniteResources) {
  //   return (
  //     <ScrollView>
  //       {ListHeaderComponent}

  //       <View p={6}>
  //         {new Array(5).fill(1).map((_, i) => (
  //           <Center width={"full"} key={i}>
  //             <HStack width={"full"} height={"32"} space={"5"} borderRadius={"md"}>
  //               <Skeleton
  //                 height={"24"}
  //                 width={"24"}
  //                 borderRadius={"sm"}
  //                 startColor="coolGray.100"
  //               />
  //               <VStack flex={"3"} space={"2.5"}>
  //                 <Skeleton height={"5"} startColor="amber.300" />
  //                 <Skeleton.Text lines={2} />

  //                 <HStack space="2" alignItems="center">
  //                   <Skeleton size={"5"} borderRadius={"full"} />
  //                   <Skeleton height={"3"} flex={"2"} borderRadius={"full"} />
  //                   <Skeleton
  //                     height={"3"}
  //                     flex={"1"}
  //                     borderRadius={"full"}
  //                     startColor={"indigo.300"}
  //                   />
  //                 </HStack>
  //               </VStack>
  //             </HStack>
  //           </Center>
  //         ))}
  //       </View>
  //     </ScrollView>
  //   );
  // }

  return (
    <View
      style={{
        width: WINDOW_WIDTH,
      }}>
      {infiniteGetResourcesResponse !== undefined &&
        infiniteGetResourcesResponse?.pages?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: splitAppTheme.space[6],
            }}>
            <View
              style={{
                maxWidth: splitAppTheme.sizes[32],
              }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <Fontisto name="star" color={"#FFC529"} size={10} />
                <Text
                  style={{
                    fontSize: splitAppTheme.fontSizes.md,
                    marginLeft: splitAppTheme.space[1],
                  }}>
                  {infiniteGetResourcesResponse.pages[0].avg_rating}
                </Text>
              </View>

              <Text
                numberOfLines={2}
                style={{
                  fontSize: splitAppTheme.fontSizes.md,
                  marginLeft: splitAppTheme.space[1],
                }}>
                Based on {infiniteGetResourcesResponse.pages[0].total_reviews}{" "}
                Review
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                marginLeft: splitAppTheme.space[5],
              }}>
              {Object.entries(
                infiniteGetResourcesResponse?.pages?.[0]?.review_percentages ??
                  {},
              ).map(([id, percentage]) => {
                return (
                  <View
                    key={id}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <Rating
                      readonly
                      jumpValue={1}
                      imageSize={15}
                      type={"custom"}
                      showRating={false}
                      tintColor={splitAppTheme.colors.white}
                      ratingBackgroundColor={splitAppTheme.colors.coolGray[100]}
                      startingValue={
                        infiniteGetResourcesResponse.pages[0].review_numbers[
                          id as any
                        ]
                      }
                    />

                    <View
                      style={{
                        flex: 1,
                        position: "relative",
                        marginHorizontal: splitAppTheme.space[3],
                      }}>
                      <View
                        style={{
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          height: 1,
                          zIndex: 1,
                          position: "absolute",
                          width: splitAppTheme.sizes.full,
                          borderRadius: splitAppTheme.radii.full,
                          backgroundColor: splitAppTheme.colors.gray[300],
                        }}
                      />
                      <View
                        style={{
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          height: 1,
                          zIndex: 2,
                          position: "absolute",
                          width: `${percentage}%` as string,
                          borderRadius: splitAppTheme.radii.full,
                          backgroundColor: splitAppTheme.colors.yellow[300],
                        }}
                      />
                    </View>

                    <View style={{width: 40}}>
                      <Text style={{fontSize: splitAppTheme.fontSizes.xs}}>
                        {percentage}%
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}

      {isFetchingNextPage ? (
        <View>
          <ActivityIndicator size={"small"} />
        </View>
      ) : null}

      <FlatList
        onRefresh={refetch}
        data={resourceListData}
        listKey={"club-reviews"}
        refreshing={isRefetching}
        keyExtractor={keyExtractor}
        renderItem={renderEachReview}
        onEndReached={handleFetchNextPage}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: splitAppTheme.space["4"],
            }}
          />
        )}
        ListFooterComponent={
          resourceListData.length === 0 ? <GenericListEmpty /> : null
        }
      />
    </View>
  );
};

export default ClubDetailsAndReviewList;
