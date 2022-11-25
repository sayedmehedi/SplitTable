import React from "react";
import {ReviewItem} from "@src/models";
import {splitAppTheme} from "@src/theme";
import {Rating} from "react-native-ratings";
import EachReviewItem from "./EachReviewItem";
import Fontisto from "react-native-vector-icons/Fontisto";
import GenericListEmpty from "@components/GenericListEmpty";
import {useDimensions} from "@react-native-community/hooks";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";
import useInfiniteGetClubReviewsQuery from "@hooks/review/useInfiniteGetClubReviewsQuery";

const keyExtractor = (item: {id: number}) =>
  `user-reviews-${item.id.toString()}`;

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

export default function ReviewList() {
  const {
    window: {width: WINDOW_WIDTH},
  } = useDimensions();

  const {
    error: infiniteGetResourcesError,
    data: infiniteGetResourcesResponse,
    isLoading: isLoadingInfiniteResources,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteGetClubReviewsQuery(
    {
      page: 1,
    },
    {
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
        return eachPage?.reviews?.data ?? [];
      }) ?? []
    );
  }, [infiniteGetResourcesResponse?.pages]);

  const handleFetchNextPage = React.useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  if (isLoadingInfiniteResources) {
    return (
      <View
        style={{
          flex: 1,
          width: WINDOW_WIDTH,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  return (
    <View
      style={{
        paddingHorizontal: splitAppTheme.space["6"],
      }}>
      {!isLoadingInfiniteResources &&
        infiniteGetResourcesResponse !== undefined &&
        resourceListData.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: splitAppTheme.space[6],
              marginBottom: splitAppTheme.space[6],
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
        listKey={"user-reviews"}
        keyExtractor={keyExtractor}
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
}
