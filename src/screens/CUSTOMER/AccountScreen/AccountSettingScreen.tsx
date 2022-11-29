import React from "react";
import {splitAppTheme} from "@src/theme";
import {ScrollView, View} from "react-native";
import {QueryKeys} from "@constants/query-keys";
import {RefreshControl} from "react-native-gesture-handler";
import ProfileUpdaterItem from "./modals/ProfileUpdaterItem";
import ProfileUpdaterModal from "./modals/ProfileUpdaterModal";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";
import {useIsFetching, useQueryClient} from "@tanstack/react-query";
import {useDisclosure} from "react-use-disclosure";

type ResourceType = React.ComponentProps<typeof ProfileUpdaterItem>["type"];

const AccountSettingScreen = () => {
  const {isOpen, open, close} = useDisclosure();
  const queryClient = useQueryClient();
  const isFetchingProfile = useIsFetching({
    queryKey: [QueryKeys.PROFILE],
  });

  const [modalResourceType, setModalResourceType] = React.useState<
    ResourceType | ""
  >("");

  const handleOpenModal = React.useCallback(
    (resrouceType: ResourceType) => {
      setModalResourceType(resrouceType);
      open();
    },
    [open],
  );

  const handleCloseModal = React.useCallback(() => {
    setModalResourceType("");
    close();
  }, [close]);

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
        <ProfileUpdaterItem type="name" openModal={handleOpenModal} />

        <ProfileUpdaterItem type="phone" openModal={handleOpenModal} />

        <ProfileUpdaterItem type="email" openModal={handleOpenModal} />

        <ProfileUpdaterItem type="password" openModal={handleOpenModal} />

        <ProfileUpdaterItem type="address" openModal={handleOpenModal} />

        <ProfileUpdaterItem type="facebook" openModal={handleOpenModal} />

        <ProfileUpdaterItem type="twitter" openModal={handleOpenModal} />

        <ProfileUpdaterItem type="linkedin" openModal={handleOpenModal} />

        <ProfileUpdaterItem type="youtube" openModal={handleOpenModal} />

        <ProfileUpdaterItem type="instagram" openModal={handleOpenModal} />

        <ProfileUpdaterItem type="tiktok" openModal={handleOpenModal} />

        <ProfileUpdaterModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          type={modalResourceType}
        />
      </View>
    </ScrollView>
  );
};

export default AccountSettingScreen;
