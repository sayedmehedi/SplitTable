import React from "react";
import truncate from "lodash.truncate";
import {splitAppTheme} from "@src/theme";
import useAppToast from "@hooks/useAppToast";
import {QueryKeys} from "@constants/query-keys";
import {Clock, MapIcon} from "@constants/iconPath";
import {useQueryClient} from "@tanstack/react-query";
import {useDisclosure} from "react-use-disclosure";
import {CustomerStackRoutes} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import LinearGradient from "react-native-linear-gradient";
import Fontisto from "react-native-vector-icons/Fontisto";
import {useDimensions} from "@react-native-community/hooks";
import GenericListEmpty from "@components/GenericListEmpty";
import {CompositeScreenProps} from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import {isResponseResultError} from "@utils/error-handling";
import ClubDetailsInformation from "./ClubDetailsInformation";
import ClubDetailsAndReviewList from "./ClubDetailsAndReviewList";
import ClubDetailsAndMenuListScreen from "./ClubDetailsAndMenuList";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import useGetClubDetailsQuery from "@hooks/clubs/useGetClubDetailsQuery";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import useToggleFavoriteClubMutation from "@hooks/clubs/useToggleFavoriteClubMutation";
import {
  View,
  Text,
  FlatList,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
} from "react-native";
import ReviewModal from "@components/ReviewModal";
import {AppTableListTypes} from "@constants/table";
import useShareResourceMutation from "@hooks/useShareResourceMutation";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";
import FastImage from "react-native-fast-image";

const CARD_HEIGHT = 100;
const CARD_NEGATIVE_MARGIN = -1 * (CARD_HEIGHT / 2);

type Props = CompositeScreenProps<
  StackScreenProps<
    CustomerStackParamList,
    typeof CustomerStackRoutes.CLUB_DETAILS
  >,
  StackScreenProps<RootStackParamList>
>;

