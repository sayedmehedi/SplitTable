import React from "react";
import {splitAppTheme} from "@src/theme";
import {Image, Text, View} from "react-native";
import emptyListStateImage from "@assets/empty-list.png";
import {useDimensions} from "@react-native-community/hooks";

const GenericListEmpty = () => {
  const {
    window: {width: windowWidth, height: windowHeight},
  } = useDimensions();

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: windowHeight * 0.8,
      }}>
      <Image
        resizeMode={"contain"}
        style={{
          width: windowWidth * 0.9,
          height: windowHeight * 0.4,
        }}
        source={emptyListStateImage}
      />
      <Text
        style={{
          textAlign: "center",
          marginTop: splitAppTheme.space[5],
          fontSize: splitAppTheme.fontSizes.lg,
          fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
        }}>
        No Data
      </Text>
    </View>
  );
};

export default GenericListEmpty;
