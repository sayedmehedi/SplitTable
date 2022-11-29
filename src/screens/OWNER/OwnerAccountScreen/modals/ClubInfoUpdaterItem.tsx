import React from "react";
import styles from "../styles";
import {View, Text, TouchableOpacity} from "react-native";
import useGetOwnerClubInfoQuery from "@hooks/clubs/useGetOwnerClubInfoQuery";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  type: "name" | "job_role" | "location";
  onOpenModal: (resourceType: Props["type"]) => void;
};

export default function ClubInfoUpdaterItem({type, onOpenModal}: Props) {
  const {data: clubInfoResponse} = useGetOwnerClubInfoQuery();

  return (
    <React.Fragment>
      <View style={styles.buttonContainer}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          {type === "name" && (
            <React.Fragment>
              <MaterialCommunityIcons
                name="food-fork-drink"
                size={20}
                color={"#707070"}
              />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                {clubInfoResponse?.name}
              </Text>
            </React.Fragment>
          )}

          {type === "job_role" && (
            <React.Fragment>
              <MaterialCommunityIcons
                name="card-account-details-outline"
                size={20}
                color={"#707070"}
              />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                {clubInfoResponse?.job_role}
              </Text>
            </React.Fragment>
          )}

          {type === "location" && (
            <React.Fragment>
              <MaterialCommunityIcons
                size={20}
                name="map-check-outline"
                color={"#707070"}
              />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                {clubInfoResponse?.location}
              </Text>
            </React.Fragment>
          )}
        </View>

        <TouchableOpacity onPress={() => onOpenModal(type)}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}
