import React from "react";
import truncate from "lodash.truncate";
import {ClubMenuItem} from "@src/models";
import {Clock, MapIcon} from "@constants/iconPath";
import EachOfferMenuItem from "./EachOfferMenuItem";
import {CustomerStackRoutes} from "@constants/routes";
import GenericListEmpty from "@components/GenericListEmpty";
import Fontisto from "react-native-vector-icons/Fontisto";
import {StackScreenProps} from "@react-navigation/stack";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import {useDimensions} from "@react-native-community/hooks";
import {SafeAreaView} from "react-native-safe-area-context";
import {TouchableOpacity} from "react-native-gesture-handler";
import {CompositeScreenProps} from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useGetClubDetailsQuery from "@hooks/clubs/useGetClubDetailsQuery";
import {
  Dimensions,
  StyleSheet,
  ListRenderItem,
  ImageBackground,
} from "react-native";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import useInfiniteGetClubMenusQuery from "@hooks/menu/useInfiniteGetClubMenusQuery";
import {
  Box,
  Text,
  View,
  Icon,
  HStack,
  Divider,
  VStack,
  FlatList,
  StatusBar,
  IconButton,
  Button,
  Center,
  Spinner,
  ScrollView,
} from "native-base";

const windowDimension = Dimensions.get("window");

const CARD_HEIGHT = 180;
const CARD_NEGATIVE_MARGIN = -1 * (CARD_HEIGHT / 2);

const renderOfferMenu: ListRenderItem<ClubMenuItem> = ({item}) => (
  <Box mb={"4"}>
    <EachOfferMenuItem item={item} />
  </Box>
);

type Props = CompositeScreenProps<
  StackScreenProps<
    CustomerStackParamList,
    typeof CustomerStackRoutes.CLUB_DETAILS
  >,
  StackScreenProps<RootStackParamList>
>;

