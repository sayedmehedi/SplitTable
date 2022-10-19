import React from "react";
import styles from "./styles";
import {ClubListItem, LocationItem} from "@src/models";
import {productData} from "@constants/dummy";
import EachNearByItem from "./EachNearByItem";
import {TouchableOpacity} from "react-native";
import EachPopularClubItem from "@components/EachPopularClubItem";
import LocationSwiper from "@components/LocationSwiper";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import {StackScreenProps} from "@react-navigation/stack";
import EachRecentVisitsItem from "./EachRecentVisitsItem";
import {useDimensions} from "@react-native-community/hooks";
import {
  CustomerStackRoutes,
  CustomerMainBottomTabRoutes,
} from "@constants/routes";
import {MapIcon} from "@constants/iconPath";
import {CompositeScreenProps} from "@react-navigation/native";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
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
  ScrollView,
  IconButton,
} from "native-base";
import PopularClubsSwiper from "./PopularClubsSwiper";

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

  const linearGradientStyle = React.useMemo(() => {
    return {height: height * 0.4};
  }, [height]);

  const handleLocationPress = React.useCallback(
    (item: LocationItem) =>
      navigation.navigate(CustomerStackRoutes.CLUB_LIST, {
        headerTitle: item.location,
      }),
    [navigation],
  );

  const handlePopularClubItemPress = React.useCallback(
    (item: ClubListItem) => {},
    [navigation],
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
        <LocationSwiper onItemPress={handleLocationPress} />
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
              _text={{
                color: "#262B2E",
              }}>
              See all
            </Button>
          </HStack>

          <Box>
            {productData.map(item => {
              return <EachNearByItem key={item.id} item={item} />;
            })}
          </Box>
        </Box>
      </Center>

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
              Your Recent Visits
            </Text>
            <Button
              p={0}
              fontSize={"sm"}
              variant={"unstyled"}
              fontFamily={"satoshi"}
              colorScheme={"transparent"}
              _text={{
                color: "#262B2E",
              }}>
              See all
            </Button>
          </HStack>
        </Box>
      </Center>

      <ScrollView
        mb={5}
        horizontal
        _contentContainerStyle={{
          px: 9,
        }}
        showsHorizontalScrollIndicator={false}>
        {productData.map((item, index) => {
          return (
            <Box
              w={"56"}
              key={item.id}
              mr={index === productData.length - 1 ? 0 : 5}>
              <EachRecentVisitsItem item={item} />
            </Box>
          );
        })}
      </ScrollView>
    </ScrollView>
  );
};

export default HomeScreen;
