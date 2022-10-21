import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import {productData} from "@constants/dummy";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AppGradientButton from "@components/AppGradientButton";

const renderOfferMenu = ({item, index}) => {
  if (index <= 1) {
    return (
      <View
        style={{
          height: 60,
          width: "100%",

          flexDirection: "row",

          backgroundColor: "rgba(255,255,255,0.9)",
          marginVertical: 5,
        }}>
        <Image
          source={item.uri}
          style={{
            height: 50,
            width: 50,
          }}
        />
        <View
          style={{
            padding: 5,
            justifyContent: "space-between",
            flex: 1,
            flexDirection: "row",
          }}>
          <View>
            <Text
              style={{
                fontFamily: "Satoshi-Medium",
                color: "#262B2E",
                fontSize: 18,
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                fontFamily: "SatoshiVariable-Bold",
                fontSize: 12,
                color: "#00C1FF",
              }}>
              Price: $2123
            </Text>
          </View>

          <View style={{flexDirection: "row", alignItems: "center"}}>
            <TouchableOpacity
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(64,43,140,0.1)",
              }}>
              <Entypo name="minus" size={8} color={"#402B8C"} />
            </TouchableOpacity>
            <Text style={{marginHorizontal: 10}}>0</Text>
            <TouchableOpacity
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(64,43,140,0.9)",
              }}>
              <Entypo name="plus" size={10} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};
const BookingDetailsScreen = ({navigation}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flex: 1}}>
        <ImageBackground
          style={{
            height: 300,
            width: "100%",
          }}
          source={require("@assets/images/book-details.jpg")}>
          <SafeAreaView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 15,
                alignItems: "center",
              }}>
              <FontAwesome5 name="chevron-left" size={25} color={"white"} />
              <Text
                style={{
                  fontFamily: "SatoshiVariable-Bold",
                  fontSize: 22,
                  color: "#FFFFFF",
                }}>
                Booking Details
              </Text>

              <View></View>
            </View>
          </SafeAreaView>
          <View style={{padding: 15}}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 5,
              }}>
              <Text
                style={{
                  fontFamily: "SatoshiVariable-Bold",
                  fontSize: 14,
                  color: "#FFFFFF",
                }}>
                Club/Bar Name
              </Text>
              <Text
                style={{
                  fontFamily: "SatoshiVariable-Bold",
                  fontSize: 14,
                  color: "#FFFFFF",
                }}>
                Omania Nightclub
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 5,
              }}>
              <Text
                style={{
                  fontFamily: "SatoshiVariable-Bold",
                  fontSize: 14,
                  color: "#FFFFFF",
                }}>
                Number of Guest:
              </Text>
              <Text
                style={{
                  fontFamily: "SatoshiVariable-Bold",
                  fontSize: 14,
                  color: "#FFFFFF",
                }}>
                3
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 5,
              }}>
              <Text
                style={{
                  fontFamily: "SatoshiVariable-Bold",
                  fontSize: 14,
                  color: "#FFFFFF",
                }}>
                Table:
              </Text>
              <Text
                style={{
                  fontFamily: "SatoshiVariable-Bold",
                  fontSize: 14,
                  color: "#FFFFFF",
                }}>
                Table Name 3
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 5,
              }}>
              <Text
                style={{
                  fontFamily: "SatoshiVariable-Bold",
                  fontSize: 14,
                  color: "#FFFFFF",
                }}>
                Date:
              </Text>
              <Text
                style={{
                  fontFamily: "SatoshiVariable-Bold",
                  fontSize: 14,
                  color: "#FFFFFF",
                }}>
                Tue, 17 Jun 2022
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 5,
              }}>
              <Text
                style={{
                  fontFamily: "SatoshiVariable-Bold",
                  fontSize: 14,
                  color: "#FFFFFF",
                }}>
                Time:
              </Text>
              <Text
                style={{
                  fontFamily: "SatoshiVariable-Bold",
                  fontSize: 14,
                  color: "#FFFFFF",
                }}>
                10:30am
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(255,255,255,0.7)",
            padding: 20,
          }}>
          <FlatList
            data={productData}
            renderItem={renderOfferMenu}
            maxToRenderPerBatch={2}
          />
          <View
            style={{
              marginTop: 10,
              borderTopWidth: 2,
              borderStyle: "dashed",
              borderColor: "#D8D8D8",
              paddingVertical: 10,
            }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 5,
              }}>
              <Text style={styles.textStyle}>Table Booking x 3 Guest</Text>
              <Text style={styles.textStyle}>$1820.00</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 5,
              }}>
              <Text style={styles.textStyle}>Bombay Sapphire x 1 </Text>
              <Text style={styles.textStyle}>$476.00</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 5,
              }}>
              <Text style={styles.textStyle}>Bacardi x 2</Text>
              <Text style={styles.textStyle}>$1440.00</Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 2,
              borderStyle: "dashed",
              borderColor: "#D8D8D8",
              paddingVertical: 10,
            }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 5,
              }}>
              <Text style={styles.textStyle}>Subtotal</Text>
              <Text style={styles.textStyle}>$3,736.00</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 5,
              }}>
              <Text style={styles.textStyle}>Tax </Text>
              <Text style={styles.textStyle}>$200.00</Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 2,
              borderStyle: "dashed",
              borderColor: "#D8D8D8",
              paddingVertical: 10,
            }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 5,
              }}>
              <Text style={styles.textStyle}>Tip</Text>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 90,
                  borderWidth: 1,
                  borderColor: "#8A8D9F",
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Text>$30.00</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{alignItems: "center"}}>
            <Text
              style={{
                fontSize: 16,
                color: "#333333",
                fontFamily: "SatoshiVariable-Bold",
              }}>
              Total Amount
            </Text>
            <Text
              style={{
                fontSize: 30,
                color: "#FF3FCB",
                fontFamily: "SatoshiVariable-Bold",
                marginVertical: 10,
              }}>
              $3966.00
            </Text>

            <AppGradientButton
              onPress={() => navigation.navigate("payment")}
              width={290}
              color={"primary"}
              variant={"solid"}
              title={"Book Now"}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "Satoshi-Regular",
    fontSize: 14,
    color: "#030819",
  },
});

export default BookingDetailsScreen;