const ClubDetailsScreen = ({navigation, route}: Props) => {
  const {
    screen: {width: SCREEN_WIDTH},
  } = useDimensions();

  const linearGradientButtonStyles = React.useMemo(() => {
    return [styles.linearGradientButtons, {width: SCREEN_WIDTH * 0.27}];
  }, [SCREEN_WIDTH]);

  const {
    error: clubDetailsError,
    data: clubDetailsResponse,
    isLoading: isClubDetailsLoading,
  } = useGetClubDetailsQuery(route.params.clubId);
  useHandleNonFieldError(clubDetailsError);

  const {
    data: infiniteGetResourcesResponse,
    isLoading: isLoadingInfiniteResources,
    error: infiniteGetResourcesError,
  } = useInfiniteGetClubMenusQuery({
    clubId: route.params.clubId,
    page: 1,
  });

  useHandleNonFieldError(infiniteGetResourcesError);

  if (isClubDetailsLoading) {
    return (
      <HStack safeArea h={"full"} w={"full"}>
        <Center w={"full"} h={"full"}>
          <Spinner size={"lg"} />
        </Center>
      </HStack>
    );
  }

  if (!clubDetailsResponse) {
    return (
      <HStack safeArea h={"full"} w={"full"}>
        <Center w={"full"} h={"full"}>
          <GenericListEmpty />
        </Center>
      </HStack>
    );
  }

  return (
    <Box>
      <StatusBar translucent backgroundColor={"transparent"} />

      <FlatList
        data={[]}
        renderItem={renderOfferMenu}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponentStyle={{
          paddingBottom: 24,
          marginHorizontal: -24,
        }}
        _contentContainerStyle={{
          px: 6,
        }}
        ListHeaderComponent={
          <View flex={1}>
            <Box position={"relative"}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}>
                {clubDetailsResponse.club.images.map((img, i) => (
                  <ImageBackground
                    key={i}
                    source={{uri: img}}
                    style={styles.ImageBackground}
                  />
                ))}
              </ScrollView>

              <Box position={"absolute"} w={"full"}>
                <SafeAreaView>
                  <HStack p={"6"} justifyContent={"space-between"}>
                    <IconButton
                      rounded={"full"}
                      variant={"ghost"}
                      _icon={{
                        color: "white",
                      }}
                      icon={<Icon as={FontAwesome5} name={"chevron-left"} />}
                    />

                    <HStack space={4}>
                      <IconButton
                        rounded={"full"}
                        variant={"ghost"}
                        _icon={{
                          color: "white",
                        }}
                        icon={<Icon as={AntDesign} name={"sharealt"} />}
                      />

                      <IconButton
                        size={"md"}
                        rounded={"full"}
                        variant={"subtle"}
                        _icon={{
                          color: "white",
                        }}
                        icon={<Icon as={AntDesign} name={"heart"} />}
                      />
                    </HStack>
                  </HStack>
                </SafeAreaView>
              </Box>
            </Box>

            <VStack px={"6"} flex={1} bg={"rgba(255,255,255,0.1)"}>
              <View
                p={"4"}
                w={"full"}
                bg={"white"}
                shadow={"3"}
                rounded={"xl"}
                h={CARD_HEIGHT}
                marginTop={CARD_NEGATIVE_MARGIN}>
                <Text
                  fontSize={"xl"}
                  color={"#030819"}
                  fontWeight={"bold"}
                  fontFamily={"satoshi"}>
                  {truncate(clubDetailsResponse.club.name)}
                </Text>

                <HStack my={2} space={"4"}>
                  <MapIcon height={20} width={20} color={"#402B8C"} />

                  <Text
                    maxW={"75%"}
                    fontSize={"sm"}
                    color={"#030819"}
                    fontFamily={"satoshi"}>
                    {truncate(clubDetailsResponse.club.location, {
                      length: 70,
                    })}
                  </Text>
                </HStack>

                <Divider my={"2"} />

                <HStack justifyContent={"space-between"} alignItems={"center"}>
                  <HStack alignItems={"center"} space={"4"}>
                    <Clock height={20} width={20} />
                    <Text
                      fontSize={"sm"}
                      color={"#030819"}
                      fontFamily={"satoshi"}>
                      Open {clubDetailsResponse.club.opening_time} -{" "}
                      {clubDetailsResponse.club.closing_time}
                    </Text>
                  </HStack>

                  <Box>
                    <HStack
                      space={"1"}
                      alignItems={"center"}
                      justifyContent={"center"}>
                      <Fontisto name="star" color={"#FFC529"} size={16} />
                      <Text color={"black"} fontSize={"sm"}>
                        ({clubDetailsResponse.club.avg_rating})
                      </Text>
                    </HStack>
                  </Box>
                </HStack>
              </View>

              <Box>
                <Button
                  my={"5"}
                  size={"lg"}
                  rounded={"2xl"}
                  borderWidth={"2"}
                  variant={"outline"}
                  borderColor={"primary.300"}
                  _text={{
                    fontSize: "xl",
                    fontWeight: "bold",
                    fontFamily: "satoshi",
                    color: "primary.300",
                  }}>
                  Book a Table
                </Button>
              </Box>

              <HStack justifyContent={"space-between"} space={"2"}>
                <TouchableOpacity>
                  <LinearGradient
                    end={{x: 1, y: 0}}
                    start={{x: 0, y: 0}}
                    colors={["#472BBE", "#DF3BC0"]}
                    style={linearGradientButtonStyles}>
                    <Text color={"white"}>Offer Menu</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity>
                  <LinearGradient
                    end={{x: 0, y: 0}}
                    start={{x: 0, y: 1}}
                    colors={["#402BBC", "#00C1FF"]}
                    style={linearGradientButtonStyles}>
                    <Text color={"white"}>Reviews</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity>
                  <LinearGradient
                    end={{x: 1, y: 0}}
                    start={{x: 0, y: 0}}
                    colors={["#201648", "#7359D1"]}
                    style={linearGradientButtonStyles}>
                    <Text color={"white"}>Information</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </HStack>

              <View flex={1} bg={"rgba(255,255,255,0.1)"}></View>
            </VStack>
          </View>
        }
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  bookButton: {
    width: "100%",
    borderWidth: 3,
    borderRadius: 8,
    marginVertical: 15,
    alignItems: "center",
    borderColor: "#FF3FCB",
    justifyContent: "center",
  },
  ImageBackground: {
    height: 300,
    width: windowDimension.width * 1,
  },
  linearGradientButtons: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ClubDetailsScreen;
