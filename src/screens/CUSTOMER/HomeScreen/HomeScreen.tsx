import React from "react";
import styles from "./styles";
import {MapIcon} from "@constants/iconPath";
import {TouchableOpacity} from "react-native";
import {ClubListTypes} from "@constants/club";
import NearbyClubsList from "./NearbyClubsList";
import PopularClubsSwiper from "./PopularClubsSwiper";
import LocationSwiper from "@components/LocationSwiper";
import Feather from "react-native-vector-icons/Feather";
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
  StatusBar,
  ScrollView,
  IconButton,
  useTheme,
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
  const {
    window: {height},
  } = useDimensions();

  const theme = useTheme();

  const linearGradientStyle = React.useMemo(() => {
    return {height: height * 0.4};
  }, [height]);

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
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar
        backgroundColor={theme.colors.secondary[600]}
        barStyle={"light-content"}
      />
      <LinearGradient
        end={{x: 0, y: 0}}
        start={{x: 0, y: 1}}
        style={linearGradientStyle}
        colors={["#DF3BC0", "#472BBE"]}>
        <Center py={5} h={"full"} justifyContent={"flex-end"}>
          <Box px={9} w={"full"} mb={5}>
            <VStack space={3} w={"full"}>
              <HStack justifyContent={"space-between"} alignItems={"center"}>
                <VStack space={2}>
                  <Text
                    fontSize={"xl"}
                    color={"#FFFFFF"}
                    fontWeight={"bold"}
                    fontFamily={"satoshi"}>
                    Good Evening!
                  </Text>

                  <Text
                    fontSize={"md"}
                    color={"white"}
                    fontWeight={"bold"}
                    fontFamily={"satoshi"}>
                    Alexa Smith
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

              <TouchableOpacity style={styles.searchButton}>
                <Feather name="search" color={"#3B3B3B"} size={15} />
                <Text marginLeft={2} fontSize={"sm"} color={"#3B3B3B"}>
                  Find your restaurant
                </Text>
              </TouchableOpacity>

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
        <Box px={9} w={"full"} mb={5}>
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
        <Box px={9} w={"full"}>
          <HStack
            mb={5}
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

      <Center w={"full"}>
        <Box px={9} w={"full"} my={5}>
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
              Your Recent Visits
            </Text>
            <Button
              p={0}
              fontSize={"sm"}
              variant={"unstyled"}
              fontFamily={"satoshi"}
              colorScheme={"transparent"}
              onPress={handleRecentVisitClubSeeAll}
              _text={{
                color: "#262B2E",
              }}>
              See all
            </Button>
          </HStack>
        </Box>
      </Center>

      <RecentVisitClubsSwiper onItemPress={handleRecentVisitClubPress} />
    </ScrollView>
  );
};

export default HomeScreen;
