import React from "react";
import styles from "./styles";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {splitAppTheme} from "@src/theme";
import {useTime} from "react-timer-hook";
import {MapIcon} from "@constants/iconPath";
import {ClubListTypes} from "@constants/club";
import SplitTableNEvents from "./SplitTableNEvents";
import {useDisclosure} from "react-use-disclosure";
import TableNEventsSwiper from "./TableNEventsSwiper";
import Feather from "react-native-vector-icons/Feather";
import LocationSwiper from "@components/LocationSwiper";
import RestaurantSearchBtn from "./RestaurantSearchBtn";
import LinearGradient from "react-native-linear-gradient";
import {StackScreenProps} from "@react-navigation/stack";
import {useDimensions} from "@react-native-community/hooks";
import {SafeAreaView} from "react-native-safe-area-context";
import useGetAuthDataQuery from "@hooks/useGetAuthDataQuery";
import RecentVisitClubsSwiper from "./RecentVisitClubsSwiper";
import {CompositeScreenProps} from "@react-navigation/native";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {TableNEvent, LocationItem, SplitTableNEvent} from "@src/models";
import {
  CustomerStackRoutes,
  CustomerMainBottomTabRoutes,
} from "@constants/routes";
import {
  RootStackParamList,
  CustomerStackParamList,
  CustomerBottomTabParamList,
} from "@src/navigation";

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

  const {
    window: {height: windowHeight},
  } = useDimensions();

  const handlePopularClubItemPress = React.useCallback(
    (item: TableNEvent) => {
      navigation.navigate(CustomerStackRoutes.CLUB_DETAILS, {
        clubId: item.id,
      });
    },
    [navigation],
  );

  const handleRecentVisitClubPress = React.useCallback(
    (item: TableNEvent) => {
      navigation.navigate(CustomerStackRoutes.CLUB_DETAILS, {
        clubId: item.id,
      });
    },
    [navigation],
  );

  const handleNearbyClubPress = React.useCallback(
    (item: SplitTableNEvent) => {
      navigation.navigate(CustomerStackRoutes.CLUB_DETAILS, {
        clubId: item.id,
      });
    },
    [navigation],
  );

  const handleLocationItemPress = React.useCallback(
    (item: LocationItem) => {
      navigation.navigate(CustomerStackRoutes.CLUB_LIST, {
        locationId: item.id,
        headerTitle: item.location,
        listType: ClubListTypes.BY_LOCATION,
      });
    },
    [navigation],
  );

  const handlePopularClubSeeAll = React.useCallback(() => {
    navigation.navigate(CustomerStackRoutes.CLUB_LIST, {
      headerTitle: "Popular Clubs/Bars",
      listType: ClubListTypes.POPULAR,
    });
  }, [navigation]);

  const handleRecentVisitClubSeeAll = React.useCallback(() => {
    navigation.navigate(CustomerStackRoutes.CLUB_LIST, {
      headerTitle: "Your Recent Visits",
      listType: ClubListTypes.RECENT_VISIT,
    });
  }, [navigation]);

  const handleNearbyClubSeeAll = React.useCallback(() => {
    navigation.navigate(CustomerStackRoutes.CLUB_LIST, {
      headerTitle: "Near by You",
      listType: ClubListTypes.NEAR,
    });
  }, [navigation]);

  const handleGotoNotifications = () => {
    navigation.navigate(CustomerStackRoutes.NOTIFICATIONS);
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent={false}
          barStyle={"light-content"}
          backgroundColor={splitAppTheme.colors.secondary[600]}
        />

        <View>
          <LinearGradient
            end={{x: 0, y: 0}}
            start={{x: 0, y: 1}}
            // @ts-ignore
            height={windowHeight * 0.25}
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
                        {/* <Badge
                          mb={-4}
                          mr={-2}
                          zIndex={1}
                          borderRadius={"full"}
                          variant={"solid"}
                          alignSelf={"flex-end"}
                          colorScheme={"secondary"}
                          _text={{
                            fontSize: "sm",
                          }}>
                          2
                        </Badge> */}

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
                        style={styles.searchButton}
                        onPress={() => {
                          navigation.navigate(CustomerStackRoutes.CLUB_SEARCH);
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
              <TouchableOpacity onPress={handlePopularClubSeeAll}>
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

        <TableNEventsSwiper onItemPress={handlePopularClubItemPress} />

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

              <TouchableOpacity onPress={handleNearbyClubSeeAll}>
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

            <SplitTableNEvents onItemPress={handleNearbyClubPress} />
          </View>
        </View>

        {/* <RecentVisitClubsSwiper
          onSeeAll={handleRecentVisitClubSeeAll}
          onItemPress={handleRecentVisitClubPress}
        /> */}

        <View
          style={{
            height: splitAppTheme.sizes[4],
          }}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
