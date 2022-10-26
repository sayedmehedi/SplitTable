import dayjs from "dayjs";
import React from "react";
import {ReviewItem} from "@src/models";
import truncate from "lodash.truncate";
import {Rating} from "react-native-ratings";
import EachReviewItem from "./EachReviewItem";
import {Clock, MapIcon} from "@constants/iconPath";
import relativeTime from "dayjs/plugin/relativeTime";
import Fontisto from "react-native-vector-icons/Fontisto";
import LinearGradient from "react-native-linear-gradient";
import GenericListEmpty from "@components/GenericListEmpty";
import AntDesign from "react-native-vector-icons/AntDesign";
import {useDimensions} from "@react-native-community/hooks";
import {SafeAreaView} from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useGetClubDetailsQuery from "@hooks/clubs/useGetClubDetailsQuery";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import useInfiniteGetClubReviewsQuery from "@hooks/review/useInfiniteGetClubReviewsQuery";
import {
  FlatList,
  Dimensions,
  StyleSheet,
  ListRenderItem,
  ImageBackground,
  TouchableOpacity,
  ScrollView as RNScrollView,
} from "react-native";
import {
  Box,
  Text,
  View,
  Icon,
  HStack,
  Divider,
  VStack,
  Button,
  Center,
  Spinner,
  Heading,
  Skeleton,
  useTheme,
  Progress,
  IconButton,
  ScrollView,
} from "native-base";

dayjs.extend(relativeTime);

const windowDimension = Dimensions.get("window");

const keyExtractor = (item: {id: number}) => item.id.toString();

const CARD_HEIGHT = 180;
const CARD_NEGATIVE_MARGIN = -1 * (CARD_HEIGHT / 2);

const renderEachReview: ListRenderItem<ReviewItem> = ({item}) => (
  <Box mb={"4"}>
    <EachReviewItem item={item} />
    <Box
      borderStyle={"dashed"}
      borderBottomWidth={"2"}
      borderColor={"coolGray.300"}
    />
  </Box>
);

type Props = {
  clubId: number;
  jumpTo: (key: string) => void;
};