const ClubDetailsScreen = ({navigation, route}: Props) => {
  const toast = useAppToast();
  const queryClient = useQueryClient();
  const pagerRef = React.useRef<FlatList>(null!);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const {isOpen: isReviewModalOpen, toggle: toggleReviewModal} =
    useDisclosure();

  const {
    window: {width: WINDOW_WIDTH},
  } = useDimensions();

  const imageSliderIndexRef = React.useRef(0);
  const imageSliderRef = React.useRef<ScrollView>(null!);

  const {
    error: clubDetailsError,
    data: clubDetailsResponse,
    refetch: refetchClubDetail,
    isLoading: isClubDetailsLoading,
  } = useGetClubDetailsQuery(route.params.clubId);
  useHandleNonFieldError(clubDetailsError);

  const {
    mutate: toggleFavoriteClub,
    error: toggleFavoriteError,
    isLoading: isTogglingFavorite,
    data: toggleFavoriteClubResponse,
  } = useToggleFavoriteClubMutation();
  useHandleNonFieldError(toggleFavoriteError);
  useHandleResponseResultError(toggleFavoriteClubResponse);

  const {
    isLoading: isSharing,
    mutate: shareResource,
    error: shareResourceError,
    isError: isShareError,
  } = useShareResourceMutation();
  // useHandleNonFieldError(shareResourceError);

  React.useEffect(() => {
    if (isShareError) {
      toast.info(shareResourceError.message);
    }
  }, [isShareError, JSON.stringify(shareResourceError)]);

  const handleToggleFavorite = React.useCallback(() => {
    toggleFavoriteClub(
      {clubId: route.params.clubId},
      {
        async onSuccess(data) {
          if (!isResponseResultError(data)) {
            toast.success(data.message);
            await refetchClubDetail();
            await queryClient.invalidateQueries([QueryKeys.FAVORITE, "LIST"]);
          }
        },
      },
    );
  }, [toggleFavoriteClub]);

  const handlePager = (index: number) => {
    setSelectedIndex(index);
  };

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
        x: WINDOW_WIDTH * imageSliderIndexRef.current,
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
        x: WINDOW_WIDTH * imageSliderIndexRef.current,
      });
    }
  };

  if (isClubDetailsLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <ActivityIndicator size={"small"} />
      </View>
    );
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
          <GenericListEmpty height={300} width={300} />
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <FocusAwareStatusBar
        translucent
        barStyle={"light-content"}
        backgroundColor={"transparent"}
      />

      <FlatList
        data={[{key: "body"}]}
        renderItem={() => {
          if (selectedIndex === 0) {
            return (
              <ClubDetailsAndMenuListScreen
                clubId={clubDetailsResponse.club.id}
                clubName={clubDetailsResponse.club.name}
              />
            );
          }

          if (selectedIndex === 1) {
            return <ClubDetailsAndReviewList clubId={route.params.clubId} />;
          }

          return <ClubDetailsInformation clubId={route.params.clubId} />;
        }}
        listKey={"club-details"}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={
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
                  <FastImage
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
                      paddingHorizontal: 20,
                      justifyContent: "space-between",
                      ...Platform.select({
                        android: {
                          paddingVertical: splitAppTheme.space[6],
                        },
                      }),
                    }}>
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: splitAppTheme.radii.full,
                      }}
                      onPress={() => {
                        navigation.goBack();
                      }}>
                      <FontAwesome5
                        size={30}
                        color={"white"}
                        name={"chevron-left"}
                      />
                    </TouchableOpacity>

                    <View style={{flexDirection: "row"}}>
                      <View>
                        <TouchableOpacity
                          disabled={isSharing}
                          onPress={() => {
                            shareResource({
                              url: clubDetailsResponse.club.images[0],
                              title: clubDetailsResponse.club.name,
                              message: `Club: ${clubDetailsResponse.club.name}\nLocation: ${clubDetailsResponse.club.location}\nOpening hour: ${clubDetailsResponse.club.opening_time} - ${clubDetailsResponse.club.closing_time}`,
                            });
                          }}
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            padding: splitAppTheme.space[2],
                            backgroundColor: "rgba(0,0,0,0.5)",
                            borderRadius: splitAppTheme.radii.full,
                          }}>
                          <AntDesign
                            size={22}
                            name={"sharealt"}
                            color={"white"}
                          />
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          marginLeft: splitAppTheme.space[4],
                        }}>
                        {isTogglingFavorite ? (
                          <View style={{padding: splitAppTheme.space[3]}}>
                            <ActivityIndicator color={"white"} size={"small"} />
                          </View>
                        ) : (
                          <TouchableOpacity
                            onPress={handleToggleFavorite}
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
                        )}
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
                  // height: CARD_HEIGHT,
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
                    marginBottom: splitAppTheme.space[1],
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
                        fontFamily:
                          splitAppTheme.fontConfig.Sathoshi[400].normal,
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

              <View
                style={{
                  marginVertical: splitAppTheme.space[2],
                }}></View>

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
                  onPress={() => handlePager(0)}>
                  {selectedIndex === 0 ? (
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
                  ) : (
                    <View
                      style={[
                        {
                          height: 40,
                          borderRadius: 5,
                          alignItems: "center",
                          justifyContent: "center",
                          width:
                            WINDOW_WIDTH * 0.3 -
                            splitAppTheme.space["6"] * 0.3 -
                            splitAppTheme.space["3"] * 0.3,
                        },
                        {
                          borderColor: "rgba(229, 7, 167, 0.2)",
                          borderWidth: splitAppTheme.borderWidths[1],
                          backgroundColor: "rgba(229, 7, 167, 0.2)",
                        },
                      ]}>
                      <Text
                        style={{
                          color: splitAppTheme.colors.primary[400],
                        }}>
                        Offer Menu
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flex: 1,
                    marginHorizontal: splitAppTheme.space[2],
                    width: splitAppTheme.sizes.full,
                  }}
                  onPress={() => handlePager(1)}>
                  {selectedIndex === 1 ? (
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
                  ) : (
                    <View
                      style={[
                        {
                          height: 40,
                          borderRadius: 5,
                          alignItems: "center",
                          justifyContent: "center",
                          width:
                            WINDOW_WIDTH * 0.3 -
                            splitAppTheme.space["6"] * 0.3 -
                            splitAppTheme.space["3"] * 0.3,
                        },
                        {
                          borderColor: "rgba(0, 174, 230, 0.2)",
                          borderWidth: splitAppTheme.borderWidths[1],
                          backgroundColor: "rgba(0, 174, 230, 0.2)",
                        },
                      ]}>
                      <Text
                        style={{
                          color: splitAppTheme.colors.blue[400],
                        }}>
                        Reviews
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flex: 1,
                    width: splitAppTheme.sizes.full,
                  }}
                  onPress={() => handlePager(2)}>
                  {selectedIndex === 2 ? (
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
                  ) : (
                    <View
                      style={[
                        {
                          height: 40,
                          borderRadius: 5,
                          alignItems: "center",
                          justifyContent: "center",
                          width:
                            WINDOW_WIDTH * 0.3 -
                            splitAppTheme.space["6"] * 0.3 -
                            splitAppTheme.space["3"] * 0.3,
                        },
                        {
                          borderColor: "rgba(106, 79, 200, 0.2)",
                          borderWidth: splitAppTheme.borderWidths[1],
                          backgroundColor: "rgba(106, 79, 200, 0.2)",
                        },
                      ]}>
                      <Text
                        style={{
                          color: splitAppTheme.colors.secondary[400],
                        }}>
                        Information
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
        ListFooterComponent={
          <View style={{marginTop: splitAppTheme.sizes[16]}}></View>
        }
      />

      {/* <ReviewModal
        open={isReviewModalOpen}
        onClose={toggleReviewModal}
        reviewerId={clubDetailsResponse.club.owner_id}
      /> */}

      {/* <View
          style={{
            bottom: 0,
            width: WINDOW_WIDTH,
            position: "absolute",
          }}>
          <TouchableOpacity
            onPress={() => {
              toggleReviewModal();
            }}>
            <LinearGradient
              colors={[
                splitAppTheme.colors.blue[500],
                splitAppTheme.colors.secondary[500],
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: splitAppTheme.sizes.full,
                paddingVertical: splitAppTheme.space[5],
              }}>
              <View
                style={{
                  justifyContent: "center",
                  width: splitAppTheme.sizes.full,
                }}>
                <Text
                  style={{
                    textAlign: "center",
                    color: splitAppTheme.colors.white,
                    fontSize: splitAppTheme.fontSizes.lg,
                    fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                  }}>
                  Write your Review
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View> */}

      {selectedIndex === 1 ? null : (
        <View
          style={{
            bottom: 0,
            position: "absolute",
            width: WINDOW_WIDTH,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(CustomerStackRoutes.TABLE_LIST, {
                headerTitle: clubDetailsResponse.club.name,
                listType: AppTableListTypes.BY_CLUB_ID,
                searchTerm: {
                  clubId: clubDetailsResponse.club.id,
                },
              });
            }}>
            <LinearGradient
              colors={[
                splitAppTheme.colors.secondary[500],
                splitAppTheme.colors.primary[500],
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: splitAppTheme.sizes.full,
                paddingVertical: splitAppTheme.space[5],
              }}>
              <View
                style={{
                  justifyContent: "center",
                  width: splitAppTheme.sizes.full,
                }}>
                <Text
                  style={{
                    textAlign: "center",
                    color: splitAppTheme.colors.white,
                    fontSize: splitAppTheme.fontSizes.lg,
                    fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                  }}>
                  View This Club Table & Events
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ClubDetailsScreen;

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
    width: Dimensions.get("window").width * 1,
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
