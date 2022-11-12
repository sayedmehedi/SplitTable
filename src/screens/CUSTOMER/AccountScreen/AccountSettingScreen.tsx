import React, {useState} from "react";
import {View, Text} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
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

        {/* 

      

      <AccountSettingsItem
        modalInputs={[
          {
            name: 'facebook-account',
            value: 'softiconic@gmail.com',
          },
        ]}
        text={'Connect Facebook'}
        modalTitle={'Update Facebook Profile'}
        icon={<Feather name="facebook" size={20} color={'#707070'} />}
      />

      

      <AccountSettingsItem
        modalInputs={[
          {
            name: 'location',
            placeholder: 'Location',
          },
        ]}
        text={'Location'}
        modalTitle={'Update Location'}
        icon={<Feather name="map-pin" size={20} color={'#707070'} />}
      /> */}
      </View>
    </>
  );
};

export default AccountSettingScreen;
