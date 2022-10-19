import React from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ImageBackground,
  ListRenderItem,
} from "react-native";
import {productData} from "@constants/dummy";
import {OwnerProfileStackRoutes} from "@constants/routes";
import Fontisto from "react-native-vector-icons/Fontisto";
import {StackScreenProps} from "@react-navigation/stack";
import AntDesign from "react-native-vector-icons/AntDesign";
import {CompositeScreenProps} from "@react-navigation/native";
import {MapIcon, Clock, DeleteIcon} from "@constants/iconPath";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {Swipeable, GestureHandlerRootView} from "react-native-gesture-handler";
import {
  RootStackParamList,
  OwnerStackParamList,
  OwnerBottomTabParamList,
  OwnerAccountStackParamList,
} from "@src/navigation";

type FavoriteScreenProps = CompositeScreenProps<
  CompositeScreenProps<
    CompositeScreenProps<
      StackScreenProps<
        OwnerAccountStackParamList,
        typeof OwnerProfileStackRoutes.FAVORITE
      >,
      BottomTabScreenProps<OwnerBottomTabParamList>
    >,
    StackScreenProps<OwnerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

const renderClubList: ListRenderItem<{
  id: string;
  location: string;
  name: string;
  rating: number;
  distance: string;
  uri: any;
}> = ({item}) => {
  const rightSwipeActions = () => {
    return (
      <Pressable
        onPress={() => {}}
        style={{
          justifyContent: "center",
          marginLeft: 20,
        }}>
        <DeleteIcon />
      </Pressable>
    );
  };
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={rightSwipeActions}>
        <View
          style={{
            flex: 1,
            height: 236,
            width: "100%",
            elevation: 15,
            marginBottom: 20,
            borderRadius: 15,
            shadowColor: "#D6D6D6",
            backgroundColor: "white",
          }}>
          <View style={{flex: 2}}>
            <ImageBackground
              source={item.uri}
              imageStyle={{borderTopLeftRadius: 15, borderTopRightRadius: 15}}
              style={{height: "100%", width: "100%"}}>
              <View
                style={{
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    height: 24,
                    width: 76,
                    backgroundColor: "white",
                    borderRadius: 15,
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <Text style={{color: "black"}}>4.5</Text>
                  <Fontisto name="star" color={"#FFC529"} size={16} />
                  <Text style={{color: "black"}}>(20)</Text>
                </View>

                <AntDesign name="hearto" size={22} color={"white"} />
              </View>
            </ImageBackground>
          </View>

          <View style={{flex: 1, justifyContent: "space-around", padding: 12}}>
            <Text
              style={{
                fontSize: 18,
                color: "#262B2E",
                fontFamily: "Satoshi-Medium",
              }}>
              {item.name}
            </Text>
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#E2E2E2",
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <MapIcon height={10} width={10} color={"#402B8C"} />
                <Text
                  style={{
                    color: "#8A8D9F",
                    fontFamily: "Satoshi-Regular",
                    fontSize: 12,
                    marginLeft: 5,
                  }}>
                  {item.location}
                </Text>
              </View>

              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Clock />
                <Text
                  style={{
                    color: "#8A8D9F",
                    fontFamily: "Satoshi-Regular",
                    fontSize: 12,
                    marginLeft: 10,
                  }}>
                  Open 10.00am-5.00pm
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const FavoriteScreen = ({}: FavoriteScreenProps) => {
  return (
    <View style={{padding: 20, backgroundColor: "white"}}>
      <FlatList data={productData} renderItem={renderClubList} />
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    width: 54,
    height: 22,
    marginRight: 8,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDF2EE",
  },
});

export default FavoriteScreen;
