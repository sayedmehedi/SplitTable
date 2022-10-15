import {View, Text, Image} from "react-native";
import React from "react";
import Button from "../../@components/Button";
import {TouchableOpacity} from "react-native-gesture-handler";

const LocationEnablePromptScreen = ({navigation}) => {
  return (
    <View style={{padding: 30, flex: 1, backgroundColor: "white"}}>
      <Image
        style={{
          height: 200,
          width: "100%",
          borderRadius: 10,
        }}
        source={require("../../@assets/images/Map-1.png")}
      />
      <Text
        style={{
          textAlign: "center",
          margin: 20,
          fontFamily: "Satoshi-Regular",
          fontSize: 16,
          color: "#262B2E",
        }}>
        Set your location to start exploring club/bars around you
      </Text>
      <Button
        width={"100%"}
        color={"primary"}
        variant={"solid"}
        title={"Enable Location"}
        onPress={() => navigation.navigate("customerMainTab")}
      />

      <TouchableOpacity
        style={{
          height: 50,
          width: "100%",
          borderWidth: 2,
          borderColor: "#00C1FF",
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontFamily: "SatoshiVariable-Bold",
            color: "#00C1FF",
          }}>
          No, I do it later
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationEnablePromptScreen;
