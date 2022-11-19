import React from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import SplitTables from "./SplitTables";
import {splitAppTheme} from "@src/theme";
import {useTime} from "react-timer-hook";
import {MapIcon} from "@constants/iconPath";
import {AppTableListTypes} from "@constants/table";
import {QueryKeys} from "@constants/query-keys";
import BookedTablesSwiper from "./BookedTablesSwiper";
import Feather from "react-native-vector-icons/Feather";
import LocationSwiper from "@components/LocationSwiper";
import LinearGradient from "react-native-linear-gradient";
import {StackScreenProps} from "@react-navigation/stack";
import RecentVisitsSwiper from "./RecentVisitClubsSwiper";
import {useDimensions} from "@react-native-community/hooks";
import {SafeAreaView} from "react-native-safe-area-context";
import useGetAuthDataQuery from "@hooks/useGetAuthDataQuery";
import {CompositeScreenProps} from "@react-navigation/native";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {BookedTable, LocationItem, SplitTable} from "@src/models";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {useIsFetching, useQueryClient} from "@tanstack/react-query";
import {
  RootStackRoutes,
  CustomerStackRoutes,
  CustomerMainBottomTabRoutes,
} from "@constants/routes";
import {
  RootStackParamList,
  CustomerStackParamList,
  CustomerBottomTabParamList,
} from "@src/navigation";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";

type Props = CompositeScreenProps<
  CompositeScreenProps<
    BottomTabScreenProps<
      CustomerBottomTabParamList,
      typeof CustomerMainBottomTabRoutes.HOME
    >,
    StackScreenProps<CustomerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

