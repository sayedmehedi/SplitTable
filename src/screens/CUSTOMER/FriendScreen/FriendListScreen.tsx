import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ListRenderItem,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {splitAppTheme} from "@src/theme";
import {CustomerStackRoutes, RootStackRoutes} from "@constants/routes";
import {StackNavigationProp, StackScreenProps} from "@react-navigation/stack";
import {
  useNavigation,
  CompositeScreenProps,
  CompositeNavigationProp,
} from "@react-navigation/native";
import {FriendListItem} from "@src/models";
import FastImage from "react-native-fast-image";
import {FriendshipStatusNum} from "@constants/friend";
import LinearGradient from "react-native-linear-gradient";
import {useDimensions} from "@react-native-community/hooks";
import GenericListEmpty from "@components/GenericListEmpty";
import useGetAuthDataQuery from "@hooks/useGetAuthDataQuery";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";
import {RootStackParamList, CustomerStackParamList} from "@src/navigation";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import useAcceptFriendshipMutation from "@hooks/user/useAcceptFriendshipMutation";
import useRemoveFriendshipMutation from "@hooks/user/useRemoveFriendshipMutation";
import useInfiniteGetFriendListQuery from "@hooks/user/useInfiniteGetFriendListQuery";

type Props = CompositeScreenProps<
  StackScreenProps<CustomerStackParamList, typeof CustomerStackRoutes.FRIENDS>,
  StackScreenProps<RootStackParamList>
>;

type NavigationProps = CompositeNavigationProp<
  StackNavigationProp<
    CustomerStackParamList,
    typeof CustomerStackRoutes.FRIENDS
  >,
  StackNavigationProp<RootStackParamList>
>;

const AcceptedFriendsRoute = ({
  ListHeaderComponent,
}: {
  ListHeaderComponent:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) => {
  const {
    window: {width: WINDOW_WIDTH},
  } = useDimensions();

  const navigation = useNavigation<NavigationProps>();

  const {
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    error: infiniteGetResourcesError,
    data: infiniteGetResourcesResponse,
    isLoading: isLoadingInfiniteResources,
  } = useInfiniteGetFriendListQuery(
    {
      page: 1,
      status: FriendshipStatusNum.ACCEPTED,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.items.has_more_data) {
          return {
            page: lastPage.items.current_page + 1,
          };
        }
      },
    },
  );
  useHandleNonFieldError(infiniteGetResourcesError);

  const {
    mutate: removeFriendship,
    error: removeFriendshipError,
    data: removeFriendshipResponse,
  } = useRemoveFriendshipMutation();
  useHandleNonFieldError(removeFriendshipError);
  useHandleResponseResultError(removeFriendshipResponse);

  const resourceListData = React.useMemo(() => {
    return (
      infiniteGetResourcesResponse?.pages.flatMap(eachPage => {
        return eachPage.items.data;
      }) ?? []
    );
  }, [infiniteGetResourcesResponse?.pages]);

  const handleFetchNextPage = React.useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const flatlistContentContainerStyle = React.useMemo(() => {
    return {
      padding: splitAppTheme.space[6],
    };
  }, [splitAppTheme.space[6]]);

  const handleRemoveFriendship = React.useCallback(
    (resource: FriendListItem) => {
      removeFriendship({
        friendId: resource.user_id,
      });
    },
    [],
  );

  const renderUpcomingBookingItem: ListRenderItem<FriendListItem> =
    React.useCallback(
      ({item}) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(RootStackRoutes.PROFILE, {
              userId: item.friend_id,
            });
          }}>
          <View>
            <View
              style={{
                borderWidth: 1,
                alignItems: "center",
                flexDirection: "row",
                borderColor: "#F1F1F1",
                backgroundColor: "white",
                width: splitAppTheme.sizes.full,
                borderRadius: splitAppTheme.radii.xl,
                paddingVertical: splitAppTheme.space["3"],
                paddingHorizontal: splitAppTheme.space["4"],
              }}>
              <FastImage
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: splitAppTheme.radii.full,
                }}
                source={{
                  uri: item.friend_image,
                }}
              />

              <View
                style={{
                  flex: 1,
                  marginLeft: splitAppTheme.space[4],
                }}>
                <Text
                  style={{
                    color: "#262B2E",
                    fontSize: splitAppTheme.fontSizes.md,
                    fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                  }}>
                  {item.name}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: splitAppTheme.space[2],
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      handleRemoveFriendship(item);
                    }}>
                    <Text
                      style={{
                        textDecorationLine: "underline",
                        fontSize: splitAppTheme.fontSizes.xs,
                        color: splitAppTheme.colors.error[300],
                        fontFamily:
                          splitAppTheme.fontConfig.Sathoshi[500].normal,
                      }}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ),
      [handleRemoveFriendship, navigation],
    );

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
    <View style={{width: WINDOW_WIDTH}}>
      {isFetchingNextPage ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : null}

      <FlatList
        onRefresh={refetch}
        listKey={"club-menus"}
        data={resourceListData}
        refreshing={isRefetching}
        keyExtractor={keyExtractor}
        onEndReached={handleFetchNextPage}
        showsVerticalScrollIndicator={false}
        renderItem={renderUpcomingBookingItem}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={flatlistContentContainerStyle}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: splitAppTheme.space["4"],
            }}
          />
        )}
        ListEmptyComponent={<GenericListEmpty height={300} width={300} />}
      />
    </View>
  );
};

