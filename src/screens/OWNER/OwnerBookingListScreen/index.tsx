import React from "react";
import styles from "./styles";
import EachBookingItem from "./EachBookingItem";
import LinearGradient from "react-native-linear-gradient";
import {TouchableOpacity} from "react-native-gesture-handler";
import {View, Text, FlatList, StatusBar, ListRenderItem} from "react-native";

const bookingList = [
  {
    id: 1,
    dateTime: "24 Jun, 12:30",
    totalGuest: "5",
    totalPrice: "$1315.30",
    name: "Ebc at night",
    tableName: "Table name 1",
    status: "upcomming",
  },
  {
    id: 2,
    dateTime: "24 Jun, 12:30",
    totalGuest: "5",
    totalPrice: "$1315.30",
    name: "Ebc at night",
    tableName: "Table name 1",
    status: "upcomming",
  },
  {
    id: 3,
    dateTime: "24 Jun, 12:30",
    totalGuest: "5",
    totalPrice: "$1315.30",
    name: "Ebc at night",
    tableName: "Table name 1",
    status: "upcomming",
  },
  {
    id: 4,
    dateTime: "24 Jun, 12:30",
    totalGuest: "5",
    totalPrice: "$1315.30",
    name: "Ebc at night",
    tableName: "Table name 1",
    status: "upcomming",
  },
  {
    id: 5,
    dateTime: "24 Jun, 12:30",
    totalGuest: "5",
    totalPrice: "$1315.30",
    name: "Ebc at night",
    tableName: "Table name 1",
    status: "upcomming",
  },
  {
    id: 6,
    dateTime: "24 Jun, 12:30",
    totalGuest: "5",
    totalPrice: "$1315.30",
    name: "Ebc at night",
    tableName: "Table name 1",
    status: "upcomming",
  },
  {
    id: 7,
    dateTime: "24 Jun, 12:30",
    totalGuest: "5",
    totalPrice: "$1315.30",
    name: "Ebc at night",
    tableName: "Table name 1",
    status: "upcomming",
  },
  {
    id: 8,
    dateTime: "24 Jun, 12:30",
    totalGuest: "5",
    totalPrice: "$1315.30",
    name: "Ebc at night",
    tableName: "Table name 1",
    status: "upcomming",
  },
];

const renderBookingItem: ListRenderItem<{
  id: number;
  dateTime: string;
  totalGuest: string;
  totalPrice: string;
  name: string;
  tableName: string;
  status: string;
}> = ({item}) => <EachBookingItem item={item} />;

const OwnerBookingListScreen = () => {
  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <View style={{padding: 10, backgroundColor: "#FFFFFF", flex: 1}}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
          }}>
          <TouchableOpacity style={styles.buttonContainer}>
            <LinearGradient
              colors={["#00C1FF", "#402B8C"]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  fontFamily: "SatoshiVariable-Bold",
                }}>
                Upcomming
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonContainer}>
            <LinearGradient
              colors={["#00C1FF", "#402B8C"]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  fontFamily: "SatoshiVariable-Bold",
                }}>
                History
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={{paddingHorizontal: 10}}>
          <FlatList
            data={bookingList}
            renderItem={renderBookingItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </>
  );
};

export default OwnerBookingListScreen;
