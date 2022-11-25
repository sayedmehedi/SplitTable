import React from "react";
import {View} from "react-native";
import ProfileUpdaterItem from "./modals/ProfileUpdaterItem";
import ClubInfoUpdaterItem from "./modals/ClubInfoUpdaterItem";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";
import {splitAppTheme} from "@src/theme";

const AccountSettingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 12,
        backgroundColor: splitAppTheme.colors.white,
      }}>
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={splitAppTheme.colors.white}
      />
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
