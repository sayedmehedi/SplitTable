import {View, Text, FlatList, Image, StyleSheet} from "react-native";
import React from "react";
import {productData} from "@constants/dummy";
import {TouchableOpacity} from "react-native-gesture-handler";
import Entypo from "react-native-vector-icons/Entypo";
import LinearGradient from "react-native-linear-gradient";
const renderOfferMenu = ({item}) => (
  <View
    style={{
      height: 100,
      width: "100%",

      flexDirection: "row",

      backgroundColor: "rgba(255,255,255,0.9)",
      marginVertical: 10,
    }}>
    <Image
      source={item.uri}
      style={{
        height: 100,
        width: 100,
      }}
    />
    <View style={{padding: 5, justifyContent: "space-between", flex: 1}}>
      <Text
        style={{
          fontFamily: "Satoshi-Medium",
          color: "#262B2E",
          fontSize: 18,
        }}>
        {item.name}
      </Text>
      <View style={{flex: 1}}>
        <Text
          numberOfLines={2}
          style={{
            fontFamily: "Satoshi-Regular",
            fontSize: 10,
            color: "#8A8D9F",
          }}>
          Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
          laying out print dfisdjfsdoifjdsd dsfdsf k fsdfsdjfdkf dsfsd fk,
        </Text>
      </View>

      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <Text
          style={{
            fontFamily: "SatoshiVariable-Bold",
            fontSize: 12,
            color: "#00C1FF",
          }}>
          Price: $2123
        </Text>

        <View style={{flexDirection: "row", alignItems: "center"}}>
          <TouchableOpacity
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(64,43,140,0.1)",
            }}>
            <Entypo name="minus" size={8} color={"#402B8C"} />
          </TouchableOpacity>
          <Text style={{marginHorizontal: 10}}>0</Text>
          <TouchableOpacity
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(64,43,140,0.9)",
            }}>
            <Entypo name="plus" size={10} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);
const AddMenuItemScreen = ({navigation}) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(255,255,255,0.7)",
          padding: 20,
        }}>
        <FlatList data={productData} renderItem={renderOfferMenu} />
      </View>
      <LinearGradient
        colors={["#402B8C", "#FF3FCB"]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          height: 70,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          position: "absolute",
          bottom: 0,
        }}>
        <Text
          style={{
            fontFamily: "Satoshi-Medium",
            color: "white",
            fontSize: 16,
          }}>
          Tue, 17 Jun,10:30am
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("bookingDetails")}
          style={styles.continueButton}>
          <Text style={{color: "#FF3FCB"}}>Continue</Text>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  continueButton: {
    height: 50,
    width: 130,
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddMenuItemScreen;
