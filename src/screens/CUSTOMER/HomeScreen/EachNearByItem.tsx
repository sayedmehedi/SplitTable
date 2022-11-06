import React from "react";
import truncate from "lodash.truncate";
import {MapIcon} from "@constants/iconPath";
import {NearbyClubListItem} from "@src/models";
import Fontisto from "react-native-vector-icons/Fontisto";
import {Image, Pressable, Text, View} from "react-native";
import {splitAppTheme} from "@src/theme";

type Props = {
  item: NearbyClubListItem;
  onPress: (item: NearbyClubListItem) => void;
};

const EachNearByItem = ({item, onPress}: Props) => {
  const handlePress = React.useCallback(() => {
    onPress(item);
  }, [item, onPress]);

  return (
    <Pressable onPress={handlePress}>
      <View
        style={{
          flexDirection: "row",
          height: splitAppTheme.sizes[24],
          width: splitAppTheme.sizes.full,
          marginVertical: splitAppTheme.space[2],
        }}>
        <Image
          style={{
            width: splitAppTheme.sizes["24"],
            height: splitAppTheme.sizes["24"],
            borderRadius: splitAppTheme.radii.sm,
          }}
          source={{uri: item.image}}
        />
        <View
          style={{
            justifyContent: "space-between",
            marginLeft: splitAppTheme.space[5],
          }}>
          <Text
            style={{
              color: "#262B2E",
              fontSize: splitAppTheme.fontSizes.lg,
              fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
            }}>
            {truncate(item.name)}
          </Text>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <MapIcon height={10} width={10} color={"#402B8C"} />
            <Text
              style={{
                color: "#8A8D9F",
                marginLeft: splitAppTheme.space[1],
                fontSize: splitAppTheme.fontSizes.sm,
                fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
              }}>
              {truncate(item.location)}
            </Text>
          </View>

          <View style={{flexDirection: "row", alignItems: "center"}}>
            <MapIcon height={10} width={10} color={"#402B8C"} />
            <Text
              style={{
                color: "#8A8D9F",
                marginLeft: splitAppTheme.space[1],
                fontSize: splitAppTheme.fontSizes.sm,
                fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
              }}>
              {item.distance}
            </Text>
          </View>

          <View style={{flexDirection: "row"}}>
            <Text style={{color: "black"}}>{item.avg_rating}</Text>
            <Fontisto name="star" color={"#FFC529"} size={16} />
            <Text style={{color: "black"}}>({item.total_reviews})</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default EachNearByItem;
