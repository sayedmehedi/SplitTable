import {View, Text, TextInput, StyleSheet} from "react-native";
import React from "react";
import Button from "../../@components/Button";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
const EmailLoginScreen = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 20,
        justifyContent: "center",
      }}>
      <View style={{alignItems: "center", width: "100%"}}>
        <Text
          style={{
            fontFamily: "SatoshiVariable-Bold",
            fontSize: 22,
            color: "#00C1FF",
          }}>
          Login
        </Text>
        <Text
          style={{
            fontFamily: "Satoshi-Regular",
            fontSize: 18,
            color: "#262B2E",
            marginVertical: 10,
          }}>
          With your email address
        </Text>
        <View style={styles.SectionStyle}>
          <Entypo name="mail" color={"black"} size={20} />

          <TextInput
            style={{flex: 1, paddingLeft: 20}}
            placeholder="Enter Your Name Here"
          />
        </View>
        <View style={styles.SectionStyle}>
          <FontAwesome5 name="lock" color={"black"} size={20} />

          <TextInput
            secureTextEntry
            style={{flex: 1, paddingLeft: 20}}
            placeholder="Password"
            underlineColorAndroid="transparent"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 10,
            marginVertical: 10,
          }}>
          <Text>CheckBox</Text>
          <Text>Remember me</Text>

          <Text>Forget password?</Text>
        </View>

        <Button
          width={300}
          color={"primary"}
          variant={"solid"}
          title={"Sign in"}
          onPress={() => navigation.navigate("emailVerification")}
        />

        <Text>
          Don't have an account?<Text>Sign Up</Text>
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F5F7",
    height: 60,
    borderRadius: 5,
    margin: 10,
    paddingLeft: 20,
  },
});

export default EmailLoginScreen;
