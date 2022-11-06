import React from "react";
import truncate from "lodash.truncate";
import {ClubMenuItem} from "@src/models";
import {splitAppTheme} from "@src/theme";
import {Clock, MapIcon} from "@constants/iconPath";
import EachOfferMenuItem from "./EachOfferMenuItem";
import GenericListEmpty from "@components/GenericListEmpty";
import Fontisto from "react-native-vector-icons/Fontisto";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import {useDimensions} from "@react-native-community/hooks";
import {SafeAreaView} from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useGetClubDetailsQuery from "@hooks/clubs/useGetClubDetailsQuery";
import useInfiniteGetClubMenusQuery from "@hooks/menu/useInfiniteGetClubMenusQuery";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  ListRenderItem,
  ImageBackground,
  ScrollView as RNScrollView,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";

const windowDimension = Dimensions.get("window");

const CARD_HEIGHT = 180;
const CARD_NEGATIVE_MARGIN = -1 * (CARD_HEIGHT / 2);

const keyExtractor = (item: {id: number}) => item.id.toString();

const renderOfferMenu: ListRenderItem<ClubMenuItem> = ({item}) => (
  <View
    style={{
      marginBottom: splitAppTheme.space["4"],
    }}>
    <EachOfferMenuItem item={item} />
  </View>
);

type Props = {clubId: number; jumpTo: (key: string) => void};

