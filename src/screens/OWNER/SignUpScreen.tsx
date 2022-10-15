import React from "react";
import Button from "@components/Button";
import {View, TextInput, StyleSheet} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import {CompositeScreenProps} from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {OwnerStackParamList, RootStackParamList} from "@src/types";
import {OwnerMainBottomTabRoutes, OwnerStackRoutes} from "@constants/routes";

type Props = CompositeScreenProps<
  StackScreenProps<OwnerStackParamList, typeof OwnerStackRoutes.OWNER_SIGN_UP>,
  StackScreenProps<RootStackParamList>
>;

const SignUpScreen = ({navigation}: Props) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
      }}>
      <View style={{flex: 1, marginTop: 20}}>
        <View
          style={{
            height: 100,
            width: 100,
            backgroundColor: "#D6D6D6",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
            alignSelf: "center",
            marginBottom: 10,
          }}>
          <FontAwesome name="camera" size={30} color={"#BA8D9F"} />
        </View>
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <View style={[styles.SectionStyle, {width: "47%"}]}>
            <TextInput
              style={{flex: 1, paddingLeft: 20}}
              placeholder="First Name"
            />
          </View>
          <View style={[styles.SectionStyle, {width: "47%"}]}>
            <TextInput
              style={{flex: 1, paddingLeft: 20}}
              placeholder="Last Name"
            />
          </View>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={{flex: 1, paddingLeft: 20}}
            placeholder="Club/Bar Name"
          />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={{flex: 1, paddingLeft: 20}}
            placeholder="Your Position/Job Role"
          />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={{flex: 1, paddingLeft: 20}}
            placeholder="Phone Number"
          />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput style={{flex: 1, paddingLeft: 20}} placeholder="Email" />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            secureTextEntry
            style={{flex: 1, paddingLeft: 20}}
            placeholder="Password"
          />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            secureTextEntry
            style={{flex: 1, paddingLeft: 20}}
            placeholder="Confirm Password"
          />
        </View>

        <Button
          width={"100%"}
          color={"primary"}
          variant={"solid"}
          title={"Sign Up"}
          onPress={() =>
            navigation.navigate(OwnerStackRoutes.OWNER_MAIN_TABS, {
              screen: OwnerMainBottomTabRoutes.OWNER_TABLE,
            })
          }
        />
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
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default SignUpScreen;
