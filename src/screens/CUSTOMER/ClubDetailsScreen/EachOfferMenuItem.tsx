import React from "react";
import truncate from "lodash.truncate";
import {ClubMenuItem} from "@src/models";
import {Image, Text, View} from "react-native";
import {splitAppTheme} from "@src/theme";

type Props = {
  item: ClubMenuItem;
};

const EachOfferMenuItem = ({item}: Props) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          height: splitAppTheme.sizes[32],
          backgroundColor: splitAppTheme.colors.white,
        },
      ]}>
      <View
        style={{
          width: splitAppTheme.sizes["2/6"],
          height: splitAppTheme.sizes["full"],
        }}>
        <Image
          style={{
            width: splitAppTheme.sizes["full"],
            height: splitAppTheme.sizes["full"],
          }}
          source={{uri: item.image}}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          marginLeft: splitAppTheme.space[4],
        }}>
        <Text
          style={{
            color: "#262B2E",
            fontSize: splitAppTheme.fontSizes.lg,
            fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
          }}>
          {item.name}
        </Text>

        <View
          style={{
            maxWidth: "80%",
          }}>
          <Text
            numberOfLines={3}
            style={{
              color: "#8A8D9F",
              fontSize: splitAppTheme.fontSizes.sm,
              fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
            }}>
            {truncate(item.details, {
              length: 30,
            })}
          </Text>
        </View>

        <Text
          style={{
            color: splitAppTheme.colors.blue[300],
            fontSize: splitAppTheme.fontSizes.sm,
            paddingBottom: splitAppTheme.space["1.5"],
            fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
          }}>
          Price: ${item.price}
        </Text>
      </View>
    </View>
  );
};

export default EachOfferMenuItem;
