import React from "react";
import {View} from "react-native";
import ProfileUpdaterItem from "./modals/ProfileUpdaterItem";
import ClubInfoUpdaterItem from "./modals/ClubInfoUpdaterItem";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";
import {splitAppTheme} from "@src/theme";
import {useDisclosure} from "react-use-disclosure";
import {useIsFetching, useQueryClient} from "@tanstack/react-query";
import {QueryKeys} from "@constants/query-keys";
import ProfileUpdaterModal from "./modals/ProfileUpdaterModal";
import {RefreshControl, ScrollView} from "react-native-gesture-handler";
import ClubInfoUpdaterModal from "./modals/ClubInfoUpdaterModal";

type ProfileModalResourceType = React.ComponentProps<
  typeof ProfileUpdaterItem
>["type"];
type ClubInfoModalResourceType = React.ComponentProps<
  typeof ClubInfoUpdaterItem
>["type"];

const AccountSettingScreen = () => {
  const {
    isOpen: isProfileModalOpen,
    open: openProfileModal,
    close: closeProfileModal,
  } = useDisclosure();
  const {
    isOpen: isClubInfoModalOpen,
    open: openClubInfoModal,
    close: closeClubInfoModal,
  } = useDisclosure();
  const queryClient = useQueryClient();
  const isFetchingProfile = useIsFetching({
    queryKey: [QueryKeys.PROFILE],
  });

  const [profileModalResourceType, setProfileModalResourceType] =
    React.useState<ProfileModalResourceType | "">("");

  const [clubInfoModalResourceType, setClubInfoModalResourceType] =
    React.useState<ClubInfoModalResourceType | "">("");

  const handleOpenProfileModal = React.useCallback(
    (resrouceType: ProfileModalResourceType) => {
      setProfileModalResourceType(resrouceType);
      openProfileModal();
    },
    [openProfileModal],
  );

  const handleCloseProfileModal = React.useCallback(() => {
    setProfileModalResourceType("");
    closeProfileModal();
  }, [closeProfileModal]);

  const handleOpenClubInfoModal = React.useCallback(
    (resrouceType: ClubInfoModalResourceType) => {
      setClubInfoModalResourceType(resrouceType);
      openClubInfoModal();
    },
    [openClubInfoModal],
  );

  const handleCloseClubInfoModal = React.useCallback(() => {
    setClubInfoModalResourceType("");
    closeClubInfoModal();
  }, [closeClubInfoModal]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: splitAppTheme.space[6],
        paddingHorizontal: splitAppTheme.space[3],
      }}
      refreshControl={
        <RefreshControl
          onRefresh={() => {
            queryClient.refetchQueries([QueryKeys.PROFILE]);
          }}
          refreshing={isFetchingProfile == 1}
        />
      }
      // style={{
      //   flex: 1,
      //   paddingHorizontal: 12,
      //   backgroundColor: splitAppTheme.colors.white,
      // }}
    >
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={splitAppTheme.colors.white}
      />
      <ProfileUpdaterItem type="name" openModal={handleOpenProfileModal} />

      <ClubInfoUpdaterItem type="name" onOpenModal={handleOpenClubInfoModal} />

      <ClubInfoUpdaterItem
        type="job_role"
        onOpenModal={handleOpenClubInfoModal}
      />

      <ProfileUpdaterItem type="phone" openModal={handleOpenProfileModal} />

      <ProfileUpdaterItem type="email" openModal={handleOpenProfileModal} />

      <ProfileUpdaterItem type="password" openModal={handleOpenProfileModal} />

      <ClubInfoUpdaterItem
        type="location"
        onOpenModal={handleOpenClubInfoModal}
      />

      <ProfileUpdaterItem type="address" openModal={handleOpenProfileModal} />

      <ProfileUpdaterModal
        isOpen={isProfileModalOpen}
        type={profileModalResourceType}
        onClose={handleCloseProfileModal}
      />

      <ClubInfoUpdaterModal
        isOpen={isClubInfoModalOpen}
        type={clubInfoModalResourceType}
        onClose={handleCloseClubInfoModal}
      />
    </ScrollView>
  );
};

export default AccountSettingScreen;
