import React from "react";
import styles from "./styles";
import {splitAppTheme} from "@src/theme";
import {ClubBooking} from "@src/models";
import EachBookingItem from "./EachBookingItem";
import LinearGradient from "react-native-linear-gradient";
import {useDimensions} from "@react-native-community/hooks";
import GenericListEmpty from "@components/GenericListEmpty";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useInfiniteGetBookingHistoryQuery from "@hooks/clubs/useInfiniteGetBookingHistoryQuery";
import useInfiniteGetUpcomingBookingQuery from "@hooks/clubs/useInfiniteGetUpcomingBookingQuery";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ActivityIndicator,
  ListRenderItem,
  StatusBar,
} from "react-native";

const keyExtractor = (item: {id: number}) => `booking-${item.id.toString()}`;

const renderUpcomingBookingItem: ListRenderItem<ClubBooking> = ({item}) => (
  <EachBookingItem type={"upcoming"} item={item} />
);

const renderHistoryBookingItem: ListRenderItem<ClubBooking> = ({item}) => (
  <EachBookingItem type={"history"} item={item} />
);

const UpcomingBookingRoute = (props: {}) => {
  const {
    window: {width: WINDOW_WIDTH},
  } = useDimensions();

  const {
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    error: infiniteGetResourcesError,
    data: infiniteGetResourcesResponse,
    isLoading: isLoadingInfiniteResources,
  } = useInfiniteGetUpcomingBookingQuery(
    {
      page: 1,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.bookings.has_more_data) {
          return {
            page: lastPage.bookings.current_page + 1,
          };
        }
      },
    },
  );
  useHandleNonFieldError(infiniteGetResourcesError);

  const resourceListData = React.useMemo(() => {
    return (
      infiniteGetResourcesResponse?.pages.flatMap(eachPage => {
        return eachPage.bookings.data;
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

const HistoryBookingRoute = (props: {}) => {
  const {
    window: {width: WINDOW_WIDTH},
  } = useDimensions();

  const {
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    error: infiniteGetResourcesError,
    data: infiniteGetResourcesResponse,
    isLoading: isLoadingInfiniteResources,
  } = useInfiniteGetBookingHistoryQuery(
    {
      page: 1,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.bookings.has_more_data) {
          return {
            page: lastPage.bookings.current_page + 1,
          };
        }
      },
    },
  );
  useHandleNonFieldError(infiniteGetResourcesError);

  const resourceListData = React.useMemo(() => {
    return (
      infiniteGetResourcesResponse?.pages.flatMap(eachPage => {
        return eachPage.bookings.data;
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
        renderItem={renderHistoryBookingItem}
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

const BookingListScreen = () => {
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

  const setIndex = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const viewSize = event.nativeEvent.layoutMeasurement.width;
      const contentOffset = event.nativeEvent.contentOffset.x;
      const carouselIndex = Math.floor(contentOffset / viewSize);
      setSelectedIndex(carouselIndex);
    },
    [],
  );

  const ListHeaderComponent = (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: splitAppTheme.space[6],
        paddingHorizontal: splitAppTheme.space[6],
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
                Upcomming
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
                Upcomming
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
                History
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
                History
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={splitAppTheme.colors.white}
      />

      {ListHeaderComponent}
      <FlatList
        horizontal
        pagingEnabled
        ref={pagerRef}
        listKey={"pager"}
        onMomentumScrollEnd={setIndex}
        showsHorizontalScrollIndicator={false}
        data={[{key: "upcoming"}, {key: "history"}]}
        renderItem={({item}) => {
          switch (item.key) {
            case "upcoming":
              return <UpcomingBookingRoute />;

            default:
              return <HistoryBookingRoute />;
          }
        }}
      />
    </View>
  );
};

export default BookingListScreen;
