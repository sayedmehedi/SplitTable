import React from "react";
import {View} from "react-native";
import ProfileUpdaterItem from "./modals/ProfileUpdaterItem";

const AccountSettingScreen = () => {
  return (
    <>
      <View
        style={{paddingHorizontal: 12, backgroundColor: "#FFFFFF", flex: 1}}>
        <ProfileUpdaterItem type="name" />

        <ProfileUpdaterItem type="phone" />

        <ProfileUpdaterItem type="email" />

        <ProfileUpdaterItem type="password" />

        <ProfileUpdaterItem type="address" />
      </View>
    </>
  );
};

export default AccountSettingScreen;