const PendingFriendsRoute = ({
  ListHeaderComponent,
}: {
  ListHeaderComponent:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) => {
  const {
    window: {width: WINDOW_WIDTH},
  } = useDimensions();
  const navigation = useNavigation<NavigationProps>();

  const {data: authData, isLoading: isAuthDataLoading} = useGetAuthDataQuery();

  const {
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    error: infiniteGetResourcesError,
    data: infiniteGetResourcesResponse,
    isLoading: isLoadingInfiniteResources,
  } = useInfiniteGetFriendListQuery(
    {
      page: 1,
      status: FriendshipStatusNum.PENDING,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.items.has_more_data) {
          return {
            page: lastPage.items.current_page + 1,
          };
        }
      },
    },
  );
  useHandleNonFieldError(infiniteGetResourcesError);

  const {
    mutate: acceptFriendship,
    error: acceptFriendshipError,
    data: acceptFriendshipResponse,
  } = useAcceptFriendshipMutation();
  useHandleNonFieldError(acceptFriendshipError);
  useHandleResponseResultError(acceptFriendshipResponse);

  const resourceListData = React.useMemo(() => {
    return (
      infiniteGetResourcesResponse?.pages.flatMap(eachPage => {
        return eachPage.items.data;
      }) ?? []
    );
  }, [infiniteGetResourcesResponse?.pages]);

  const handleFetchNextPage = React.useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const handleAcceptFriendship = React.useCallback(
    (resource: FriendListItem) => {
      acceptFriendship({
        friendId: resource.user_id,
        status: FriendshipStatusNum.ACCEPTED,
      });
    },
    [],
  );

  const renderHistoryBookingItem: ListRenderItem<FriendListItem> =
    React.useCallback(
      ({item}) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(RootStackRoutes.PROFILE, {
              userId: item.friend_id,
            });
          }}>
          <View>
            <View
              style={{
                borderWidth: 1,
                alignItems: "center",
                flexDirection: "row",
                borderColor: "#F1F1F1",
                backgroundColor: "white",
                width: splitAppTheme.sizes.full,
                borderRadius: splitAppTheme.radii.xl,
                paddingVertical: splitAppTheme.space["3"],
                paddingHorizontal: splitAppTheme.space["4"],
              }}>
              <FastImage
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: splitAppTheme.radii.full,
                }}
                source={{
                  uri: item.friend_image,
                }}
              />

              <View
                style={{
                  flex: 1,
                  marginLeft: splitAppTheme.space[4],
                }}>
                <Text
                  style={{
                    color: "#262B2E",
                    fontSize: splitAppTheme.fontSizes.md,
                    fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                  }}>
                  {item.name}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: splitAppTheme.space[2],
                  }}>
                  {item.user_id === authData?.id ? (
                    <Text>Pending</Text>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        handleAcceptFriendship(item);
                      }}>
                      <View
                        style={{
                          padding: splitAppTheme.space[1.5],
                          borderWidth: splitAppTheme.borderWidths[1],
                          borderColor: splitAppTheme.colors.success[300],
                        }}>
                        <Text
                          style={{
                            textDecorationLine: "underline",
                            fontSize: splitAppTheme.fontSizes.xs,
                            color: splitAppTheme.colors.success[300],
                            fontFamily:
                              splitAppTheme.fontConfig.Sathoshi[500].normal,
                          }}>
                          Accept
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ),
      [handleAcceptFriendship, navigation, JSON.stringify(authData)],
    );

  const flatlistContentContainerStyle = React.useMemo(() => {
    return {
      padding: splitAppTheme.space[6],
    };
  }, [splitAppTheme.space[6]]);

  if (isLoadingInfiniteResources || isAuthDataLoading) {
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
    <View style={{width: WINDOW_WIDTH}}>
      {isFetchingNextPage ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : null}

      <FlatList
        onRefresh={refetch}
        listKey={"club-menus"}
        data={resourceListData}
        refreshing={isRefetching}
        keyExtractor={keyExtractor}
        onEndReached={handleFetchNextPage}
        showsVerticalScrollIndicator={false}
        renderItem={renderHistoryBookingItem}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={flatlistContentContainerStyle}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: splitAppTheme.space["4"],
            }}
          />
        )}
        ListEmptyComponent={<GenericListEmpty height={300} width={300} />}
      />
    </View>
  );
};

