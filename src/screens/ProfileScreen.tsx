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
import {RootStackParamList} from "@src/navigation";
import Feather from "react-native-vector-icons/Feather";
import {StackScreenProps} from "@react-navigation/stack";
import LinearGradient from "react-native-linear-gradient";
import {useDimensions} from "@react-native-community/hooks";
import {SafeAreaView} from "react-native-safe-area-context";
import useGetAuthDataQuery from "@hooks/useGetAuthDataQuery";
import useGetProfileQuery from "@hooks/auth/useGetProfileQuery";
import {useIsFetching, useQueryClient} from "@tanstack/react-query";
import ProfileImageUploader from "../components/ProfileImageUploader";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

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

  const ListHeaderComponent = (
    <React.Fragment>
      <LinearGradient
        end={{x: 0, y: 0}}
        start={{x: 0, y: 1}}
        colors={["#DF3BC0", "#472BBE"]}
        style={{
          height: 150,
          width: "100%",
        }}>
        <SafeAreaView>
          <TouchableOpacity
            style={{
              width: 50,
              padding: 15,
            }}
            onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={25} color={"white"} />
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>

      <View
        style={{
          marginTop: -75,
        }}>
        <ProfileImageUploader
          imageUrl={profileData.image}
          disabled={authData?.id !== profileData.id}
        />
      </View>

      <View
        style={{
          alignSelf: "center",
          alignItems: "center",
          marginBottom: splitAppTheme.space[3],
          paddingHorizontal:10
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
              navigation.navigate(RootStackRoutes.CUSTOMER, {
                screen: CustomerStackRoutes.CUSTOMER_MAIN_TAB,
                params: {
                  screen: CustomerMainBottomTabRoutes.CHAT_LIST,
                },
              });
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
    </React.Fragment>
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
            return (
              <PhotoList
                userId={profileData.id}
                isMine={authData?.id === profileData.id}
              />
            );
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

      {authData?.id === profileData.id && <AddUserPhotoBtn />}
    </View>
  );
};

export default ProfileScreen;
