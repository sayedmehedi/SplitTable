import React from "react";
import ChatList from "./ChatList";
import PhotoList from "./PhotoList";
import ReviewList from "./ReviewList";
import {splitAppTheme} from "@src/theme";
import useAppToast from "@hooks/useAppToast";
import {QueryKeys} from "@constants/query-keys";
import {isCustomerProfile} from "@utils/profile";
import {CustomerStackRoutes} from "@constants/routes";
import Feather from "react-native-vector-icons/Feather";
import {StackScreenProps} from "@react-navigation/stack";
import LinearGradient from "react-native-linear-gradient";
import {useDimensions} from "@react-native-community/hooks";
import {SafeAreaView} from "react-native-safe-area-context";
import {CompositeScreenProps} from "@react-navigation/native";
import useGetProfileQuery from "@hooks/auth/useGetProfileQuery";
import {useIsFetching, useQueryClient} from "@tanstack/react-query";
import {View, Text, Image, FlatList, TouchableOpacity} from "react-native";
import {RootStackParamList, CustomerStackParamList} from "@src/navigation";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

type ProfileScreenProps = CompositeScreenProps<
  StackScreenProps<CustomerStackParamList, typeof CustomerStackRoutes.PROFILE>,
  StackScreenProps<RootStackParamList>
>;

const ProfileScreen = ({navigation}: ProfileScreenProps) => {
  const toast = useAppToast();
  const queryClient = useQueryClient();
  const pagerRef = React.useRef<FlatList>(null!);

  const isFetchingUserImages = useIsFetching({
    queryKey: [QueryKeys.IMAGE],
  });

  const {
    window: {width: WINDOW_WIDTH},
  } = useDimensions();

  const {data: profileData, isLoading} = useGetProfileQuery({
    onError(error) {
      toast.error(error.non_field_error);
    },
  });

  const handlePager = (index: number) => {
    pagerRef?.current?.scrollToOffset({
      animated: true,
      offset: WINDOW_WIDTH * index,
    });
  };

  const handleRefresh = async () => {
    await queryClient.refetchQueries([QueryKeys.IMAGE]);
  };

  if (isLoading || !isCustomerProfile(profileData)) {
    return <Text>Loading..</Text>;
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

      <TouchableOpacity
        style={{
          padding: 5,
          width: 155,
          height: 155,
          marginTop: -75,
          borderRadius: 78,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}>
        <Image
          style={{height: 150, width: 150, borderRadius: 75}}
          source={{
            uri: "https://images.pexels.com/photos/1391495/pexels-photo-1391495.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          }}
        />
      </TouchableOpacity>

      <View style={{alignSelf: "center", alignItems: "center"}}>
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
            fontSize: 14,
            color: "#8A8D9F",
            fontFamily: "Satoshi-Regular",
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
            colors={["#DF3BC0", "#472BBE"]}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
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
          justifyContent: "space-between",
          paddingHorizontal: splitAppTheme.space[6],
        }}>
        <TouchableOpacity onPress={() => handlePager(0)}>
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
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePager(1)}>
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
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePager(2)}>
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
      </View>
    </React.Fragment>
  );

  const ListFooterComponent = (
    <FlatList
      horizontal
      pagingEnabled
      ref={pagerRef}
      listKey={"pager"}
      showsHorizontalScrollIndicator={false}
      data={[{key: "photos"}, {key: "reviews"}, {key: "chat"}]}
      renderItem={({item}) => {
        switch (item.key) {
          case "photos":
            return <PhotoList />;

          case "reviews":
            return <ReviewList />;

          default:
            return <ChatList />;
        }
      }}
    />
  );

  return (
    <View>
      <FlatList
        data={[]}
        renderItem={() => null}
        onRefresh={handleRefresh}
        key={"profile-screen-list"}
        listKey={"profile-screen-list"}
        showsVerticalScrollIndicator={false}
        refreshing={isFetchingUserImages == 1}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        // ListFooterComponentStyle={{
        //   height: WINDOW_HEIGHT,
        // }}
        keyExtractor={(_, i) => i.toString()}
      />
    </View>
  );
};

export default ProfileScreen;
