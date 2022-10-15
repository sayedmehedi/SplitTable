import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import {TablePerson} from "@constants/iconPath";
import Ionicons from "react-native-vector-icons/Ionicons";

const tableData = [
  {
    id: 1,
    tableName: "Table Name 1",
    setAvailable: "6/6",
    pricePerGuest: "$607.00",
  },
  {
    id: 2,
    tableName: "Table Name 2",
    setAvailable: "6/6",
    pricePerGuest: "$607.00",
  },
  {
    id: 3,
    tableName: "Table Name 3",
    setAvailable: "6/6",
    pricePerGuest: "$607.00",
  },
  {
    id: 4,
    tableName: "Table Name 4",
    setAvailable: "6/6",
    pricePerGuest: "$607.00",
  },
  {
    id: 5,
    tableName: "Table Name 5",
    setAvailable: "6/6",
    pricePerGuest: "$607.00",
  },
  {
    id: 6,
    tableName: "Table Name 6",
    setAvailable: "6/6",
    pricePerGuest: "$607.00",
  },
  {
    id: 7,
    tableName: "Table Name 7",
    setAvailable: "6/6",
    pricePerGuest: "$607.00",
  },
  {
    id: 8,
    tableName: "Table Name 8",
    setAvailable: "6/6",
    pricePerGuest: "$607.00",
  },
  {
    id: 9,
    tableName: "Table Name 9",
    setAvailable: "6/6",
    pricePerGuest: "$607.00",
  },
  {
    id: 10,
    tableName: "Table Name 10",
    setAvailable: "6/6",
    pricePerGuest: "$607.00",
  },
];
const SelectTableScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Image
        source={require("@assets/layout.jpg")}
        style={{
          height: 170,
          width: "100%",
        }}
      />

      <View style={{padding: 15, backgroundColor: "white", flex: 1}}>
        <FlatList
          data={tableData}
          renderItem={({item, index, separators}) => (
            <TouchableHighlight
              key={item.key}
              onPress={() => {}}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
              <View style={styles.tableContainer}>
                <View>
                  <Text>{item.tableName}</Text>
                  <View style={{flexDirection: "row", alignItems: "center"}}>
                    <TablePerson />
                    <Text>{item.setAvailable}</Text>

                    <Text>Icon</Text>
                    <Text>{item.pricePerGuest}</Text>
                  </View>
                </View>
                <Ionicons
                  name="ios-checkmark-circle"
                  size={22}
                  color={"green"}
                />
              </View>
            </TouchableHighlight>
          )}
        />
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
          onPress={() => navigation.navigate("guestAndOffer")}
          style={styles.continueButton}>
          <Text style={{color: "#FF3FCB"}}>Continue</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    height: 60,
    width: "100%",
    borderColor: "#C7C7C7",
    borderWidth: 0.7,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: "white",
    marginVertical: 5,
    alignItems: "center",
  },
  continueButton: {
    height: 50,
    width: 130,
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SelectTableScreen;
