import {View, Text, Image, StyleSheet} from "react-native";
import React from "react";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import {RedMap, MapIcon} from "../../@constants/iconPath";

const EachNearByItem = ({item}) => {
  return (
    <View
      style={{
        height: 100,
        width: "100%",

        flexDirection: "row",
        marginVertical: 10,
      }}>
      <Image
        source={item.uri}
        style={{
          height: 100,
          width: 100,
          borderRadius: 8,
        }}
      />
      <View style={{paddingLeft: 10, justifyContent: "space-between"}}>
        <Text
          style={{
            fontFamily: "Satoshi-Medium",
            color: "#262B2E",
            fontSize: 18,
          }}>
          {item.name}
        </Text>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <MapIcon height={10} width={10} style={{color: "#402B8C"}} />
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
          <MapIcon height={10} width={10} style={{color: "#402B8C"}} />
          <Text
            style={{
              color: "#8A8D9F",
              fontFamily: "Satoshi-Regular",
              fontSize: 12,
              marginLeft: 5,
            }}>
            2.3KM
          </Text>
        </View>

        <View style={{flexDirection: "row"}}>
          <Text style={{color: "black"}}>4.5</Text>
          <Fontisto name="star" color={"#FFC529"} size={16} />
          <Text style={{color: "black"}}>(20)</Text>
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

export default EachNearByItem;
