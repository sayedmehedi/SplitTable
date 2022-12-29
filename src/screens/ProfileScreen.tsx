import React from "react";
import {splitAppTheme} from "@src/theme";
import {QueryKeys} from "@constants/query-keys";
import {isCustomerProfile} from "@utils/profile";
import PhotoList from "./CUSTOMER/AccountScreen/PhotoList";
import ReviewList from "./CUSTOMER/AccountScreen/ReviewList";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";
import AddUserPhotoBtn from "./CUSTOMER/AccountScreen/AddUserPhotoBtn";
import {
  RootStackRoutes,
  CustomerStackRoutes,
  CustomerMainBottomTabRoutes,
} from "@constants/routes";
import {AuthTypeNum} from "@constants/auth";
import {TiktokIcon} from "@constants/iconPath";
import {RootStackParamList} from "@src/navigation";
import Entypo from "react-native-vector-icons/Entypo";
import {StackScreenProps} from "@react-navigation/stack";
import LinearGradient from "react-native-linear-gradient";
import {useDimensions} from "@react-native-community/hooks";
import {SafeAreaView} from "react-native-safe-area-context";
import useGetAuthDataQuery from "@hooks/useGetAuthDataQuery";
import useGetProfileQuery from "@hooks/auth/useGetProfileQuery";
import {useIsFetching, useQueryClient} from "@tanstack/react-query";
import ProfileImageUploader from "../components/ProfileImageUploader";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  View,
  Text,
  Linking,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {FriendshipStatuses} from "@constants/friend";
import useCheckFriendshipQuery from "@hooks/user/useCheckFriendshipQuery";
import useAddFriendshipMutation from "@hooks/user/useAddFriendshipMutation";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";

type ProfileScreenProps = StackScreenProps<
  RootStackParamList,
  typeof RootStackRoutes.PROFILE
>;

