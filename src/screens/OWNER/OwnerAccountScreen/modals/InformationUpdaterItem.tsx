import React from "react";
import dayjs from "dayjs";
import styles from "../styles";
import {timeToDate} from "@utils/club";
import {OwnerStackRoutes} from "@constants/routes";
import {Clock, MenuIcon} from "@constants/iconPath";
import {StackNavigationProp} from "@react-navigation/stack";
import {OwnerStackParamList, RootStackParamList} from "@src/navigation";
import {View, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import useGetOwnerClubInfoQuery from "@hooks/clubs/useGetOwnerClubInfoQuery";
import {CompositeNavigationProp, useNavigation} from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type ResourceType = "time" | "cuisine" | "cost" | "about" | "slider";

type Props = {
  type: ResourceType;
  openModal: (resrouceType: ResourceType) => void;
};

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<OwnerStackParamList, typeof OwnerStackRoutes.INFORMATION>,
  StackNavigationProp<RootStackParamList>
>;

export default function ProfileUpdaterItem({type, openModal}: Props) {
  const navigation = useNavigation<NavigationProp>();

  const {data: clubInfoData, isLoading: isLoadingClubInfo} =
    useGetOwnerClubInfoQuery();

  if (isLoadingClubInfo) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  let avgCost = "$0 - $0";
  if (
    clubInfoData?.avg_cost_max !== undefined &&
    clubInfoData?.avg_cost_min !== undefined
  ) {
    const {avg_cost_max, avg_cost_min} = clubInfoData;
    avgCost = `$${avg_cost_min} - $${avg_cost_max}`;
  }

  return (
    <React.Fragment>
      <View style={styles.buttonContainer}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          {type === "time" && (
            <React.Fragment>
              <Clock height={20} width={20} color={"#707070"} />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                Open:
                {clubInfoData?.opening_time
                  ? dayjs(timeToDate(clubInfoData.opening_time)).format(
                      "hh:mm A",
                    )
                  : ""}{" "}
                -{" "}
                {clubInfoData?.closing_time
                  ? dayjs(timeToDate(clubInfoData.closing_time)).format(
                      "hh:mm A",
                    )
                  : ""}
              </Text>
            </React.Fragment>
          )}

          {type === "cuisine" && (
            <React.Fragment>
              <MenuIcon height={20} width={20} color={"#707070"} />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                Cusines: {clubInfoData?.cuisine}
              </Text>
            </React.Fragment>
          )}

          {type === "cost" && (
            <React.Fragment>
              <MaterialCommunityIcons
                size={20}
                name="currency-usd"
                color={"#707070"}
              />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                Average Cost: {avgCost}
              </Text>
            </React.Fragment>
          )}

          {type === "about" && (
            <React.Fragment>
              <MaterialCommunityIcons
                name="information-outline"
                size={20}
                color={"#707070"}
              />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                About Club/Bar
              </Text>
            </React.Fragment>
          )}

          {type === "slider" && (
            <React.Fragment>
              <MaterialCommunityIcons
                name="file-image"
                size={20}
                color={"#707070"}
              />

              <Text style={{marginLeft: 10, color: "#707070"}}>
                Slider image
              </Text>
            </React.Fragment>
          )}
        </View>

        <TouchableOpacity
          onPress={() => {
            if (type !== "slider") {
              openModal(type);
            } else {
              navigation.navigate(OwnerStackRoutes.SLIDER_IMAGES);
            }
          }}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}
