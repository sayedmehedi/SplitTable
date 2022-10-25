import React from "react";
import styles from "./styles";
import EachBookingItem from "./EachBookingItem";
import {SceneMap, SceneRendererProps, TabView} from "react-native-tab-view";
import LinearGradient from "react-native-linear-gradient";
import {View, Text, StatusBar, HStack, Box, useToken} from "native-base";
import {FlatList, TouchableOpacity, useWindowDimensions} from "react-native";

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

const renderBookingItem = ({item}: any) => <EachBookingItem item={item} />;

const UpcomingBookingRoute = (props: SceneRendererProps) => {
  const p = useToken("space", "6");
  const mb = useToken("space", "4");

  const flatlistContentContainerStyle = React.useMemo(() => {
    return {
      padding: p,
    };
  }, [p]);

  const flatlistListheadercomponentStyle = React.useMemo(() => {
    return {
      marginBottom: mb,
    };
  }, [mb]);

  return (
    <FlatList
      data={bookingList}
      ItemSeparatorComponent={() => <Box h={"2.5"} />}
      contentContainerStyle={flatlistContentContainerStyle}
      ListHeaderComponentStyle={flatlistListheadercomponentStyle}
      ListHeaderComponent={
        <HStack justifyContent={"space-between"} space={"5"}>
          <Box flex={1}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => props.jumpTo("upcoming")}>
              <LinearGradient
                end={{x: 1, y: 0}}
                start={{x: 0, y: 0}}
                style={styles.linearGradient}
                colors={["#00C1FF", "#402B8C"]}>
                <Text
                  color={"white"}
                  fontSize={"md"}
                  fontWeight={"bold"}
                  fontFamily={"satoshi"}>
                  Upcomming
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Box>

          <Box flex={1}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => props.jumpTo("history")}>
              <LinearGradient
                end={{x: 1, y: 0}}
                start={{x: 0, y: 0}}
                style={styles.linearGradient}
                colors={["#00C1FF", "#402B8C"]}>
                <Text
                  color={"white"}
                  fontSize={"md"}
                  fontWeight={"bold"}
                  fontFamily={"satoshi"}>
                  History
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Box>
        </HStack>
      }
      renderItem={renderBookingItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

const HistoryBookingRoute = (props: SceneRendererProps) => {
  const p = useToken("space", "6");
  const mb = useToken("space", "4");

  const flatlistContentContainerStyle = React.useMemo(() => {
    return {
      padding: p,
    };
  }, [p]);

  const flatlistListheadercomponentStyle = React.useMemo(() => {
    return {
      marginBottom: mb,
    };
  }, [mb]);

  return (
    <FlatList
      data={bookingList}
      contentContainerStyle={flatlistContentContainerStyle}
      ListHeaderComponentStyle={flatlistListheadercomponentStyle}
      ListHeaderComponent={
        <HStack justifyContent={"space-between"} space={"5"}>
          <Box flex={1}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => props.jumpTo("upcoming")}>
              <LinearGradient
                end={{x: 1, y: 0}}
                start={{x: 0, y: 0}}
                style={styles.linearGradient}
                colors={["#00C1FF", "#402B8C"]}>
                <Text
                  color={"white"}
                  fontSize={"md"}
                  fontWeight={"bold"}
                  fontFamily={"satoshi"}>
                  Upcomming
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Box>

          <Box flex={1}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => props.jumpTo("history")}>
              <LinearGradient
                end={{x: 1, y: 0}}
                start={{x: 0, y: 0}}
                style={styles.linearGradient}
                colors={["#00C1FF", "#402B8C"]}>
                <Text
                  color={"white"}
                  fontSize={"md"}
                  fontWeight={"bold"}
                  fontFamily={"satoshi"}>
                  History
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Box>
        </HStack>
      }
      renderItem={renderBookingItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

const renderScene = SceneMap({
  upcoming: UpcomingBookingRoute,
  history: HistoryBookingRoute,
});

const BookingListScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([{key: "upcoming"}, {key: "history"}]);

  return (
    <TabView
      onIndexChange={setIndex}
      renderScene={renderScene}
      renderTabBar={() => null}
      navigationState={{index, routes}}
      initialLayout={{width: layout.width}}
    />
  );
};

export default BookingListScreen;
