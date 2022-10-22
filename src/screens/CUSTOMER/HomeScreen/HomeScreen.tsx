import React from "react";
import {StatusBar} from "react-native";
import {useTime} from "react-timer-hook";
import {MapIcon} from "@constants/iconPath";
import {ClubListTypes} from "@constants/club";
import NearbyClubsList from "./NearbyClubsList";
import useAuthContext from "@hooks/useAuthContext";
import PopularClubsSwiper from "./PopularClubsSwiper";
import LocationSwiper from "@components/LocationSwiper";
import RestaurantSearchBtn from "./RestaurantSearchBtn";
import LinearGradient from "react-native-linear-gradient";
import {StackScreenProps} from "@react-navigation/stack";
import {useDimensions} from "@react-native-community/hooks";
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
  Badge,
  Icon,
  Text,
  VStack,
  Button,
  Center,
  HStack,
  useTheme,
  ScrollView,
  IconButton,
  useDisclose,
} from "native-base";

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
  const {authData} = useAuthContext();
  const {hours} = useTime({format: "12-hour"});

  const {
    window: {height: windowHeight},
  } = useDimensions();

  const {isOpen: isSearchModalOpen, onToggle: toggleSearchModal} =
    useDisclose();

  const theme = useTheme();

  const linearGradientStyle = React.useMemo(() => {
    return {height: windowHeight * 0.25};
  }, [windowHeight]);

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

  React.useEffect(() => {
    StatusBar.setBarStyle("light-content");
    StatusBar.setBackgroundColor(theme.colors.secondary[600]);
  }, [theme.colors.primary[600]]);

  React.useEffect(() => {
    if (isSearchModalOpen) {
      StatusBar.setBarStyle("dark-content", true);
      StatusBar.setBackgroundColor("white");
    } else {
      StatusBar.setBarStyle("light-content", true);
      StatusBar.setBackgroundColor(theme.colors.secondary[600]);
    }
  }, [isSearchModalOpen, theme.colors.primary[600]]);

  return (
    <Box safeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <StatusBar
          barStyle={isSearchModalOpen ? "dark-content" : "light-content"}
          backgroundColor={
            isSearchModalOpen ? "white" : theme.colors.secondary[600]
          }
        /> */}

        <LinearGradient
          end={{x: 0, y: 0}}
          start={{x: 0, y: 1}}
          style={linearGradientStyle}
          colors={["#DF3BC0", "#472BBE"]}>
          <Center py={2} h={"full"} justifyContent={"flex-end"}>
            <Box px={6} w={"full"} mb={1}>
              <VStack space={"0.5"} w={"full"}>
                <HStack justifyContent={"space-between"} alignItems={"center"}>
                  <VStack space={"0.5"}>
                    <Text
                      fontSize={"xl"}
                      color={"#FFFFFF"}
                      fontWeight={"bold"}
                      fontFamily={"satoshi"}>
                      Good{" "}
                      {hours < 12
                        ? "Morning"
                        : hours < 18
                        ? "Afternoon"
                        : "Evening"}
                      !
                    </Text>

                    <Text
                      fontSize={"md"}
                      color={"white"}
                      fontWeight={"bold"}
                      fontFamily={"satoshi"}>
                      {authData?.name}
                    </Text>
                  </VStack>

                  <VStack>
                    <Badge
                      mb={-4}
                      mr={-2}
                      zIndex={1}
                      rounded={"full"}
                      variant={"solid"}
                      alignSelf={"flex-end"}
                      colorScheme={"secondary"}
                      _text={{
                        fontSize: "sm",
                      }}>
                      2
                    </Badge>

                    <IconButton
                      size={"xs"}
                      color={"white"}
                      rounded={"full"}
                      variant={"subtle"}
                      colorScheme={"white:alpha.20"}
                      onPress={handleGotoNotifications}
                      _pressed={{
                        bg: "transparent",
                      }}
                      icon={
                        <Icon
                          size={7}
                          color={"white"}
                          as={MaterialIcons}
                          name={"notifications-none"}
                        />
                      }
                    />
                  </VStack>
                </HStack>

                <RestaurantSearchBtn
                  isSearchModalOpen={isSearchModalOpen}
                  toggleSearchModal={toggleSearchModal}
                />

                <HStack alignItems={"center"}>
                  <MapIcon height={16} width={16} color={"white"} />
                  <Text
                    fontSize={"sm"}
                    color={"white"}
                    marginLeft={"2"}
                    fontFamily={"satoshi"}>
                    Nevada, Las Vegas
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </Center>
        </LinearGradient>

        <Box py={2}>
          <LocationSwiper onItemPress={handleLocationItemPress} />
        </Box>

        <Center w={"full"}>
          <Box px={6} w={"full"} mb={1}>
            <HStack
              my={2}
              w={"full"}
              alignItems={"center"}
              justifyContent={"space-between"}>
              <Text
                fontSize={"xl"}
                color={"#030819"}
                fontWeight={"bold"}
                fontFamily={"satoshi"}>
                Popular Clubs/Bars
              </Text>
              <Button
                fontSize={14}
                variant={"unstyled"}
                fontFamily={"satoshi"}
                colorScheme={"transparent"}
                onPress={handlePopularClubSeeAll}
                _text={{
                  color: "#262B2E",
                }}>
                See all
              </Button>
            </HStack>
          </Box>
        </Center>

        <PopularClubsSwiper onItemPress={handlePopularClubItemPress} />

        <Center w={"full"}>
          <Box px={6} w={"full"}>
            <HStack
              mb={1}
              w={"full"}
              alignItems={"center"}
              justifyContent={"space-between"}>
              <Text
                fontSize={"xl"}
                color={"#030819"}
                fontWeight={"bold"}
                fontFamily={"satoshi"}>
                Near by You
              </Text>
              <Button
                p={0}
                fontSize={"sm"}
                variant={"unstyled"}
                fontFamily={"satoshi"}
                colorScheme={"transparent"}
                onPress={handleNearbyClubSeeAll}
                _text={{
                  color: "#262B2E",
                }}>
                See all
              </Button>
            </HStack>

            <NearbyClubsList onItemPress={handleNearbyClubPress} />
          </Box>
        </Center>

        <RecentVisitClubsSwiper
          onSeeAll={handleRecentVisitClubSeeAll}
          onItemPress={handleRecentVisitClubPress}
        />

        <Box h={"4"} />
      </ScrollView>
    </Box>
  );
};

export default HomeScreen;