const ProfileScreen = ({navigation, route}: ProfileScreenProps) => {
  const queryClient = useQueryClient();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const isFetchingUserImages = useIsFetching({
    queryKey: [QueryKeys.IMAGE],
  });

  const {
    window: {width: WINDOW_WIDTH},
  } = useDimensions();

  const {data: authData, isLoading: isAuthDataLoading} = useGetAuthDataQuery();
  const {data: checkFriendshipData, isLoading: isCheckingFriendship} =
    useCheckFriendshipQuery(
      {
        friendId: route.params.userId ?? 0,
      },
      {
        enabled:
          route.params.userId !== undefined &&
          authData?.id !== route.params.userId,
      },
    );

  const {
    mutate: addFriendship,
    isLoading: isAddingFriendship,
    error: addFriendshipError,
    data: addFriendshipResponse,
  } = useAddFriendshipMutation();
  useHandleNonFieldError(addFriendshipError);
  useHandleResponseResultError(addFriendshipResponse);

  const {data: profileData, isLoading} = useGetProfileQuery(
    route.params.userId,
  );

  const handlePager = (index: number) => {
    setSelectedIndex(index);
  };

  const handleRefresh = async () => {
    await queryClient.refetchQueries([QueryKeys.IMAGE]);
  };

  if (isLoading || isAuthDataLoading) {
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

  if (!isCustomerProfile(profileData)) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Text>Not a customer profile</Text>
      </View>
    );
  }

  const isMyProfile = authData?.id === profileData.id;

  const ListHeaderComponent = (
    <>
      <LinearGradient
        end={{x: 0, y: 0}}
        start={{x: 0, y: 1}}
        colors={["#DF3BC0", "#472BBE"]}
        style={{
          height: 180,
          width: "100%",
          zIndex: -1000,
        }}>
        <SafeAreaView>
          <TouchableOpacity
            style={{
              padding: 15,
              zIndex: 10000,
            }}
            onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={40} color={"white"} />
          </TouchableOpacity>
        </SafeAreaView>

        {isCheckingFriendship || isAddingFriendship ? (
          <View>
            <ActivityIndicator />
          </View>
        ) : checkFriendshipData?.data === FriendshipStatuses.REJECTED ? (
          <TouchableOpacity
            onPress={() => {
              if (route.params.userId !== undefined) {
                addFriendship({
                  friendId: route.params.userId,
                });
              }
            }}>
            <View
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                padding: splitAppTheme.space[2],
                width: splitAppTheme.sizes["2/4"],
                borderWidth: splitAppTheme.borderWidths[1],
                borderColor: splitAppTheme.colors.blue[400],
              }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: splitAppTheme.fontSizes.md,
                  color: splitAppTheme.colors.blue[400],
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
                }}>
                Add Friend
              </Text>
            </View>
          </TouchableOpacity>
        ) : checkFriendshipData?.data === FriendshipStatuses.PENDING ? (
          <View
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              padding: splitAppTheme.space[2],
              width: splitAppTheme.sizes["2/4"],
              borderWidth: splitAppTheme.borderWidths[1],
              borderColor: splitAppTheme.colors.warning[400],
            }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: splitAppTheme.fontSizes.md,
                color: splitAppTheme.colors.warning[400],
                fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
              }}>
              Pending Friend Request
            </Text>
          </View>
        ) : checkFriendshipData?.data === FriendshipStatuses.FRIEND ? (
          <View
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              padding: splitAppTheme.space[2],
              width: splitAppTheme.sizes["2/4"],
              borderWidth: splitAppTheme.borderWidths[1],
              borderColor: splitAppTheme.colors.success[400],
            }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: splitAppTheme.fontSizes.md,
                color: splitAppTheme.colors.success[400],
                fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
              }}>
              You are friends
            </Text>
          </View>
        ) : null}
      </LinearGradient>

      <View
        style={{
          zIndex: -100,
          marginTop: -60,
        }}>
        <ProfileImageUploader
          disabled={!isMyProfile}
          imageUrl={profileData.image}
        />
      </View>

      <View
        style={{
          alignSelf: "center",
          alignItems: "center",
          paddingHorizontal: 10,
          marginBottom: splitAppTheme.space[3],
        }}>
        <Text
          style={{
            fontSize: 26,
            color: "#030819",
            fontFamily: "SatoshiVariable-Bold",
          }}>
          {profileData?.name}
        </Text>
        <Text
          style={{
            color: "#8A8D9F",
            textAlign: "center",
            fontSize: splitAppTheme.fontSizes.sm,
            fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
          }}>
          {profileData?.location}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: splitAppTheme.space["1"],
        }}>
        {!!profileData.social_links?.facebook && (
          <View style={{marginRight: splitAppTheme.space[3]}}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(profileData.social_links!.facebook!);
              }}>
              <View
                style={{
                  padding: splitAppTheme.space["1.5"],
                  borderRadius: splitAppTheme.radii.full,
                  borderWidth: splitAppTheme.borderWidths[1],
                  borderColor: splitAppTheme.colors.secondary[600],
                }}>
                <MaterialCommunityIcons
                  name={"facebook"}
                  size={20}
                  color={splitAppTheme.colors.secondary[600]}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {!!profileData.social_links?.tiktok && (
          <View style={{marginRight: splitAppTheme.space[3]}}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(profileData.social_links!.tiktok!);
              }}>
              <View
                style={{
                  padding: splitAppTheme.space["1.5"],
                  borderRadius: splitAppTheme.radii.full,
                  borderWidth: splitAppTheme.borderWidths[1],
                  borderColor: splitAppTheme.colors.secondary[600],
                }}>
                <TiktokIcon
                  width={20}
                  height={20}
                  color={splitAppTheme.colors.secondary[600]}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {!!profileData.social_links?.twitter && (
          <View style={{marginRight: splitAppTheme.space[3]}}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(profileData.social_links!.twitter!);
              }}>
              <View
                style={{
                  padding: splitAppTheme.space["1.5"],
                  borderRadius: splitAppTheme.radii.full,
                  borderWidth: splitAppTheme.borderWidths[1],
                  borderColor: splitAppTheme.colors.secondary[600],
                }}>
                <MaterialCommunityIcons
                  name={"twitter"}
                  size={20}
                  color={splitAppTheme.colors.secondary[600]}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {!!profileData.social_links?.instgram && (
          <View style={{marginRight: splitAppTheme.space[3]}}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(profileData.social_links!.instgram!);
              }}>
              <View
                style={{
                  padding: splitAppTheme.space["1.5"],
                  borderRadius: splitAppTheme.radii.full,
                  borderWidth: splitAppTheme.borderWidths[1],
                  borderColor: splitAppTheme.colors.secondary[600],
                }}>
                <MaterialCommunityIcons
                  name={"instagram"}
                  size={20}
                  color={splitAppTheme.colors.secondary[600]}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {!!profileData.social_links?.linkendin && (
          <View style={{marginRight: splitAppTheme.space[3]}}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(profileData.social_links!.linkendin!);
              }}>
              <View
                style={{
                  padding: splitAppTheme.space["1.5"],
                  borderRadius: splitAppTheme.radii.full,
                  borderWidth: splitAppTheme.borderWidths[1],
                  borderColor: splitAppTheme.colors.secondary[600],
                }}>
                <MaterialCommunityIcons
                  name={"linkedin"}
                  size={20}
                  color={splitAppTheme.colors.secondary[600]}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {!!profileData.social_links?.youtube && (
          <View>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(profileData.social_links!.youtube!);
              }}>
              <View
                style={{
                  padding: splitAppTheme.space["1.5"],
                  borderRadius: splitAppTheme.radii.full,
                  borderWidth: splitAppTheme.borderWidths[1],
                  borderColor: splitAppTheme.colors.secondary[600],
                }}>
                <MaterialCommunityIcons
                  name={"youtube"}
                  size={20}
                  color={splitAppTheme.colors.secondary[600]}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View
        style={{
          marginVertical: 10,
          flexDirection: "row",
          paddingHorizontal: 30,
          justifyContent: "space-between",
        }}>
        <View style={{alignItems: "center"}}>
          <LinearGradient
            end={{x: 0, y: 0}}
            start={{x: 0, y: 1}}
            colors={["#DF3BC0", "#472BBE"]}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Text style={{color: "white"}}>{profileData.bookings}</Text>
          </LinearGradient>
          <Text
            style={{
              fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
              fontSize: splitAppTheme.fontSizes.md,
            }}>
            Books
          </Text>
        </View>

        <View style={{alignItems: "center"}}>
          <LinearGradient
            colors={["#402BBC", "#00C1FF"]}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Text style={{color: "white"}}>{profileData.reviews}</Text>
          </LinearGradient>
          <Text
            style={{
              fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
              fontSize: splitAppTheme.fontSizes.md,
            }}>
            Reviews
          </Text>
        </View>

        <View style={{alignItems: "center"}}>
          <LinearGradient
            colors={["#201648", "#7359D1"]}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Text style={{color: "white"}}>{profileData.photos}</Text>
          </LinearGradient>
          <Text
            style={{
              fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
              fontSize: splitAppTheme.fontSizes.md,
            }}>
            Photos
          </Text>
        </View>
      </View>

      <View
        style={{
          marginVertical: 10,
          flexDirection: "row",
          paddingHorizontal: splitAppTheme.space[6],
          justifyContent:
            authData?.user_type === AuthTypeNum.CUSTOMER
              ? "space-between"
              : "space-around",
        }}>
        <TouchableOpacity onPress={() => handlePager(0)}>
          {selectedIndex === 0 ? (
            <LinearGradient
              end={{x: 1, y: 0}}
              start={{x: 0, y: 0}}
              colors={["#472BBE", "#DF3BC0"]}
              style={{
                height: 40,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                width:
                  WINDOW_WIDTH * 0.3 -
                  splitAppTheme.space["6"] * 0.3 -
                  splitAppTheme.space["3"] * 0.3,
              }}>
              <Text style={{color: "white"}}>Photo Story</Text>
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
                Photo Story
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePager(1)}>
          {selectedIndex === 1 ? (
            <LinearGradient
              colors={["#402BBC", "#00C1FF"]}
              start={{x: 0, y: 1}}
              end={{x: 0, y: 0}}
              style={{
                height: 40,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                width:
                  WINDOW_WIDTH * 0.3 -
                  splitAppTheme.space["6"] * 0.3 -
                  splitAppTheme.space["3"] * 0.3,
              }}>
              <Text style={{color: "white"}}>Reviews</Text>
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

        {authData?.user_type === AuthTypeNum.CUSTOMER && (
          <TouchableOpacity
            onPress={() => {
              if (isMyProfile) {
                navigation.navigate(RootStackRoutes.CUSTOMER, {
                  screen: CustomerStackRoutes.CUSTOMER_MAIN_TAB,
                  params: {
                    screen: CustomerMainBottomTabRoutes.CHAT_LIST,
                  },
                });
              } else {
                navigation.navigate(RootStackRoutes.CUSTOMER, {
                  screen: CustomerStackRoutes.CUSTOMER_MAIN_TAB,
                  params: {
                    screen: CustomerMainBottomTabRoutes.CHAT_LIST,
                  },
                });

                navigation.navigate(RootStackRoutes.CUSTOMER, {
                  screen: CustomerStackRoutes.CHAT_MESSAGES,
                  params: {
                    // chatId: item.id,
                    partnerName: profileData.name,
                    partnerImage: profileData.image,
                  },
                });
              }

              // CustomerStackRoutes.CHAT_MESSAGES, {
              //   chatId: item.id,
              //   partnerName: item.user_name,
              //   partnerImage: item.user_image,
              // }
            }}>
            <LinearGradient
              colors={["#201648", "#7359D1"]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                height: 40,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                width:
                  WINDOW_WIDTH * 0.3 -
                  splitAppTheme.space["6"] * 0.3 -
                  splitAppTheme.space["3"] * 0.3,
              }}>
              <Text style={{color: "white"}}>Chat</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </>
  );

  return (
    <View style={{position: "relative", flex: 1}}>
      <FocusAwareStatusBar
        barStyle={"light-content"}
        backgroundColor={splitAppTheme.colors.secondary[600]}
      />

      <FlatList
        nestedScrollEnabled
        data={[{key: "body"}]}
        renderItem={() => {
          if (selectedIndex === 0) {
            return <PhotoList userId={profileData.id} isMine={isMyProfile} />;
          }

          return <ReviewList ownerId={profileData.id} />;
        }}
        onRefresh={handleRefresh}
        key={"profile-screen-list"}
        listKey={"profile-screen-list"}
        showsVerticalScrollIndicator={false}
        refreshing={isFetchingUserImages == 1}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={<View style={{height: 100}} />}
      />

      {isMyProfile && <AddUserPhotoBtn />}
    </View>
  );
};

export default ProfileScreen;
