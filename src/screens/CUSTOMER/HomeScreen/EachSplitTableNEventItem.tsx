import React from "react";
import truncate from "lodash.truncate";
import {splitAppTheme} from "@src/theme";
import {Clock, MapIcon} from "@constants/iconPath";
import {SplitTable} from "@src/models";
import Fontisto from "react-native-vector-icons/Fontisto";
import {Image, Pressable, Text, View} from "react-native";

type Props = {
  item: SplitTable;
  onPress: (item: SplitTable) => void;
};

const EachSplitTableNEventItem = ({item, onPress}: Props) => {
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
            <Clock height={10} width={10} color={"#402B8C"} />
            <Text
              style={{
                color: "#8A8D9F",
                marginLeft: splitAppTheme.space[1],
                fontSize: splitAppTheme.fontSizes.sm,
                fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
              }}>
              {truncate(item.date)}
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

          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Clock height={10} width={10} color={"#402B8C"} />
            <Text
              style={{
                color: "#8A8D9F",
                marginLeft: splitAppTheme.space[1],
                fontSize: splitAppTheme.fontSizes.sm,
                fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
              }}>
              {item.total_joined}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default EachSplitTableNEventItem;
