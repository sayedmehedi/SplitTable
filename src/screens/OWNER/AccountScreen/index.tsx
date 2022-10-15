import {View, Text, Image, StyleSheet} from "react-native";
import React from "react";
import {
  FaqIcon,
  LogoutIcon,
  LegalIcon,
  ProfileIcon,
  FavouriteIcon,
  TransactionIcon,
  AccountSettingIcon,
} from "@constants/iconPath";
import Feather from "react-native-vector-icons/Feather";
import {TouchableOpacity} from "react-native-gesture-handler";

const AccountScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: "#FFFFFF", paddingHorizontal: 20}}>
      <View
        style={{
          height: 90,
          width: "100%",
          borderWidth: 1,
          borderColor: "#DBDBDB",
          borderRadius: 5,
          marginVertical: 20,
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}>
        <Image
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
          }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
          }}
        />

        <View style={{marginLeft: 10}}>
          <Text
            style={{
              fontFamily: "SatoshiVariable-Bold",
              fontSize: 16,
              color: "#FF3FCB",
            }}>
            Jhon Smith
          </Text>
          <Text
            style={{
              fontFamily: "Satoshi-Regular",
              fontSize: 12,
              color: "#8A8D9F",
            }}>
            Las Vegas, NV 98109
          </Text>
          <Text
            style={{
              fontFamily: "Satoshi-Regular",
              fontSize: 12,
              color: "#8A8D9F",
            }}>
            Member Since June 2022
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("profile")}
          style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <ProfileIcon />
            <Text
              style={{
                color: "#262B2E",
                fontFamily: "Satoshi-Regular",
                fontSize: 16,
                marginLeft: 10,
              }}>
              Profile
            </Text>
          </View>

          <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("accountSetting")}
          style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <AccountSettingIcon />
            <Text
              style={{
                color: "#262B2E",
                fontFamily: "Satoshi-Regular",
                fontSize: 16,
                marginLeft: 10,
              }}>
              Account Setting
            </Text>
          </View>

          <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("transection")}
          style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <TransactionIcon />
            <Text
              style={{
                color: "#262B2E",
                fontFamily: "Satoshi-Regular",
                fontSize: 16,
                marginLeft: 10,
              }}>
              Transaction
            </Text>
          </View>

          <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("favorite")}
          style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <FavouriteIcon />
            <Text
              style={{
                color: "#262B2E",
                fontFamily: "Satoshi-Regular",
                fontSize: 16,
                marginLeft: 10,
              }}>
              Favorite
            </Text>
          </View>

          <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("faq")}
          style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <FaqIcon />
            <Text
              style={{
                color: "#262B2E",
                fontFamily: "Satoshi-Regular",
                fontSize: 16,
                marginLeft: 10,
              }}>
              Faq's
            </Text>
          </View>

          <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("legal")}
          style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <LegalIcon />
            <Text
              style={{
                color: "#262B2E",
                fontFamily: "Satoshi-Regular",
                fontSize: 16,
                marginLeft: 10,
              }}>
              Legal
            </Text>
          </View>

          <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <LogoutIcon />
            <Text
              style={{
                color: "#262B2E",
                fontFamily: "Satoshi-Regular",
                fontSize: 16,
                marginLeft: 10,
              }}>
              Logout
            </Text>
          </View>

          <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
        </TouchableOpacity>
        <Text
          style={{
            marginVertical: 5,
            alignSelf: "center",
          }}>
          App Version V1.0
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: "#C8C8D3",
    paddingVertical: 15,
    justifyContent: "space-between",
  },
});

export default AccountScreen;