const ClubDetailsAndMenuListScreen = ({clubId, jumpTo}: Props) => {
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
  } = useInfiniteGetClubMenusQuery(
    {
      clubId: clubId,
      page: 1,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.menus.has_more_data) {
          return {
            page: lastPage.menus.current_page + 1,
          };
        }
      },
    },
  );
  useHandleNonFieldError(infiniteGetResourcesError);

  const resourceListData = React.useMemo(() => {
    return (
      infiniteGetResourcesResponse?.pages.flatMap(eachPage => {
        return eachPage.menus.data;
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
      padding: splitAppTheme.space["6"],
    };
  }, []);

  const flatlistHeaderComponentStyle = React.useMemo(() => {
    return {
      paddingBottom: splitAppTheme.space[6],
      marginHorizontal: -splitAppTheme.space[6],
    };
  }, []);

  if (isClubDetailsLoading) {
    return <Text>Loading...</Text>;
    // return (
    //   <ScrollView>
    //     <Skeleton height={300} />

    //     <Box mx={"6"}>
    //       <Skeleton
    //         width={"full"}
    //         borderRadius={"xl"}
    //         height={CARD_HEIGHT}
    //         bg={"tomato"}
    //         marginTop={CARD_NEGATIVE_MARGIN}
    //       />

    //       <Skeleton
    //         height={"12"}
    //         my={"5"}
    //         width={"full"}
    //         borderRadius={"lg"}
    //         borderWidth={"2"}
    //         borderColor={"primary.300"}
    //       />

    //       <HStack space={"2"}>
    //         <Box flex={1}>
    //           <Skeleton
    //             height={"12"}
    //             my={"5"}
    //             width={"full"}
    //             borderRadius={"lg"}
    //             bg={"secondary.300"}
    //           />
    //         </Box>

    //         <Box flex={1}>
    //           <Skeleton
    //             height={"12"}
    //             my={"5"}
    //             width={"full"}
    //             borderRadius={"lg"}
    //             bg={"blue.300"}
    //           />
    //         </Box>

    //         <Box flex={1}>
    //           <Skeleton
    //             height={"12"}
    //             my={"5"}
    //             width={"full"}
    //             borderRadius={"lg"}
    //             bg={"secondary.100"}
    //           />
    //         </Box>
    //       </HStack>
    //     </Box>

    //     <Box p={6}>
    //       {new Array(5).fill(1).map((_, i) => (
    //         <Center width={"full"} key={i}>
    //           <HStack width={"full"} height={"32"} space={"5"} borderRadius={"md"}>
    //             <Skeleton
    //               height={"24"}
    //               width={"24"}
    //               borderRadius={"sm"}
    //               startColor="coolGray.100"
    //             />
    //             <VStack flex={"3"} space={"2.5"}>
    //               <Skeleton height={"5"} startColor="amber.300" />
    //               <Skeleton.Text lines={2} />

    //               <HStack space="2" alignItems="center">
    //                 <Skeleton size={"5"} borderRadius={"full"} />
    //                 <Skeleton height={"3"} flex={"2"} borderRadius={"full"} />
    //                 <Skeleton
    //                   height={"3"}
    //                   flex={"1"}
    //                   borderRadius={"full"}
    //                   startColor={"indigo.300"}
    //                 />
    //               </HStack>
    //             </VStack>
    //           </HStack>
    //         </Center>
    //       ))}
    //     </Box>
    //   </ScrollView>
    // );
  }

  if (!clubDetailsResponse) {
    return (
      <View
        style={{
          width: splitAppTheme.sizes.full,
          height: splitAppTheme.sizes.full,
        }}>
        <View
          style={{
            width: splitAppTheme.sizes.full,
            height: splitAppTheme.sizes.full,
          }}>
          <GenericListEmpty />
        </View>
      </View>
    );
  }

  const ListHeaderComponent = (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          position: "relative",
        }}>
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

        <View
          style={{
            top: 0,
            left: 0,
            position: "absolute",
            width: splitAppTheme.sizes.full,
          }}>
          <SafeAreaView>
            <View
              style={{
                flexDirection: "row",
                padding: splitAppTheme.space[6],
                justifyContent: "space-between",
              }}>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: splitAppTheme.radii.full,
                }}>
                <FontAwesome5 size={22} name={"chevron-left"} color={"white"} />
              </TouchableOpacity>

              <View style={{flexDirection: "row"}}>
                <View>
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      padding: splitAppTheme.space[2],
                      backgroundColor: "rgba(0,0,0,0.5)",
                      borderRadius: splitAppTheme.radii.full,
                    }}>
                    <AntDesign size={22} name={"sharealt"} color={"white"} />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    marginLeft: splitAppTheme.space[4],
                  }}>
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      padding: splitAppTheme.space[2],
                      backgroundColor: "rgba(0,0,0,0.5)",
                      borderRadius: splitAppTheme.radii.full,
                    }}>
                    <AntDesign
                      size={22}
                      name={
                        clubDetailsResponse.club.is_favourite
                          ? "heart"
                          : "hearto"
                      }
                      color={"white"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>

        <View
          style={{
            top: "50%",
            position: "absolute",
            left: splitAppTheme.space[6],
            marginTop: splitAppTheme.space[3] * -1,
          }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              padding: splitAppTheme.space[2],
              marginLeft: splitAppTheme.space[4],
              borderRadius: splitAppTheme.radii.full,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
            }}
            onPress={handlePreviousSlide}>
            <MaterialCommunityIcons
              size={22}
              name={"arrow-left"}
              color={"white"}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            top: "50%",
            position: "absolute",
            right: splitAppTheme.space[6],
            marginTop: splitAppTheme.space[3] * -1,
          }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: splitAppTheme.space[2],
              marginLeft: splitAppTheme.space[4],
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: splitAppTheme.radii.full,
            }}
            onPress={handleNextSlide}>
            <MaterialCommunityIcons
              size={22}
              name={"arrow-right"}
              color={"white"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: splitAppTheme.space[6],
          backgroundColor: "rgba(255,255,255,0.1)",
        }}>
        <View
          style={{
            height: CARD_HEIGHT,
            ...splitAppTheme.shadows[3],
            padding: splitAppTheme.space[4],
            marginTop: CARD_NEGATIVE_MARGIN,
            width: splitAppTheme.sizes.full,
            borderRadius: splitAppTheme.radii.xl,
            backgroundColor: splitAppTheme.colors.white,
          }}>
          <Text
            style={{
              color: "#030819",
              marginBottom: splitAppTheme.space[4],
              fontSize: splitAppTheme.fontSizes.xl,
              fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
            }}>
            {truncate(clubDetailsResponse.club.name)}
          </Text>

          <View
            style={{
              flexDirection: "row",
              marginVertical: splitAppTheme.space[2],
            }}>
            <MapIcon height={20} width={20} color={"#402B8C"} />

            <Text
              style={{
                maxWidth: "75%",
                color: "#030819",
                marginLeft: splitAppTheme.space[4],
                fontSize: splitAppTheme.fontSizes.sm,
                fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
              }}>
              {truncate(clubDetailsResponse.club.location, {
                length: 70,
              })}
            </Text>
          </View>

          <View
            style={{
              height: 1,
              backgroundColor: "black",
              marginVertical: splitAppTheme.space[3],
            }}
          />

          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
              }}>
              <Clock height={20} width={20} />
              <Text
                style={{
                  color: "#030819",
                  marginLeft: splitAppTheme.space[4],
                  fontSize: splitAppTheme.fontSizes.sm,
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
                }}>
                Open {clubDetailsResponse.club.opening_time} -{" "}
                {clubDetailsResponse.club.closing_time}
              </Text>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Fontisto name="star" color={"#FFC529"} size={16} />
                <Text
                  style={{
                    color: "black",
                    marginLeft: splitAppTheme.space[1],
                    fontSize: splitAppTheme.fontSizes.sm,
                  }}>
                  ({clubDetailsResponse.club.avg_rating})
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={{
              padding: splitAppTheme.space[4],
              marginVertical: splitAppTheme.space[5],
              borderRadius: splitAppTheme.radii["2xl"],
              borderWidth: splitAppTheme.borderWidths[2],
              borderColor: splitAppTheme.colors.primary[300],
            }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: splitAppTheme.fontSizes.xl,
                color: splitAppTheme.colors.primary[300],
                fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
              }}>
              Book a Table
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              width: splitAppTheme.sizes.full,
            }}
            onPress={() => jumpTo("menus")}>
            <LinearGradient
              end={{x: 1, y: 0}}
              start={{x: 0, y: 0}}
              colors={["#472BBE", "#DF3BC0"]}
              style={styles.linearGradientButtons}>
              <Text
                style={{
                  color: "white",
                }}>
                Offer Menu
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              marginHorizontal: splitAppTheme.space[2],
              width: splitAppTheme.sizes.full,
            }}
            onPress={() => jumpTo("reviews")}>
            <LinearGradient
              end={{x: 0, y: 0}}
              start={{x: 0, y: 1}}
              colors={["#402BBC", "#00C1FF"]}
              style={styles.linearGradientButtons}>
              <Text
                style={{
                  color: "white",
                }}>
                Reviews
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              width: splitAppTheme.sizes.full,
            }}
            onPress={() => jumpTo("information")}>
            <LinearGradient
              end={{x: 1, y: 0}}
              start={{x: 0, y: 0}}
              colors={["#201648", "#7359D1"]}
              style={styles.linearGradientButtons}>
              <Text
                style={{
                  color: "white",
                }}>
                Information
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (isLoadingInfiniteResources) {
    return <Text>Loading..</Text>;
    // return (
    //   <ScrollView>
    //     {ListHeaderComponent}

    //     <Box p={6}>
    //       {new Array(5).fill(1).map((_, i) => (
    //         <Box width={"full"} key={i}>
    //           <HStack width={"full"} height={"32"} space={"5"} borderRadius={"md"}>
    //             <Skeleton
    //               height={"24"}
    //               width={"24"}
    //               borderRadius={"sm"}
    //               startColor="coolGray.100"
    //             />
    //             <VStack flex={"3"} space={"2.5"}>
    //               <Skeleton height={"5"} startColor="amber.300" />
    //               <Skeleton.Text lines={2} />

    //               <HStack space="2" alignItems="center">
    //                 <Skeleton size={"5"} borderRadius={"full"} />
    //                 <Skeleton height={"3"} flex={"2"} borderRadius={"full"} />
    //                 <Skeleton
    //                   height={"3"}
    //                   flex={"1"}
    //                   borderRadius={"full"}
    //                   startColor={"indigo.300"}
    //                 />
    //               </HStack>
    //             </VStack>
    //           </HStack>
    //         </Box>
    //       ))}
    //     </Box>
    //   </ScrollView>
    // );
  }

  return (
    <FlatList
      onRefresh={refetch}
      data={resourceListData}
      refreshing={isRefetching}
      keyExtractor={keyExtractor}
      renderItem={renderOfferMenu}
      onEndReached={handleFetchNextPage}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={flatlistContentContainerStyle}
      ListHeaderComponentStyle={flatlistHeaderComponentStyle}
      ListFooterComponent={
        isFetchingNextPage ? (
          <View>
            <ActivityIndicator />
          </View>
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

export default ClubDetailsAndMenuListScreen;