const ClubDetailsAndReviewList = ({clubId, jumpTo}: Props) => {
  const theme = useTheme();
  const {
    screen: {width: SCREEN_WIDTH},
  } = useDimensions();
  const imageSliderIndexRef = React.useRef(0);
  const imageSliderRef = React.useRef<RNScrollView>(null!);

  const {
    error: clubDetailsError,
    data: clubDetailsResponse,
    isLoading: isClubDetailsLoading,
  } = useGetClubDetailsQuery(clubId);
  useHandleNonFieldError(clubDetailsError);

  const {
    error: infiniteGetResourcesError,
    data: infiniteGetResourcesResponse,
    isLoading: isLoadingInfiniteResources,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteGetClubReviewsQuery(
    {
      page: 1,
      ownerId: clubDetailsResponse?.club?.owner_id ?? 0,
    },
    {
      enabled: clubDetailsResponse?.club?.owner_id !== undefined,
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

  React.useEffect(() => {
    console.log("mounted");
    return () => {
      console.log("unmounted");
    };
  }, []);

  const resourceListData = React.useMemo(() => {
    return (
      infiniteGetResourcesResponse?.pages?.flatMap(eachPage => {
        return (
          eachPage?.reviews?.data?.map(eachReview => ({
            ...eachReview,
            date: dayjs(eachReview.date, "DD MMM YYYY").fromNow(),
          })) ?? []
        );
      }) ?? []
    );
  }, [infiniteGetResourcesResponse?.pages]);

  const handleFetchNextPage = React.useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const handlePreviousSlide = () => {
    if (clubDetailsResponse) {
      if (imageSliderIndexRef.current === 0) {
        imageSliderIndexRef.current =
          clubDetailsResponse.club.images.length - 1;
      } else {
        imageSliderIndexRef.current -= 1;
      }

      imageSliderRef?.current?.scrollTo({
        y: 0,
        animated: true,
        x: SCREEN_WIDTH * imageSliderIndexRef.current,
      });
    }
  };
  const handleNextSlide = () => {
    if (clubDetailsResponse) {
      if (
        imageSliderIndexRef.current ===
        clubDetailsResponse.club.images.length - 1
      ) {
        imageSliderIndexRef.current = 0;
      } else {
        imageSliderIndexRef.current += 1;
      }

      imageSliderRef?.current?.scrollTo({
        y: 0,
        animated: true,
        x: SCREEN_WIDTH * imageSliderIndexRef.current,
      });
    }
  };

  const flatlistContentContainerStyle = React.useMemo(() => {
    return {
      padding: theme.space["6"],
    };
  }, [theme.space[6]]);

  const flatlistHeaderComponentStyle = React.useMemo(() => {
    return {
      paddingBottom: theme.space[6],
      marginHorizontal: -theme.space[6],
    };
  }, [theme.space[6]]);

  if (isClubDetailsLoading) {
    return (
      <ScrollView>
        <Skeleton height={300} />

        <Box mx={"6"}>
          <Skeleton
            w={"full"}
            rounded={"xl"}
            h={CARD_HEIGHT}
            bg={"tomato"}
            marginTop={CARD_NEGATIVE_MARGIN}
          />

          <Skeleton
            h={"12"}
            my={"5"}
            w={"full"}
            rounded={"lg"}
            borderWidth={"2"}
            borderColor={"primary.300"}
          />

          <HStack space={"2"}>
            <Box flex={1}>
              <Skeleton
                h={"12"}
                my={"5"}
                w={"full"}
                rounded={"lg"}
                bg={"secondary.300"}
              />
            </Box>

            <Box flex={1}>
              <Skeleton
                h={"12"}
                my={"5"}
                w={"full"}
                rounded={"lg"}
                bg={"blue.300"}
              />
            </Box>

            <Box flex={1}>
              <Skeleton
                h={"12"}
                my={"5"}
                w={"full"}
                rounded={"lg"}
                bg={"secondary.100"}
              />
            </Box>
          </HStack>
        </Box>

        <Box p={6}>
          {new Array(5).fill(1).map((_, i) => (
            <Center w={"full"} key={i}>
              <HStack w={"full"} h={"32"} space={"5"} rounded={"md"}>
                <Skeleton
                  h={"24"}
                  w={"24"}
                  rounded={"sm"}
                  startColor="coolGray.100"
                />
                <VStack flex={"3"} space={"2.5"}>
                  <Skeleton h={"5"} startColor="amber.300" />
                  <Skeleton.Text lines={2} />

                  <HStack space="2" alignItems="center">
                    <Skeleton size={"5"} rounded={"full"} />
                    <Skeleton h={"3"} flex={"2"} rounded={"full"} />
                    <Skeleton
                      h={"3"}
                      flex={"1"}
                      rounded={"full"}
                      startColor={"indigo.300"}
                    />
                  </HStack>
                </VStack>
              </HStack>
            </Center>
          ))}
        </Box>
      </ScrollView>
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

  const ListHeaderComponent = (
    <View flex={1}>
      <Box position={"relative"}>
        <ScrollView
          horizontal
          pagingEnabled
          ref={originalRef => {
            // @ts-ignore
            imageSliderRef.current = originalRef;
          }}
          showsHorizontalScrollIndicator={false}>
          {clubDetailsResponse.club.images.map((img, i) => (
            <ImageBackground
              key={i}
              source={{uri: img}}
              style={styles.ImageBackground}
            />
          ))}
        </ScrollView>

        <Box position={"absolute"} w={"full"} top={0} left={0}>
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
                  bg={"rgba(0,0,0,0.5)"}
                  _pressed={{
                    bg: "secondary.300",
                  }}
                  _icon={{
                    color: "white",
                  }}
                  icon={
                    <Icon
                      as={AntDesign}
                      name={
                        clubDetailsResponse.club.is_favourite
                          ? "heart"
                          : "hearto"
                      }
                    />
                  }
                />
              </HStack>
            </HStack>
          </SafeAreaView>
        </Box>

        <Box top={"50%"} mt={-3} position={"absolute"} left={"6"}>
          <IconButton
            size={"md"}
            rounded={"full"}
            variant={"subtle"}
            bg={"rgba(0,0,0,0.5)"}
            onPress={handlePreviousSlide}
            _pressed={{
              bg: "secondary.300",
            }}
            _icon={{
              color: "white",
            }}
            icon={<Icon name={"arrow-left"} as={MaterialCommunityIcons} />}
          />
        </Box>

        <Box top={"50%"} mt={-3} position={"absolute"} right={"6"}>
          <IconButton
            size={"md"}
            rounded={"full"}
            variant={"subtle"}
            bg={"rgba(0,0,0,0.5)"}
            onPress={handleNextSlide}
            _pressed={{
              bg: "secondary.300",
            }}
            _icon={{
              color: "white",
            }}
            icon={<Icon name={"arrow-right"} as={MaterialCommunityIcons} />}
          />
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
              <Text fontSize={"sm"} color={"#030819"} fontFamily={"satoshi"}>
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
            size={"md"}
            rounded={"2xl"}
            borderWidth={"2"}
            variant={"outline"}
            borderColor={"primary.300"}
            _text={{
              fontSize: "xl",
              color: "primary.300",
              fontFamily: "satoshi",
              fontWeight: "semibold",
            }}>
            Book a Table
          </Button>
        </Box>

        <HStack justifyContent={"space-between"} space={"2"}>
          <TouchableOpacity
            style={{flex: 1, width: "100%"}}
            onPress={() => jumpTo("menus")}>
            <LinearGradient
              end={{x: 1, y: 0}}
              start={{x: 0, y: 0}}
              colors={["#472BBE", "#DF3BC0"]}
              style={styles.linearGradientButtons}>
              <Text color={"white"} fontWeight={"medium"}>
                Offer Menu
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={{flex: 1, width: "100%"}}
            onPress={() => jumpTo("reviews")}>
            <LinearGradient
              end={{x: 0, y: 0}}
              start={{x: 0, y: 1}}
              colors={["#402BBC", "#00C1FF"]}
              style={styles.linearGradientButtons}>
              <Text color={"white"} fontWeight={"medium"}>
                Reviews
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={{flex: 1, width: "100%"}}
            onPress={() => jumpTo("information")}>
            <LinearGradient
              end={{x: 1, y: 0}}
              start={{x: 0, y: 0}}
              colors={["#201648", "#7359D1"]}
              style={styles.linearGradientButtons}>
              <Text color={"white"} fontWeight={"medium"}>
                Information
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </HStack>

        {infiniteGetResourcesResponse !== undefined &&
          infiniteGetResourcesResponse?.pages?.length > 0 && (
            <HStack
              mt={"6"}
              space={"5"}
              alignItems={"center"}
              justifyContent={"space-between"}>
              <VStack maxW={"32"} space={"1"}>
                <HStack space={1} alignItems={"center"}>
                  <Fontisto name="star" color={"#FFC529"} size={10} />
                  <Heading size={"md"}>
                    {infiniteGetResourcesResponse.pages[0].avg_rating}
                  </Heading>
                </HStack>

                <Text numberOfLines={2} fontSize={"md"}>
                  Based on {infiniteGetResourcesResponse.pages[0].total_reviews}{" "}
                  Review
                </Text>
              </VStack>

              <VStack space={"2"} flex={1}>
                {Object.entries(
                  infiniteGetResourcesResponse?.pages?.[0]
                    ?.review_percentages ?? {},
                ).map(([id, percentage]) => {
                  return (
                    <HStack
                      key={id}
                      space={"3"}
                      alignItems={"center"}
                      justifyContent={"space-between"}>
                      <Rating
                        type={"custom"}
                        readonly
                        jumpValue={1}
                        imageSize={15}
                        showRating={false}
                        tintColor={theme.colors.white}
                        ratingBackgroundColor={theme.colors.coolGray[100]}
                        startingValue={
                          infiniteGetResourcesResponse.pages[0].review_numbers[
                            id as any
                          ]
                        }
                      />

                      <Progress
                        flex={1}
                        value={percentage}
                        colorScheme={"yellow"}
                      />

                      <Box w={"40px"}>
                        <Text fontSize={"xs"}>{percentage}%</Text>
                      </Box>
                    </HStack>
                  );
                })}
              </VStack>
            </HStack>
          )}
      </VStack>
    </View>
  );

  if (isLoadingInfiniteResources) {
    return (
      <ScrollView>
        {ListHeaderComponent}

        <Box p={6}>
          {new Array(5).fill(1).map((_, i) => (
            <Center w={"full"} key={i}>
              <HStack w={"full"} h={"32"} space={"5"} rounded={"md"}>
                <Skeleton
                  h={"24"}
                  w={"24"}
                  rounded={"sm"}
                  startColor="coolGray.100"
                />
                <VStack flex={"3"} space={"2.5"}>
                  <Skeleton h={"5"} startColor="amber.300" />
                  <Skeleton.Text lines={2} />

                  <HStack space="2" alignItems="center">
                    <Skeleton size={"5"} rounded={"full"} />
                    <Skeleton h={"3"} flex={"2"} rounded={"full"} />
                    <Skeleton
                      h={"3"}
                      flex={"1"}
                      rounded={"full"}
                      startColor={"indigo.300"}
                    />
                  </HStack>
                </VStack>
              </HStack>
            </Center>
          ))}
        </Box>
      </ScrollView>
    );
  }

  return (
    <FlatList
      onRefresh={refetch}
      data={resourceListData}
      refreshing={isRefetching}
      keyExtractor={keyExtractor}
      renderItem={renderEachReview}
      onEndReached={handleFetchNextPage}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={flatlistContentContainerStyle}
      ListHeaderComponentStyle={flatlistHeaderComponentStyle}
      ListFooterComponent={
        isFetchingNextPage ? (
          <Box>
            <Spinner />
          </Box>
        ) : resourceListData.length === 0 ? (
          <GenericListEmpty />
        ) : null
      }
      ListHeaderComponent={ListHeaderComponent}
    />
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
    flex: 1,
    padding: 10,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ClubDetailsAndReviewList;
