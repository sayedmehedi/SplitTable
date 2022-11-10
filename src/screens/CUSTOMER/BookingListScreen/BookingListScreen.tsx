import React from "react";
import styles from "./styles";
import {splitAppTheme} from "@src/theme";
import EachBookingItem from "./EachBookingItem";
import LinearGradient from "react-native-linear-gradient";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import {SceneMap, SceneRendererProps, TabView} from "react-native-tab-view";

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
  const flatlistContentContainerStyle = React.useMemo(() => {
    return {
      padding: splitAppTheme.space[6],
    };
  }, [splitAppTheme.space[6]]);

  const flatlistListheadercomponentStyle = React.useMemo(() => {
    return {
      marginBottom: splitAppTheme.space[4],
    };
  }, [splitAppTheme.space[4]]);

  return (
    <FlatList
      data={bookingList}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: splitAppTheme.sizes["2.5"],
          }}
        />
      )}
      contentContainerStyle={flatlistContentContainerStyle}
      ListHeaderComponentStyle={flatlistListheadercomponentStyle}
      ListHeaderComponent={
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => props.jumpTo("upcoming")}>
              <LinearGradient
                end={{x: 1, y: 0}}
                start={{x: 0, y: 0}}
                style={styles.linearGradient}
                colors={["#00C1FF", "#402B8C"]}>
                <Text
                  style={{
                    color: splitAppTheme.colors.white,
                    fontSize: splitAppTheme.fontSizes.md,
                    fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                  }}>
                  Upcomming
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              marginLeft: splitAppTheme.space[5],
            }}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => props.jumpTo("history")}>
              <LinearGradient
                end={{x: 1, y: 0}}
                start={{x: 0, y: 0}}
                style={styles.linearGradient}
                colors={["#00C1FF", "#402B8C"]}>
                <Text
                  style={{
                    color: splitAppTheme.colors.white,
                    fontSize: splitAppTheme.fontSizes.md,
                    fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                  }}>
                  History
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      }
      renderItem={renderBookingItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

const HistoryBookingRoute = (props: SceneRendererProps) => {
  const flatlistContentContainerStyle = React.useMemo(() => {
    return {
      padding: splitAppTheme.space[6],
    };
  }, [splitAppTheme.space[6]]);

  const flatlistListheadercomponentStyle = React.useMemo(() => {
    return {
      marginBottom: splitAppTheme.space[4],
    };
  }, [splitAppTheme.space[4]]);

  return (
    <FlatList
      data={bookingList}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: splitAppTheme.sizes["2.5"],
          }}
        />
      )}
      contentContainerStyle={flatlistContentContainerStyle}
      ListHeaderComponentStyle={flatlistListheadercomponentStyle}
      ListHeaderComponent={
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => props.jumpTo("upcoming")}>
              <LinearGradient
                end={{x: 1, y: 0}}
                start={{x: 0, y: 0}}
                style={styles.linearGradient}
                colors={["#00C1FF", "#402B8C"]}>
                <Text
                  style={{
                    color: splitAppTheme.colors.white,
                    fontSize: splitAppTheme.fontSizes.md,
                    fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                  }}>
                  Upcomming
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              marginLeft: splitAppTheme.space[5],
            }}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => props.jumpTo("history")}>
              <LinearGradient
                end={{x: 1, y: 0}}
                start={{x: 0, y: 0}}
                style={styles.linearGradient}
                colors={["#00C1FF", "#402B8C"]}>
                <Text
                  style={{
                    color: splitAppTheme.colors.white,
                    fontSize: splitAppTheme.fontSizes.md,
                    fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                  }}>
                  History
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
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