const HomeScreen = ({navigation}: Props) => {
  const {data: authData} = useGetAuthDataQuery();
  const {hours} = useTime({format: "12-hour"});
  const queryClient = useQueryClient();
  const isFetchingTables = useIsFetching({
    queryKey: [QueryKeys.TABLE],
  });

  const {
    window: {height: WINDOW_HEIGHT},
  } = useDimensions();

  const handleBookedTableItemPress = React.useCallback(
    (item: BookedTable) => {
      navigation.navigate(CustomerStackRoutes.TABLE_DETAILS, {
        tableId: item.id,
      });
    },
    [navigation],
  );

  const handleRecentVisitItemPress = React.useCallback(
    (item: BookedTable) => {
      navigation.navigate(CustomerStackRoutes.TABLE_DETAILS, {
        tableId: item.id,
      });
    },
    [navigation],
  );

  const handleSpiltTablePress = React.useCallback(
    (item: SplitTable) => {
      navigation.navigate(CustomerStackRoutes.TABLE_DETAILS, {
        tableId: item.id,
      });
    },
    [navigation],
  );

  const handleLocationItemPress = React.useCallback(
    (item: LocationItem) => {
      navigation.navigate(CustomerStackRoutes.TABLE_LIST, {
        headerTitle: item.location,
        listType: AppTableListTypes.BY_LOCATION,
        searchTerm: {
          locationId: item.id,
        },
      });
    },
    [navigation],
  );

  const handleBookedTableSeeAll = React.useCallback(() => {
    navigation.navigate(CustomerStackRoutes.TABLE_LIST, {
      headerTitle: "Book Table",
      listType: AppTableListTypes.BOOKED,
    });
  }, [navigation]);

  const handleRecentVisitSeeAll = React.useCallback(() => {
    navigation.navigate(CustomerStackRoutes.TABLE_LIST, {
      headerTitle: "Your Recent Visits",
      listType: AppTableListTypes.RECENT_VISIT,
    });
  }, [navigation]);

  const handleSplitTableSeeAll = React.useCallback(() => {
    navigation.navigate(CustomerStackRoutes.TABLE_LIST, {
      headerTitle: "Split Table",
      listType: AppTableListTypes.SPLIT,
    });
  }, [navigation]);

  const handleGotoNotifications = () => {
    navigation.navigate(RootStackRoutes.NOTIFICATIONS);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isFetchingTables == 1}
          onRefresh={() => {
            queryClient.invalidateQueries([QueryKeys.TABLE]);
          }}
        />
      }>
      <FocusAwareStatusBar
        translucent={false}
        barStyle={"light-content"}
        backgroundColor={splitAppTheme.colors.secondary[600]}
      />

      <View>
        <LinearGradient
          end={{x: 0, y: 0}}
          start={{x: 0, y: 1}}
          style={{height: WINDOW_HEIGHT * 0.25}}
          colors={["#DF3BC0", "#472BBE"]}>
          <SafeAreaView>
            <View
              style={{
                paddingVertical: splitAppTheme.space[2],
                height: splitAppTheme.sizes.full,
                justifyContent: "flex-end",
              }}>
              <View
                style={{
                  width: splitAppTheme.sizes.full,
                  marginBottom: splitAppTheme.space[1],
                  paddingHorizontal: splitAppTheme.space[6],
                }}>
                <View
                  style={{
                    width: splitAppTheme.sizes.full,
                  }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <View>
                      <Text
                        style={{
                          color: splitAppTheme.colors.white,
                          fontSize: splitAppTheme.fontSizes.xl,
                          fontFamily:
                            splitAppTheme.fontConfig.Sathoshi[700].normal,
                        }}>
                        Good{" "}
                        {hours < 12
                          ? "Morning"
                          : hours < 18
                          ? "Afternoon"
                          : "Evening"}
                        !
                      </Text>

                      <Text
                        style={{
                          color: splitAppTheme.colors.white,
                          fontSize: splitAppTheme.fontSizes.md,
                          marginTop: splitAppTheme.space["0.5"],
                          fontFamily:
                            splitAppTheme.fontConfig.Sathoshi[700].normal,
                        }}>
                        {authData?.name}
                      </Text>
                    </View>

                    <View>
                      <TouchableOpacity
                        style={{
                          padding: splitAppTheme.space[1],
                          borderRadius: splitAppTheme.radii.full,
                          backgroundColor: "rgba(255,255,255,0.2)",
                        }}
                        onPress={handleGotoNotifications}>
                        <MaterialIcons
                          size={30}
                          color={"white"}
                          name={"notifications-none"}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      marginVertical: splitAppTheme.space["0.5"],
                    }}>
                    <TouchableOpacity
                      style={{
                        height: 50,
                        width: "100%",
                        borderRadius: 8,
                        paddingLeft: 15,
                        marginVertical: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: splitAppTheme.colors.white,
                      }}
                      onPress={() => {
                        navigation.navigate(CustomerStackRoutes.TABLE_SEARCH);
                      }}>
                      <Feather name="search" color={"#3B3B3B"} size={15} />
                      <Text
                        style={{
                          color: "#3B3B3B",
                          marginLeft: splitAppTheme.space[2],
                          fontSize: splitAppTheme.fontSizes.sm,
                        }}>
                        Find your restaurant
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}>
                    <MapIcon height={16} width={16} color={"white"} />
                    <Text
                      style={{
                        color: splitAppTheme.colors.white,
                        fontSize: splitAppTheme.fontSizes.sm,
                        marginLeft: splitAppTheme.space[2],
                        fontFamily:
                          splitAppTheme.fontConfig.Sathoshi[400].normal,
                      }}>
                      {authData?.location}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>

      <View
        style={{
          paddingVertical: splitAppTheme.space[2],
        }}>
        <LocationSwiper onItemPress={handleLocationItemPress} />
      </View>

      <View
        style={{
          width: splitAppTheme.sizes.full,
        }}>
        <View
          style={{
            width: splitAppTheme.sizes.full,
            marginBottom: splitAppTheme.space[1],
            paddingHorizontal: splitAppTheme.space[6],
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: splitAppTheme.sizes.full,
              marginVertical: splitAppTheme.space[2],
            }}>
            <Text
              style={{
                fontSize: splitAppTheme.fontSizes.xl,
                color: "#030819",
                fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
              }}>
              Table & Events
            </Text>
            <TouchableOpacity onPress={handleBookedTableSeeAll}>
              <Text
                style={{
                  fontSize: splitAppTheme.fontSizes.sm,
                  color: "#030819",
                  fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
                }}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <BookedTablesSwiper onItemPress={handleBookedTableItemPress} />

      <View
        style={{
          width: splitAppTheme.sizes.full,
        }}>
        <View
          style={{
            width: splitAppTheme.sizes.full,
            paddingHorizontal: splitAppTheme.space[6],
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: splitAppTheme.sizes.full,
              justifyContent: "space-between",
              marginBottom: splitAppTheme.space[1],
            }}>
            <Text
              style={{
                fontSize: splitAppTheme.fontSizes.xl,
                color: "#030819",
                fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
              }}>
              Split Table & Events
            </Text>

            <TouchableOpacity onPress={handleSplitTableSeeAll}>
              <Text
                style={{
                  fontSize: splitAppTheme.fontSizes.sm,
                  color: "#030819",
                  fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
                }}>
                See all
              </Text>
            </TouchableOpacity>
          </View>

          <SplitTables onItemPress={handleSpiltTablePress} />
        </View>
      </View>

      <RecentVisitsSwiper
        onSeeAll={handleRecentVisitSeeAll}
        onItemPress={handleRecentVisitItemPress}
      />

      <View
        style={{
          height: splitAppTheme.sizes[4],
        }}
      />
    </ScrollView>
  );
};

export default HomeScreen;
