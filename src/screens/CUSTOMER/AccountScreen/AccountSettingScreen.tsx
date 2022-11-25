import React from "react";
import {View} from "react-native";
import {splitAppTheme} from "@src/theme";
import ProfileUpdaterItem from "./modals/ProfileUpdaterItem";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";

const AccountSettingScreen = () => {
  return (
    <>
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={splitAppTheme.colors.white}
      />
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
