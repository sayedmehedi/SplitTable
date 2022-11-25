import React from "react";
import {splitAppTheme} from "@src/theme";
import FastImage from "react-native-fast-image";
import {RedMap, MapIcon} from "@constants/iconPath";
import {View, Text, StyleSheet} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";

const EachItem = ({item}: any) => {
  return (
    <View
      style={{
        height: 236,
        width: "100%",
        backgroundColor: "white",
        flex: 1,

        borderRadius: 15,
        shadowColor: "#D6D6D6",

        elevation: 15,
        marginBottom: 20,
      }}>
      <View style={{flex: 2}}>
        <FastImage
          source={item.uri}
          style={{
            height: "100%",
            width: "100%",
            borderTopLeftRadius: splitAppTheme.radii["2xl"],
            borderTopRightRadius: splitAppTheme.radii["2xl"],
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
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

            <View style={{flexDirection: "row", alignItems: "center"}}>
              <AntDesign name="hearto" size={22} color={"white"} />

              <View
                style={{
                  flexDirection: "row",
                  height: 24,
                  width: 76,
                  backgroundColor: "white",
                  borderRadius: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 5,
                }}>
                <RedMap height={16} width={16} />
                <Text style={{color: "black"}}>1.5KM</Text>
              </View>
            </View>
          </View>
        </FastImage>
      </View>

      <View style={{flex: 1, justifyContent: "space-around", padding: 12}}>
        <Text
          style={{
            fontFamily: "Satoshi-Medium",
            color: "#262B2E",
            fontSize: 18,
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

          <View style={{flexDirection: "row"}}>
            <Text>icon</Text>
            <Text
              style={{
                color: "#8A8D9F",
                fontFamily: "Satoshi-Regular",
                fontSize: 12,
                marginLeft: 5,
              }}>
              Open 10.00am-5.00pm
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    width: 54,
    height: 22,
    backgroundColor: "#FDF2EE",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
});

export default EachItem;
