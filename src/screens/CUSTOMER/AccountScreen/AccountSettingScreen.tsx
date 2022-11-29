import React from "react";
import {splitAppTheme} from "@src/theme";
import {ScrollView, View} from "react-native";
import {QueryKeys} from "@constants/query-keys";
import {RefreshControl} from "react-native-gesture-handler";
import ProfileUpdaterItem from "./modals/ProfileUpdaterItem";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";
import {useIsFetching, useQueryClient} from "@tanstack/react-query";

const AccountSettingScreen = () => {
  const queryClient = useQueryClient();
  const isFetchingProfile = useIsFetching({
    queryKey: [QueryKeys.PROFILE],
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: splitAppTheme.space[6],
      }}
      refreshControl={
        <RefreshControl
          onRefresh={() => {
            queryClient.refetchQueries([QueryKeys.PROFILE]);
          }}
          refreshing={isFetchingProfile == 1}
        />
      }>
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

        <ProfileUpdaterItem type="facebook" />

        <ProfileUpdaterItem type="twitter" />

        <ProfileUpdaterItem type="linkedin" />

        <ProfileUpdaterItem type="youtube" />

        <ProfileUpdaterItem type="instagram" />

        <ProfileUpdaterItem type="tiktok" />
      </View>
    </ScrollView>
  );
};

export default AccountSettingScreen;
