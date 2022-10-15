import React from "react";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import {SafeAreaView} from "react-native-safe-area-context";
import {useDimensions} from "@react-native-community/hooks";
import {TouchableOpacity} from "react-native-gesture-handler";
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  ListRenderItem,
} from "react-native";

const screenWidth = Dimensions.get("screen").width;

const photoStory = [
  {
    id: 1,
    uri: "https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111-1500x1000.jpg",
    like: "33",
    disLike: "12",
  },
  {
    id: 2,
    uri: "https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111-1500x1000.jpg",
    like: "33",
    disLike: "12",
  },
  {
    id: 3,
    uri: "https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111-1500x1000.jpg",
    like: "33",
    disLike: "12",
  },
  {
    id: 4,
    uri: "https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111-1500x1000.jpg",
    like: "33",
    disLike: "12",
  },
  {
    id: 5,
    uri: "https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111-1500x1000.jpg",
    like: "33",
    disLike: "12",
  },
  {
    id: 6,
    uri: "https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111-1500x1000.jpg",
    like: "33",
    disLike: "12",
  },
  {
    id: 7,
    uri: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
    like: "33",
    disLike: "12",
  },
  {
    id: 8,
    uri: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
    like: "33",
    disLike: "12",
  },
  {
    id: 9,
    uri: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
    like: "33",
    disLike: "12",
  },
  {
    id: 10,
    uri: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
    like: "33",
    disLike: "12",
  },
  {
    id: 11,
    uri: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
    like: "33",
    disLike: "12",
  },
];

const renderAllStory: ListRenderItem<{
  id: number;
  uri: string;
  like: string;
  disLike: string;
}> = ({item}) => (
  <View style={{margin: 3}}>
    <Image
      source={{uri: item.uri}}
      style={{
        height: 100,
        width: screenWidth / 3 - 10,
      }}
    />
  </View>
);

const ProfileScreen = () => {
  const {
    screen: {width: screenWidth},
  } = useDimensions();

  return (
    <View>
      <LinearGradient
        colors={["#DF3BC0", "#472BBE"]}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={{
          height: 150,
          width: "100%",
        }}>
        <SafeAreaView>
          <TouchableOpacity
            style={{
              width: 50,
              padding: 15,
            }}>
            <Feather name="chevron-left" size={25} color={"white"} />
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
      <TouchableOpacity
        style={{
          width: 155,
          padding: 5,
          height: 155,
          marginTop: -75,
          borderRadius: 78,
          alignSelf: "center",
          alignItems: "center",
          backgroundColor: "white",
          justifyContent: "center",
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
          John Smith
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#8A8D9F",
            fontFamily: "Satoshi-Regular",
          }}>
          Las Vegas, NV 89109
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 30,
          marginVertical: 10,
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
            <Text style={{color: "white"}}>2</Text>
          </LinearGradient>
          <Text>Books</Text>
        </View>

        <View style={{alignItems: "center"}}>
          <LinearGradient
            end={{x: 0, y: 0}}
            start={{x: 0, y: 1}}
            colors={["#402BBC", "#00C1FF"]}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Text style={{color: "white"}}>23</Text>
          </LinearGradient>
          <Text>Reviews</Text>
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
            <Text style={{color: "white"}}>2</Text>
          </LinearGradient>
          <Text>Photos</Text>
        </View>
      </View>

      <View
        style={{
          marginVertical: 10,
          flexDirection: "row",
          paddingHorizontal: 10,
          justifyContent: "space-between",
        }}>
        <LinearGradient
          colors={["#472BBE", "#DF3BC0"]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            height: 40,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            width: screenWidth / 3 - 10,
          }}>
          <Text style={{color: "white"}}>Photo Store</Text>
        </LinearGradient>

        <LinearGradient
          end={{x: 0, y: 0}}
          start={{x: 0, y: 1}}
          colors={["#402BBC", "#00C1FF"]}
          style={{
            height: 40,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            width: screenWidth / 3 - 10,
          }}>
          <Text style={{color: "white"}}>Reviews</Text>
        </LinearGradient>

        <LinearGradient
          end={{x: 1, y: 0}}
          start={{x: 0, y: 0}}
          colors={["#201648", "#7359D1"]}
          style={{
            height: 40,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            width: screenWidth / 3 - 10,
          }}>
          <Text style={{color: "white"}}>Chat</Text>
        </LinearGradient>
      </View>

      <View style={{alignItems: "center"}}>
        <FlatList
          numColumns={3}
          data={photoStory}
          renderItem={renderAllStory}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
