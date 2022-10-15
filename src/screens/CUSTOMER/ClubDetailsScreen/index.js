import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import React from "react";
import {MapIcon} from "../../@constants/iconPath";
import EachOfferMenuItem from "./EachOfferMenuItem";
import {productData} from "../../@constants/dummy";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import {SafeAreaView} from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";

const screenWidth = Dimensions.get("screen").width;

const renderOfferMenu = ({item}) => <EachOfferMenuItem item={item} />;
const ClubDetailsScreen = ({navigation}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flex: 1}}>
        <ImageBackground
          style={{
            height: 300,
            width: "100%",
          }}
          source={require("../../@assets/images/img3.jpg")}>
          <SafeAreaView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 15,
              }}>
              <FontAwesome5 name="chevron-left" size={25} color={"white"} />

              <View style={{flexDirection: "row"}}>
                <AntDesign name="sharealt" size={25} color={"white"} />
                <View
                  style={{
                    height: 28,
                    width: 28,
                    borderRadius: 28,
                    backgroundColor: "#707070",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 6,
                  }}>
                  <AntDesign name="heart" size={15} color={"white"} />
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>

        <View
          style={{
            paddingHorizontal: 15,
            backgroundColor: "rgba(255,255,255,0.1)",
            flex: 1,
          }}>
          <View
            style={{
              height: 135,
              width: "100%",
              backgroundColor: "#FFFFFF",
              marginTop: -70,
              borderRadius: 20,
              padding: 15,
            }}>
            <Text
              style={{
                fontFamily: "SatoshiVariable-Bold",
                fontSize: 20,
                color: "#030819",
              }}>
              Omania Nightclub
            </Text>

            <View
              style={{
                flexDirection: "row",

                width: "70%",
                marginVertical: 10,
              }}>
              <MapIcon height={10} width={10} style={{color: "#402B8C"}} />
              <Text
                style={{
                  fontFamily: "Satoshi-Regular",
                  fontSize: 12,
                  color: "#030819",
                  marginLeft: 10,
                }}>
                3799 S Las Vegas Blvd, Las Vegas, NV 89109,United States
              </Text>
            </View>
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#DDDDDD",
              }}
            />
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Text>icon</Text>
              <Text
                style={{
                  fontFamily: "Satoshi-Regular",
                  fontSize: 12,
                  color: "#030819",
                  marginLeft: 10,
                }}>
                Open 10:00AM - 05:00PM
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("booking")}
            style={styles.bookButton}>
            <Text
              style={{
                fontFamily: "SatoshiVariable-Bold",
                fontSize: 20,
                color: "#FF3FCB",
              }}>
              Book a Table
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <LinearGradient
              colors={["#472BBE", "#DF3BC0"]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                height: 40,
                width: screenWidth / 3 - 15,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}>
              <Text style={{color: "white"}}>Offer Menu</Text>
            </LinearGradient>

            <LinearGradient
              colors={["#402BBC", "#00C1FF"]}
              start={{x: 0, y: 1}}
              end={{x: 0, y: 0}}
              style={{
                height: 40,
                width: screenWidth / 3 - 15,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}>
              <Text style={{color: "white"}}>Reviews</Text>
            </LinearGradient>

            <LinearGradient
              colors={["#201648", "#7359D1"]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                height: 40,
                width: screenWidth / 3 - 15,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}>
              <Text style={{color: "white"}}>Information</Text>
            </LinearGradient>
          </View>

          <View style={{flex: 1, backgroundColor: "rgba(255,255,255,0.1)"}}>
            <FlatList
              data={productData}
              renderItem={renderOfferMenu}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bookButton: {
    height: 50,
    width: "100%",
    borderWidth: 3,
    borderColor: "#FF3FCB",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
});

export default ClubDetailsScreen;
