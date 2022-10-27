import dayjs from "dayjs";
import React from "react";
import {ReviewItem} from "@src/models";
import truncate from "lodash.truncate";
import {useTheme} from "styled-components";
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
  ScrollView as RNScrollView,
} from "react-native";
import {
  Box,
  Text,
  View,
  HStack,
  VStack,
  Spinner,
  Divider,
  ScrollView,
  TouchableOpacity,
} from "@components/ui";

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

  // if (isClubDetailsLoading) {
  //   return (
  //     <ScrollView>
  //       <Skeleton height={300} />

  //       <Box mx={"6"}>
  //         <Skeleton
  //           width={"full"}
  //           borderRadius={"xl"}
  //           height={CARD_HEIGHT}
  //           bg={"tomato"}
  //           marginTop={CARD_NEGATIVE_MARGIN}
  //         />

  //         <Skeleton
  //           height={"12"}
  //           my={"5"}
  //           width={"full"}
  //           borderRadius={"lg"}
  //           borderWidth={"2"}
  //           borderColor={"primary.300"}
  //         />

  //         <HStack space={"2"}>
  //           <Box flex={1}>
  //             <Skeleton
  //               height={"12"}
  //               my={"5"}
  //               width={"full"}
  //               borderRadius={"lg"}
  //               bg={"secondary.300"}
  //             />
  //           </Box>

  //           <Box flex={1}>
  //             <Skeleton
  //               height={"12"}
  //               my={"5"}
  //               width={"full"}
  //               borderRadius={"lg"}
  //               bg={"blue.300"}
  //             />
  //           </Box>

  //           <Box flex={1}>
  //             <Skeleton
  //               height={"12"}
  //               my={"5"}
  //               width={"full"}
  //               borderRadius={"lg"}
  //               bg={"secondary.100"}
  //             />
  //           </Box>
  //         </HStack>
  //       </Box>

  //       <Box p={6}>
  //         {new Array(5).fill(1).map((_, i) => (
  //           <Center width={"full"} key={i}>
  //             <HStack width={"full"} height={"32"} space={"5"} borderRadius={"md"}>
  //               <Skeleton
  //                 height={"24"}
  //                 width={"24"}
  //                 borderRadius={"sm"}
  //                 startColor="coolGray.100"
  //               />
  //               <VStack flex={"3"} space={"2.5"}>
  //                 <Skeleton height={"5"} startColor="amber.300" />
  //                 <Skeleton.Text lines={2} />

  //                 <HStack space="2" alignItems="center">
  //                   <Skeleton size={"5"} borderRadius={"full"} />
  //                   <Skeleton height={"3"} flex={"2"} borderRadius={"full"} />
  //                   <Skeleton
  //                     height={"3"}
  //                     flex={"1"}
  //                     borderRadius={"full"}
  //                     startColor={"indigo.300"}
  //                   />
  //                 </HStack>
  //               </VStack>
  //             </HStack>
  //           </Center>
  //         ))}
  //       </Box>
  //     </ScrollView>
  //   );
  // }

  if (!clubDetailsResponse) {
    return (
      <HStack safeArea height={"full"} width={"full"}>
        <Box width={"full"} height={"full"}>
          <GenericListEmpty />
        </Box>
      </HStack>
    );
  }

  const ListHeaderComponent = (
    <View flex={1}>
      <Box position={"relative"}>
        <ScrollView
          horizontal
          pagingEnabled
          ref={imageSliderRef}
          showsHorizontalScrollIndicator={false}>
          {clubDetailsResponse.club.images.map((img, i) => (
            <ImageBackground
              key={i}
              source={{uri: img}}
              style={styles.ImageBackground}
            />
          ))}
        </ScrollView>

        <Box position={"absolute"} width={"full"} top={0} left={0}>
          <SafeAreaView>
            <HStack p={"6"} justifyContent={"space-between"}>
              <TouchableOpacity
                borderRadius={"full"}
                alignItems={"center"}
                justifyContent={"center"}>
                <FontAwesome5 size={22} name={"chevron-left"} color={"white"} />
              </TouchableOpacity>

              <HStack>
                <TouchableOpacity
                  p={2}
                  borderRadius={"full"}
                  alignItems={"center"}
                  bg={"rgba(0,0,0,0.5)"}
                  justifyContent={"center"}>
                  <AntDesign size={22} name={"sharealt"} color={"white"} />
                </TouchableOpacity>

                <TouchableOpacity
                  p={2}
                  ml={4}
                  borderRadius={"full"}
                  alignItems={"center"}
                  bg={"rgba(0,0,0,0.5)"}
                  justifyContent={"center"}>
                  <AntDesign
                    size={22}
                    name={
                      clubDetailsResponse.club.is_favourite ? "heart" : "hearto"
                    }
                    color={"white"}
                  />
                </TouchableOpacity>
              </HStack>
            </HStack>
          </SafeAreaView>
        </Box>

        <Box top={"50%"} mt={-3} position={"absolute"} left={"6"}>
          <TouchableOpacity
            p={2}
            ml={4}
            borderRadius={"full"}
            alignItems={"center"}
            bg={"rgba(0,0,0,0.5)"}
            justifyContent={"center"}
            onPress={handlePreviousSlide}>
            <MaterialCommunityIcons
              size={22}
              name={"arrow-left"}
              color={"white"}
            />
          </TouchableOpacity>
        </Box>

        <Box top={"50%"} mt={-3} position={"absolute"} right={"6"}>
          <TouchableOpacity
            p={2}
            ml={4}
            borderRadius={"full"}
            alignItems={"center"}
            bg={"rgba(0,0,0,0.5)"}
            justifyContent={"center"}
            onPress={handleNextSlide}>
            <MaterialCommunityIcons
              size={22}
              name={"arrow-right"}
              color={"white"}
            />
          </TouchableOpacity>
        </Box>
      </Box>

      <VStack px={"6"} flex={1} bg={"rgba(255,255,255,0.1)"}>
        <View
          p={"4"}
          bg={"white"}
          width={"full"}
          borderRadius={"xl"}
          height={CARD_HEIGHT}
          style={theme.shadows[3]}
          marginTop={CARD_NEGATIVE_MARGIN}>
          <Text
            mb={4}
            fontSize={"xl"}
            color={"#030819"}
            fontFamily={"SatoshiVariable-Bold"}>
            {truncate(clubDetailsResponse.club.name)}
          </Text>

          <HStack my={2}>
            <MapIcon height={20} width={20} color={"#402B8C"} />

            <Text
              ml={4}
              fontSize={"sm"}
              maxWidth={"75%"}
              color={"#030819"}
              fontFamily={"Roboto-Regular"}>
              {truncate(clubDetailsResponse.club.location, {
                length: 70,
              })}
            </Text>
          </HStack>

          <Divider my={"3"} />

          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <HStack alignItems={"center"}>
              <Clock height={20} width={20} />
              <Text
                ml={4}
                fontSize={"sm"}
                color={"#030819"}
                fontFamily={"Satoshi-Regular"}>
                Open {clubDetailsResponse.club.opening_time} -{" "}
                {clubDetailsResponse.club.closing_time}
              </Text>
            </HStack>

            <Box>
              <HStack alignItems={"center"} justifyContent={"center"}>
                <Fontisto name="star" color={"#FFC529"} size={16} />
                <Text ml={1} color={"black"} fontSize={"sm"}>
                  ({clubDetailsResponse.club.avg_rating})
                </Text>
              </HStack>
            </Box>
          </HStack>
        </View>

        <Box>
          <TouchableOpacity
            p={4}
            my={"5"}
            borderRadius={"2xl"}
            borderWidth={"2"}
            variant={"outline"}
            borderColor={"primary.300"}>
            <Text
              fontSize={"xl"}
              textAlign={"center"}
              color={"primary.300"}
              fontFamily={"Satoshi-Medium"}>
              Book a Table
            </Text>
          </TouchableOpacity>
        </Box>

        <HStack justifyContent={"space-between"}>
          <TouchableOpacity
            flex={1}
            width={"full"}
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
            mx={2}
            flex={1}
            width={"full"}
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
            flex={1}
            width={"full"}
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
              alignItems={"center"}
              justifyContent={"space-between"}>
              <VStack maxWidth={"32"}>
                <HStack alignItems={"center"}>
                  <Fontisto name="star" color={"#FFC529"} size={10} />
                  <Text fontSize={"md"} ml={1}>
                    {infiniteGetResourcesResponse.pages[0].avg_rating}
                  </Text>
                </HStack>

                <Text numberOfLines={2} fontSize={"md"} ml={1}>
                  Based on {infiniteGetResourcesResponse.pages[0].total_reviews}{" "}
                  Review
                </Text>
              </VStack>

              <VStack space={"2"} flex={1} ml={5}>
                {Object.entries(
                  infiniteGetResourcesResponse?.pages?.[0]
                    ?.review_percentages ?? {},
                ).map(([id, percentage]) => {
                  return (
                    <HStack
                      key={id}
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

                      <Box flex={1} mx={3} position={"relative"}>
                        <Box
                          top={0}
                          left={0}
                          right={0}
                          bottom={0}
                          height={1}
                          zIndex={1}
                          width={"full"}
                          bg={"gray.300"}
                          position={"absolute"}
                          borderRadius={"full"}
                        />
                        <Box
                          top={0}
                          left={0}
                          right={0}
                          zIndex={2}
                          bottom={0}
                          height={1}
                          bg={"yellow.300"}
                          borderRadius={"full"}
                          position={"absolute"}
                          width={`${percentage}%`}
                        />
                      </Box>

                      <Box width={"40px"}>
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

  // if (isLoadingInfiniteResources) {
  //   return (
  //     <ScrollView>
  //       {ListHeaderComponent}

  //       <Box p={6}>
  //         {new Array(5).fill(1).map((_, i) => (
  //           <Center width={"full"} key={i}>
  //             <HStack width={"full"} height={"32"} space={"5"} borderRadius={"md"}>
  //               <Skeleton
  //                 height={"24"}
  //                 width={"24"}
  //                 borderRadius={"sm"}
  //                 startColor="coolGray.100"
  //               />
  //               <VStack flex={"3"} space={"2.5"}>
  //                 <Skeleton height={"5"} startColor="amber.300" />
  //                 <Skeleton.Text lines={2} />

  //                 <HStack space="2" alignItems="center">
  //                   <Skeleton size={"5"} borderRadius={"full"} />
  //                   <Skeleton height={"3"} flex={"2"} borderRadius={"full"} />
  //                   <Skeleton
  //                     height={"3"}
  //                     flex={"1"}
  //                     borderRadius={"full"}
  //                     startColor={"indigo.300"}
  //                   />
  //                 </HStack>
  //               </VStack>
  //             </HStack>
  //           </Center>
  //         ))}
  //       </Box>
  //     </ScrollView>
  //   );
  // }

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
