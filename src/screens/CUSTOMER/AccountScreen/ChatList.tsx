import React from "react";
import {View, Text} from "react-native";
import {useDimensions} from "@react-native-community/hooks";

export default function ChatList() {
  const {window: windowDimensions} = useDimensions();

  return (
    <View style={{flex: 1, width: windowDimensions.width}}>
      <Text>ChatList</Text>
    </View>
  );
}
