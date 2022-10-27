import React from "react";
import styles from "./styles";
import {StatusBar} from "react-native";
import {useTime} from "react-timer-hook";
import {MapIcon} from "@constants/iconPath";
import {useTheme} from "styled-components";
import {ClubListTypes} from "@constants/club";
import NearbyClubsList from "./NearbyClubsList";
import useAuthContext from "@hooks/useAuthContext";
import {useDisclosure} from "react-use-disclosure";
import PopularClubsSwiper from "./PopularClubsSwiper";
import Feather from "react-native-vector-icons/Feather";
import LocationSwiper from "@components/LocationSwiper";
import RestaurantSearchBtn from "./RestaurantSearchBtn";
import LinearGradient from "react-native-linear-gradient";
import {StackScreenProps} from "@react-navigation/stack";
import {useDimensions} from "@react-native-community/hooks";
import {SafeAreaView} from "react-native-safe-area-context";
import RecentVisitClubsSwiper from "./RecentVisitClubsSwiper";
import {CompositeScreenProps} from "@react-navigation/native";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {ClubListItem, LocationItem, NearbyClubListItem} from "@src/models";
import {
  CustomerStackRoutes,
  CustomerMainBottomTabRoutes,
} from "@constants/routes";
import {
  RootStackParamList,
  CustomerStackParamList,
  CustomerBottomTabParamList,
} from "@src/navigation";
import {
  Box,
  Text,
  VStack,
  HStack,
  ScrollView,
  TouchableOpacity,
} from "@components/ui";

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
  const theme = useTheme();
  const {authData} = useAuthContext();
  const {hours} = useTime({format: "12-hour"});

  const {
    window: {height: windowHeight},
  } = useDimensions();

  const handlePopularClubItemPress = React.useCallback(
    (item: ClubListItem) => {
      navigation.navigate(CustomerStackRoutes.CLUB_DETAILS, {
        clubId: item.id,
      });
    },
    [navigation],
  );

  const handleRecentVisitClubPress = React.useCallback(
    (item: ClubListItem) => {
      navigation.navigate(CustomerStackRoutes.CLUB_DETAILS, {
        clubId: item.id,
      });
    },
    [navigation],
  );

  const handleNearbyClubPress = React.useCallback(
    (item: NearbyClubListItem) => {
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
    <Box>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent={false}
          barStyle={"light-content"}
          backgroundColor={theme.colors.secondary[600]}
        />

        <Box>
          <LinearGradient
            end={{x: 0, y: 0}}
            start={{x: 0, y: 1}}
            // @ts-ignore
            height={windowHeight * 0.25}
            colors={["#DF3BC0", "#472BBE"]}>
            <SafeAreaView>
              <Box py={2} height={"full"} justifyContent={"flex-end"}>
                <Box px={6} width={"full"} mb={1}>
                  <VStack width={"full"}>
                    <HStack
                      alignItems={"center"}
                      justifyContent={"space-between"}>
                      <VStack>
                        <Text
                          fontSize={"xl"}
                          color={"#FFFFFF"}
                          fontFamily={"SatoshiVariable-Bold"}>
                          Good{" "}
                          {hours < 12
                            ? "Morning"
                            : hours < 18
                            ? "Afternoon"
                            : "Evening"}
                          !
                        </Text>

                        <Text
                          mt={"0.5"}
                          fontSize={"md"}
                          color={"white"}
                          fontFamily={"SatoshiVariable-Bold"}>
                          {authData?.name}
                        </Text>
                      </VStack>

                      <VStack>
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
                          p={1}
                          borderRadius={"full"}
                          bg={"rgba(255,255,255,0.2)"}
                          onPress={handleGotoNotifications}>
                          <MaterialIcons
                            size={30}
                            color={"white"}
                            name={"notifications-none"}
                          />
                        </TouchableOpacity>
                      </VStack>
                    </HStack>

                    <Box my={"0.5"}>
                      <TouchableOpacity
                        style={styles.searchButton}
                        onPress={() => {
                          navigation.navigate(CustomerStackRoutes.CLUB_SEARCH);
                        }}>
                        <Feather name="search" color={"#3B3B3B"} size={15} />
                        <Text marginLeft={2} fontSize={"sm"} color={"#3B3B3B"}>
                          Find your restaurant
                        </Text>
                      </TouchableOpacity>
                    </Box>

                    <HStack alignItems={"center"}>
                      <MapIcon height={16} width={16} color={"white"} />
                      <Text
                        fontSize={"sm"}
                        color={"white"}
                        marginLeft={"2"}
                        fontFamily={"Satoshi-Regular"}>
                        {authData?.location}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              </Box>
            </SafeAreaView>
          </LinearGradient>
        </Box>

        <Box py={2}>
          <LocationSwiper onItemPress={handleLocationItemPress} />
        </Box>

        <Box width={"full"}>
          <Box px={6} width={"full"} mb={1}>
            <HStack
              my={2}
              width={"full"}
              alignItems={"center"}
              justifyContent={"space-between"}>
              <Text
                fontSize={"xl"}
                color={"#030819"}
                fontFamily={"SatoshiVariable-Bold"}>
                Popular Clubs/Bars
              </Text>
              <TouchableOpacity onPress={handlePopularClubSeeAll}>
                <Text
                  fontSize={"sm"}
                  color={"#262B2E"}
                  fontFamily={"Roboto-Regular"}>
                  See all
                </Text>
              </TouchableOpacity>
            </HStack>
          </Box>
        </Box>

        <PopularClubsSwiper onItemPress={handlePopularClubItemPress} />

        <Box width={"full"}>
          <Box px={6} width={"full"}>
            <HStack
              mb={1}
              width={"full"}
              alignItems={"center"}
              justifyContent={"space-between"}>
              <Text
                fontSize={"xl"}
                color={"#030819"}
                fontFamily={"SatoshiVariable-Bold"}>
                Near by You
              </Text>

              <TouchableOpacity onPress={handleNearbyClubSeeAll}>
                <Text
                  fontSize={"sm"}
                  color={"#262B2E"}
                  fontFamily={"Roboto-Regular"}>
                  See all
                </Text>
              </TouchableOpacity>
            </HStack>

            <NearbyClubsList onItemPress={handleNearbyClubPress} />
          </Box>
        </Box>

        <RecentVisitClubsSwiper
          onSeeAll={handleRecentVisitClubSeeAll}
          onItemPress={handleRecentVisitClubPress}
        />

        <Box height={"4"} />
      </ScrollView>
    </Box>
  );
};

export default HomeScreen;
