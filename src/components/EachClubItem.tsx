import React from "react";
import {useNavigation} from "@react-navigation/native";
import {RedMap, MapIcon} from "@constants/iconPath";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import {View, Text, ImageBackground, StyleSheet, Pressable} from "react-native";

const EachClubItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("clubDetails")}
      style={{
        height: 238,
        width: 266,
        backgroundColor: "white",
        flex: 1,
        margin: 10,
        borderRadius: 15,
        shadowColor: "#D6D6D6",

        elevation: 15,
        marginBottom: 20,
      }}>
      <View style={{flex: 1.5}}>
        <ImageBackground
          source={item.uri}
          imageStyle={{borderTopLeftRadius: 15, borderTopRightRadius: 15}}
          style={{height: "100%", width: "100%"}}>
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
        </ImageBackground>
      </View>

      <View
        style={{flex: 1, justifyContent: "space-around", paddingHorizontal: 8}}>
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
          <View style={styles.menuContainer}>
            <Text
              style={{
                color: "#FF3FCB",
                fontFamily: "Satoshi-Regular",
                fontSize: 12,
              }}>
              Bottle
            </Text>
          </View>
          <View
            style={[
              styles.menuContainer,
              {backgroundColor: "rgba(255,188,0,0.2)"},
            ]}>
            <Text
              style={{
                color: "#402B8C",
                fontFamily: "Satoshi-Regular",
                fontSize: 12,
              }}>
              Bubbles
            </Text>
          </View>
          <View
            style={[
              styles.menuContainer,
              {backgroundColor: "rgba(29,191,115,0.2)"},
            ]}>
            <Text
              style={{
                color: "#00C1FF",
                fontFamily: "Satoshi-Regular",
                fontSize: 12,
              }}>
              Beer
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
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

export default EachClubItem;
