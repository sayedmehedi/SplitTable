import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";
import {splitAppTheme} from "@src/theme";
import {ReviewItem} from "@src/models";
import {Rating} from "react-native-ratings";
import EachReviewItem from "./EachReviewItem";
import {OwnerStackRoutes} from "@constants/routes";
import Fontisto from "react-native-vector-icons/Fontisto";
import {StackScreenProps} from "@react-navigation/stack";
import useGetAuthDataQuery from "@hooks/useGetAuthDataQuery";
import {CompositeScreenProps} from "@react-navigation/native";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {RootStackParamList, OwnerStackParamList} from "@src/navigation";
import useInfiniteGetClubReviewsQuery from "@hooks/review/useInfiniteGetClubReviewsQuery";

type FavoriteScreenProps = CompositeScreenProps<
  StackScreenProps<OwnerStackParamList, typeof OwnerStackRoutes.REVIEWS>,
  StackScreenProps<RootStackParamList>
>;

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

const ReviewsScreen = ({}: FavoriteScreenProps) => {
  const {data: authData, isLoading: isAuthDataLoading} = useGetAuthDataQuery();

  const {
    error: infiniteGetResourcesError,
    data: infiniteGetResourcesResponse,
    isLoading: isLoadingInfiniteResources,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteGetClubReviewsQuery(
    {
      page: 1,
      ownerId: authData?.id,
    },
    {
      enabled: authData !== undefined,
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

  if (isLoadingInfiniteResources || isAuthDataLoading) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
    // return (
    //   <ScrollView>
    //     {ListHeaderComponent}

    //     <View p={6}>
    //       {new Array(5).fill(1).map((_, i) => (
    //         <Center width={"full"} key={i}>
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
    //         </Center>
    //       ))}
    //     </View>
    //   </ScrollView>
    // );
  }

  return (
    <View>
      {!isLoadingInfiniteResources &&
        infiniteGetResourcesResponse !== undefined &&
        resourceListData.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: splitAppTheme.space[6],
              marginHorizontal: splitAppTheme.space[6],
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
                    <View>
                      <Rating
                        readonly
                        jumpValue={1}
                        imageSize={15}
                        type={"custom"}
                        showRating={false}
                        tintColor={splitAppTheme.colors.white}
                        ratingBackgroundColor={
                          splitAppTheme.colors.coolGray[100]
                        }
                        startingValue={
                          infiniteGetResourcesResponse.pages[0].review_numbers[
                            id as any
                          ]
                        }
                      />
                    </View>

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

                    <View>
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

      <FlatList
        key={"user-reviews"}
        data={resourceListData}
        renderItem={renderEachReview}
        onEndReached={handleFetchNextPage}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: splitAppTheme.space["3"],
            }}
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: splitAppTheme.space["6"],
        }}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View>
              <ActivityIndicator size={"small"} />
            </View>
          ) : resourceListData.length === 0 ? (
            <View style={{alignItems: "center", justifyContent: "center"}}>
              <Text>No Data</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    width: 54,
    height: 22,
    marginRight: 8,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDF2EE",
  },
});

export default ReviewsScreen;
