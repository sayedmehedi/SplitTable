import React from "react";
import styles from "../styles";
import {SocialLinks} from "@src/models";
import truncate from "lodash.truncate";
import {TiktokIcon} from "@constants/iconPath";
import {isCustomerProfile} from "@utils/profile";
import Feather from "react-native-vector-icons/Feather";
import {View, Text, TouchableOpacity} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import useGetProfileQuery from "@hooks/auth/useGetProfileQuery";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type ResourceType =
  | "name"
  | "phone"
  | "email"
  | "password"
  | "address"
  | "facebook"
  | "twitter"
  | "linkedin"
  | "youtube"
  | "instagram"
  | "tiktok";

type Props = {
  type: ResourceType;
  openModal: (resrouceType: ResourceType) => void;
};

export default function ProfileUpdaterItem({type, openModal}: Props) {
  const {data: profileDataResponse} = useGetProfileQuery();

  function getEditText(keyName: keyof SocialLinks) {
    if (
      isCustomerProfile(profileDataResponse) &&
      !profileDataResponse.social_links?.[keyName]
    ) {
      return "Add";
    }

    return "Edit";
  }

  return (
    <React.Fragment>
      <View style={styles.buttonContainer}>
        <React.Fragment>
          {type === "name" && (
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={{flexDirection: "row", flex: 1}}>
                <AntDesign name="user" size={20} color={"#707070"} />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  {profileDataResponse?.name}
                </Text>
              </View>

              <TouchableOpacity onPress={() => openModal(type)}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}

          {type === "phone" && (
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={{flexDirection: "row", flex: 1}}>
                <Feather name="phone" size={20} color={"#707070"} />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  {profileDataResponse?.phone}
                </Text>
              </View>

              <TouchableOpacity onPress={() => openModal(type)}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}

          {type === "password" && (
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={{flexDirection: "row", flex: 1}}>
                <MaterialCommunityIcons
                  name="lock-check-outline"
                  size={20}
                  color={"#707070"}
                />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  Update Password
                </Text>
              </View>

              <TouchableOpacity onPress={() => openModal(type)}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}

          {type === "email" && (
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={{flexDirection: "row", flex: 1}}>
                <Fontisto name="email" size={20} color={"#707070"} />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  {profileDataResponse?.email}
                </Text>
              </View>

              <TouchableOpacity onPress={() => openModal(type)}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}

          {type === "address" && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
              <View
                style={{
                  width: "80%",
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={20}
                  color={"#707070"}
                />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  {profileDataResponse?.location}
                </Text>
              </View>

              <View style={{flex: 1}} />

              <View>
                <TouchableOpacity onPress={() => openModal(type)}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {isCustomerProfile(profileDataResponse) && type === "facebook" && (
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={{flexDirection: "row", flex: 1}}>
                <MaterialCommunityIcons
                  name="facebook"
                  size={20}
                  color={"#707070"}
                />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  {!!profileDataResponse?.social_links?.facebook
                    ? truncate(profileDataResponse?.social_links?.facebook)
                    : "Facebook"}
                </Text>
              </View>

              <TouchableOpacity onPress={() => openModal(type)}>
                <Text style={styles.editText}>{getEditText("facebook")}</Text>
              </TouchableOpacity>
            </View>
          )}

          {isCustomerProfile(profileDataResponse) && type === "twitter" && (
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={{flexDirection: "row", flex: 1}}>
                <MaterialCommunityIcons
                  name="twitter"
                  size={20}
                  color={"#707070"}
                />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  {!!profileDataResponse?.social_links?.twitter
                    ? truncate(profileDataResponse?.social_links?.twitter)
                    : "Twitter"}
                </Text>
              </View>

              <TouchableOpacity onPress={() => openModal(type)}>
                <Text style={styles.editText}>{getEditText("twitter")}</Text>
              </TouchableOpacity>
            </View>
          )}

          {isCustomerProfile(profileDataResponse) && type === "linkedin" && (
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={{flexDirection: "row", flex: 1}}>
                <MaterialCommunityIcons
                  name="linkedin"
                  size={20}
                  color={"#707070"}
                />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  {!!profileDataResponse?.social_links?.linkendin
                    ? truncate(profileDataResponse?.social_links?.linkendin)
                    : "Linkedin"}
                </Text>
              </View>

              <TouchableOpacity onPress={() => openModal(type)}>
                <Text style={styles.editText}>{getEditText("linkendin")}</Text>
              </TouchableOpacity>
            </View>
          )}

          {isCustomerProfile(profileDataResponse) && type === "instagram" && (
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={{flexDirection: "row", flex: 1}}>
                <MaterialCommunityIcons
                  name="instagram"
                  size={20}
                  color={"#707070"}
                />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  {!!profileDataResponse?.social_links?.instgram
                    ? truncate(profileDataResponse?.social_links?.instgram)
                    : "Instagram"}
                </Text>
              </View>

              <TouchableOpacity onPress={() => openModal(type)}>
                <Text style={styles.editText}>{getEditText("instgram")}</Text>
              </TouchableOpacity>
            </View>
          )}

          {isCustomerProfile(profileDataResponse) && type === "youtube" && (
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={{flexDirection: "row", flex: 1}}>
                <MaterialCommunityIcons
                  name="youtube"
                  size={20}
                  color={"#707070"}
                />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  {!!profileDataResponse?.social_links?.youtube
                    ? truncate(profileDataResponse?.social_links?.youtube)
                    : "Youtube"}
                </Text>
              </View>

              <TouchableOpacity onPress={() => openModal(type)}>
                <Text style={styles.editText}>{getEditText("youtube")}</Text>
              </TouchableOpacity>
            </View>
          )}

          {isCustomerProfile(profileDataResponse) && type === "tiktok" && (
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={{flexDirection: "row", flex: 1}}>
                <TiktokIcon height={20} width={20} color={"#707070"} />

                <Text style={{marginLeft: 10, color: "#707070"}}>
                  {!!profileDataResponse?.social_links?.tiktok
                    ? truncate(profileDataResponse?.social_links?.tiktok)
                    : "Tiktok"}
                </Text>
              </View>

              <TouchableOpacity onPress={() => openModal(type)}>
                <Text style={styles.editText}>{getEditText("tiktok")}</Text>
              </TouchableOpacity>
            </View>
          )}
        </React.Fragment>
      </View>
    </React.Fragment>
  );
}
