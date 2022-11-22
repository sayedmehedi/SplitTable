import React from "react";
import {View} from "react-native";
import ProfileUpdaterItem from "./modals/ProfileUpdaterItem";
import ClubInfoUpdaterItem from "./modals/ClubInfoUpdaterItem";

const AccountSettingScreen = () => {
  return (
    <View style={{paddingHorizontal: 12, backgroundColor: "#FFFFFF", flex: 1}}>
      <ProfileUpdaterItem type="name" />

      <ClubInfoUpdaterItem type="name" />

      <ClubInfoUpdaterItem type="job_role" />

      <ProfileUpdaterItem type="phone" />

      <ProfileUpdaterItem type="email" />

      <ProfileUpdaterItem type="password" />

      <ClubInfoUpdaterItem type="location" />

      <ProfileUpdaterItem type="address" />
    </View>
  );
};

export default AccountSettingScreen;