const FriendListScreen = ({navigation}: Props) => {
  const pagerRef = React.useRef<FlatList>(null!);
  const {
    window: {width: WINDOW_WIDTH},
  } = useDimensions();

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handlePager = (index: number) => {
    pagerRef?.current?.scrollToOffset({
      animated: true,
      offset: WINDOW_WIDTH * index,
    });
    setSelectedIndex(index);
  };

  const ListHeaderComponent = (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: splitAppTheme.space[6],
      }}>
      <View
        style={{
          flex: 1,
        }}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => handlePager(0)}>
          {selectedIndex === 0 ? (
            <LinearGradient
              end={{x: 1, y: 0}}
              start={{x: 0, y: 0}}
              style={styles.linearGradient}
              colors={["#00C1FF", "#402B8C"]}>
              <Text
                style={{
                  color: splitAppTheme.colors.white,
                  fontSize: splitAppTheme.fontSizes.md,
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                }}>
                My Friends
              </Text>
            </LinearGradient>
          ) : (
            <View
              style={[
                styles.linearGradient,
                {
                  borderColor: "rgba(0, 174, 230, 0.2)",
                  borderWidth: splitAppTheme.borderWidths[1],
                  backgroundColor: "rgba(0, 174, 230, 0.2)",
                },
              ]}>
              <Text
                style={{
                  fontSize: splitAppTheme.fontSizes.md,
                  color: splitAppTheme.colors.blue[300],
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                }}>
                My Friends
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          marginLeft: splitAppTheme.space[5],
        }}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => handlePager(1)}>
          {selectedIndex === 1 ? (
            <LinearGradient
              end={{x: 1, y: 0}}
              start={{x: 0, y: 0}}
              style={styles.linearGradient}
              colors={[splitAppTheme.colors.primary[400], "#402B8C"]}>
              <Text
                style={{
                  color: splitAppTheme.colors.white,
                  fontSize: splitAppTheme.fontSizes.md,
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                }}>
                Friend Requests
              </Text>
            </LinearGradient>
          ) : (
            <View
              style={[
                styles.linearGradient,
                {
                  borderColor: "rgba(229, 7, 167, 0.2)",
                  borderWidth: splitAppTheme.borderWidths[1],
                  backgroundColor: "rgba(229, 7, 167, 0.2)",
                },
              ]}>
              <Text
                style={{
                  fontSize: splitAppTheme.fontSizes.md,
                  color: splitAppTheme.colors.primary[400],
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                }}>
                Friend Requests
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={splitAppTheme.colors.white}
      />

      {selectedIndex === 0 ? (
        <AcceptedFriendsRoute ListHeaderComponent={ListHeaderComponent} />
      ) : (
        <PendingFriendsRoute ListHeaderComponent={ListHeaderComponent} />
      )}
    </View>
  );
};

function keyExtractor(item: {id: number}) {
  return item.id.toString();
}

export default FriendListScreen;

const styles = StyleSheet.create({
  buttonContainer: {},
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: splitAppTheme.radii.xl,
    paddingVertical: splitAppTheme.space[4],
  },
});
