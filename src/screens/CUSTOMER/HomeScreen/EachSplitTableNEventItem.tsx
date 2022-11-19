import React from "react";
import truncate from "lodash.truncate";
import {SplitTable} from "@src/models";
import {splitAppTheme} from "@src/theme";
import Fontisto from "react-native-vector-icons/Fontisto";
import {Image, Pressable, Text, View} from "react-native";
import {Clock, DistanceIcon, JoinCountIcon, MapIcon} from "@constants/iconPath";
import dayjs from "dayjs";

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
          alignItems: "center",
          flexDirection: "row",
          // height: splitAppTheme.sizes[24],
          width: splitAppTheme.sizes.full,
          marginVertical: splitAppTheme.space[2],
        }}>
        <Image
          style={{
            width: splitAppTheme.sizes["24"],
            height: 110,
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              // marginTop: splitAppTheme.space[1],
            }}>
            <MapIcon height={15} width={15} color={"#402B8C"} />
            <Text
              style={{
                color: "#8A8D9F",
                marginLeft: splitAppTheme.space[2],
                fontSize: splitAppTheme.fontSizes.sm,
                fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
              }}>
              {truncate(item.location)}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: splitAppTheme.space[1],
            }}>
            <Clock height={15} width={15} color={"#402B8C"} />
            <Text
              style={{
                color: "#8A8D9F",
                marginLeft: splitAppTheme.space[2],
                fontSize: splitAppTheme.fontSizes.sm,
                fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
              }}>
              {dayjs(item.date, "YYYY-MM-DD HH:mm:ss").format(
                "DD MMM, hh:mm A",
              )}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: splitAppTheme.space[1],
            }}>
            <DistanceIcon height={15} width={15} color={"#402B8C"} />
            <Text
              style={{
                color: "#8A8D9F",
                marginLeft: splitAppTheme.space[2],
                fontSize: splitAppTheme.fontSizes.sm,
                fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
              }}>
              {item.distance}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: splitAppTheme.space[1],
            }}>
            <JoinCountIcon height={15} width={15} color={"#402B8C"} />
            <Text
              style={{
                color: "#8A8D9F",
                marginLeft: splitAppTheme.space[2],
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
