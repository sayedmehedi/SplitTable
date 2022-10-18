import {
  View,
  Text,
  StyleSheet,
  ListRenderItem,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import {MapIcon, TablePerson} from "@constants/iconPath";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EachBookingItem from "../OwnerBookingListScreen/EachBookingItem";

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

const OwnerTableScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: "#FFFFFF"}}>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "#FFFFFF",
        }}>
        <LinearGradient
          end={{x: 0, y: 0}}
          start={{x: 0, y: 1}}
          colors={["#DF3BC0", "#472BBE"]}
          style={{
            height: 180,
            width: "100%",
            paddingHorizontal: 20,
            justifyContent: "center",
          }}>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <View>
              <Text
                style={{
                  fontFamily: "SatoshiVariable-Bold",
                  fontSize: 20,
                  color: "#FFFFFF",
                }}>
                Welcome!
              </Text>
              <Text
                style={{
                  fontFamily: "SatoshiVariable-Bold",
                  fontSize: 16,
                  color: "#FFFFFF",
                }}>
                Jewel Night Club
              </Text>
            </View>
            <View
              style={{
                height: 45,
                width: 45,
                borderRadius: 45,
                backgroundColor: "rgba(255,255,255, 0.2)",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <View
                style={{
                  width: 17,
                  height: 17,
                  marginTop: -12,
                  borderRadius: 17,
                  marginBottom: -8,
                  marginRight: -25,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#402B8C",
                }}>
                <Text
                  style={{color: "white", fontWeight: "bold", fontSize: 10}}>
                  2
                </Text>
              </View>
              <MaterialIcons
                name="notifications-none"
                color={"white"}
                size={30}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 15,
            }}>
            <MapIcon height={16} width={16} color={"white"} />
            <Text
              style={{
                fontSize: 14,
                color: "white",
                marginLeft: 10,
                fontFamily: "Satoshi-Regular",
              }}>
              Nevada, Las Vegas
            </Text>
          </View>
        </LinearGradient>

        <View style={{flex: 1, padding: 20}}>
          <ImageBackground
            source={require("@assets/layout.jpg")}
            style={{
              height: 170,
              width: "100%",
              justifyContent: "flex-end",
            }}>
            <View
              style={{flexDirection: "row", justifyContent: "space-between"}}>
              <TouchableOpacity style={styles.buttonCotainer}>
                <AntDesign name="edit" size={15} color={"white"} />
                <Text style={{color: "white", marginLeft: 5}}>Manage</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonCotainer}>
                <AntDesign name="edit" size={15} color={"white"} />
                <Text style={{color: "white", marginLeft: 5}}>Manage</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>

          <FlatList
            data={tableData}
            renderItem={({item, separators}) => (
              <TouchableHighlight
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
                  <AntDesign name="edit" size={15} color={"#8A8D9F"} />
                </View>
              </TouchableHighlight>
            )}
          />

          <View
            style={{
              marginVertical: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Text
              style={{
                fontSize: 20,
                color: "#030819",
                fontFamily: "SatoshiVariable-Bold",
              }}>
              Upcomming Booking
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#262B2E",
                fontFamily: "Satoshi-Regular",
                textDecorationLine: "underline",
              }}>
              See all
            </Text>
          </View>

          <FlatList
            data={bookingList}
            renderItem={renderBookingItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonCotainer: {
    height: 35,
    width: 100,
    backgroundColor: "#00C1FF",
    flexDirection: "row",
    alignItems: "center",
    borderTopRightRadius: 10,
    justifyContent: "center",
  },
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
});

export default OwnerTableScreen;
