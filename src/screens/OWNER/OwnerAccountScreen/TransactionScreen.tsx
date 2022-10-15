import {View, Text, FlatList, StyleSheet, ListRenderItem} from "react-native";
import React from "react";

const TransactionData = [
  {
    id: 1,
    dateTime: "24 June 12:00",
    clubName: "Ebc at night",
    tableName: "table Name",
    numberOfGuest: "6",
    status: "Cancelled",
    paymentType: "Credit Card",
    price: "$1315.30",
  },
  {
    id: 2,
    dateTime: "24 June 12:00",
    clubName: "Ebc at night",
    tableName: "table Name",
    numberOfGuest: "6",
    status: "Cancelled",
    paymentType: "Credit Card",
    price: "$1315.30",
  },
  {
    id: 3,
    dateTime: "24 June 12:00",
    clubName: "Ebc at night",
    tableName: "table Name",
    numberOfGuest: "6",
    status: "Cancelled",
    paymentType: "Credit Card",
    price: "$1315.30",
  },
  {
    id: 4,
    dateTime: "24 June 12:00",
    clubName: "Ebc at night",
    tableName: "table Name",
    numberOfGuest: "6",
    status: "Cancelled",
    paymentType: "Credit Card",
    price: "$1315.30",
  },
  {
    id: 5,
    dateTime: "24 June 12:00",
    clubName: "Ebc at night",
    tableName: "table Name",
    numberOfGuest: "6",
    status: "Cancelled",
    paymentType: "Credit Card",
    price: "$1315.30",
  },
  {
    id: 6,
    dateTime: "24 June 12:00",
    clubName: "Ebc at night",
    tableName: "table Name",
    numberOfGuest: "6",
    status: "Cancelled",
    paymentType: "Credit Card",
    price: "$1315.30",
  },
];

const renderTransactionList: ListRenderItem<{
  id: number;
  dateTime: string;
  clubName: string;
  tableName: string;
  numberOfGuest: string;
  status: string;
  paymentType: string;
  price: string;
}> = ({item}) => (
  <View
    key={item.id}
    style={{
      height: 100,
      width: "100%",
      borderWidth: 1,
      borderRadius: 8,
      marginVertical: 5,
      flexDirection: "row",
      alignItems: "center",
      borderColor: "#F1F1F1",
      paddingHorizontal: 20,
      backgroundColor: "white",
      justifyContent: "space-around",
    }}>
    <View style={{alignItems: "center"}}>
      <Text
        style={{
          fontFamily: "Satoshi-Regular",
          fontSize: 12,
          color: "#8A8D9F",
        }}>
        24
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: "#8A8D9F",
          fontFamily: "SatoshiVariable-Bold",
        }}>
        Jun
      </Text>
      <Text
        style={{
          fontSize: 12,
          color: "#8A8D9F",
          fontFamily: "Satoshi-Regular",
        }}>
        12:00
      </Text>
    </View>

    <View>
      <Text
        style={{
          fontSize: 14,
          color: "#262B2E",
          fontFamily: "SatoshiVariable-Bold",
        }}>
        {item.clubName}
      </Text>
      <View style={{flexDirection: "row", marginVertical: 4}}>
        <Text
          style={{
            fontSize: 12,
            color: "#8A8D9F",
            fontFamily: "Satoshi-Regular",
          }}>
          {item.tableName} |
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: "#8A8D9F",
            fontFamily: "Satoshi-Regular",
          }}>
          {" "}
          {item.numberOfGuest} Guest
        </Text>
      </View>
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <View style={styles.dot} />
        <Text
          style={{
            fontFamily: "Satoshi-Regular",
            fontSize: 10,
            color: "#FE2121",
          }}>
          {item.status}
        </Text>
      </View>
    </View>

    <View>
      <Text
        style={{
          fontFamily: "Satoshi-Regular",
          fontSize: 10,
          color: "#8A8D9F",
          alignSelf: "flex-end",
        }}>
        {item.paymentType}
      </Text>
      <Text
        style={{
          fontFamily: "SatoshiVariable-Bold",
          fontSize: 18,
          color: "#262B2E",
        }}>
        {item.price}
      </Text>
    </View>
  </View>
);

const TransactionScreen = () => {
  return (
    <View style={{backgroundColor: "white", flex: 1, padding: 10}}>
      <FlatList
        data={TransactionData}
        renderItem={renderTransactionList}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: "#FE2121",
  },
});

export default TransactionScreen;
