import {View, Text, Image} from "react-native";
import React from "react";

const EachBookingItem = ({
  item,
}: {
  item: {
    id: number;
    dateTime: string;
    totalGuest: string;
    totalPrice: string;
    name: string;
    tableName: string;
    status: string;
  };
}) => {
  return (
    <View
      style={{
        height: 100,
        width: "100%",
        borderRadius: 8,
        backgroundColor: "white",
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#F1F1F1",
        justifyContent: "space-around",
        paddingHorizontal: 20,
      }}
      key={item.id}>
      <Image
        style={{
          height: 65,
          width: 65,
          borderRadius: 65,
        }}
        source={{
          uri: "https://www.tripsavvy.com/thmb/gauQCVHTK9uk1QZYdM4k2UeRBO8=/640x427/filters:fill(auto,1)/club-56a3e8683df78cf7727fcf6d.jpg",
        }}
      />

      <View>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Text
            style={{
              fontFamily: "Satoshi-Regular",
              fontSize: 12,
              color: "#8A8D9F",
            }}>
            {item.dateTime}
          </Text>
          <View
            style={{
              height: 8,
              width: 8,
              borderRadius: 4,
              backgroundColor: "#00C1FF",
              marginHorizontal: 5,
            }}
          />
          <Text
            style={{
              fontFamily: "Satoshi-Regular",
              fontSize: 13,
              color: "#8A8D9F",
              marginHorizontal: 5,
            }}>
            {item.totalGuest} Guest
          </Text>
          <Text
            style={{
              fontFamily: "SatoshiVariable-Bold",
              fontSize: 13,
              color: "#00C1FF",
            }}>
            {item.totalPrice}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "SatoshiVariable-Bold",
            fontSize: 15,
            color: "#262B2E",
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            fontFamily: "Satoshi-Regular",
            fontSize: 12,
            color: "#8A8D9F",
          }}>
          {item.tableName}
        </Text>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <View
            style={{
              height: 8,
              width: 8,
              backgroundColor: "#1DBF73",
              borderRadius: 8,
            }}
          />
          <Text
            style={{
              color: "#1DBF73",
              fontFamily: "Satoshi-Regular",
              fontSize: 12,
              marginHorizontal: 5,
            }}>
            {item.status}
          </Text>
          <Text
            style={{
              color: "#00C1FF",
              fontFamily: "Satoshi-Regular",
              fontSize: 12,
              textDecorationLine: "underline",
              marginHorizontal: 5,
            }}>
            Add Review
          </Text>
          <Text
            style={{
              color: "#FE2121",
              fontFamily: "Satoshi-Regular",
              fontSize: 12,
              textDecorationLine: "underline",
            }}>
            Cancel
          </Text>
        </View>
      </View>
    </View>
  );
};

export default EachBookingItem;
