import React from "react";
import styles from "../styles";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import useGetProfileQuery from "@hooks/auth/useGetProfileQuery";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {View, Text, TouchableOpacity} from "react-native";

type ResourceType = "name" | "phone" | "email" | "password" | "address";

type Props = {
  type: ResourceType;
  openModal: (resrouceType: ResourceType) => void;
};

export default function ProfileUpdaterItem({type, openModal}: Props) {
  const {data: profileDataResponse} = useGetProfileQuery();

  return (
    <React.Fragment>
      <View style={styles.buttonContainer}>
        <View style={{flexDirection: "row", alignItems: "center", flex: 1}}>
          {type === "name" && (
            <React.Fragment>
              <AntDesign name="user" size={20} color={"#707070"} />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                {profileDataResponse?.name}
              </Text>
            </React.Fragment>
          )}

          {type === "phone" && (
            <React.Fragment>
              <Feather name="phone" size={20} color={"#707070"} />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                {profileDataResponse?.phone}
              </Text>
            </React.Fragment>
          )}

          {type === "password" && (
            <React.Fragment>
              <MaterialCommunityIcons
                name="lock-check-outline"
                size={20}
                color={"#707070"}
              />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                Update Password
              </Text>
            </React.Fragment>
          )}

          {type === "email" && (
            <React.Fragment>
              <Fontisto name="email" size={20} color={"#707070"} />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                {profileDataResponse?.email}
              </Text>
            </React.Fragment>
          )}

          {type === "address" && (
            <React.Fragment>
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={20}
                color={"#707070"}
              />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                {profileDataResponse?.location}
              </Text>
            </React.Fragment>
          )}
        </View>

        <View
          style={{
            width: 50,
            alignItems: "flex-end",
          }}>
          <TouchableOpacity onPress={() => openModal(type)}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  );
}
