import React from "react";
import {View, Text} from "react-native";
import {splitAppTheme} from "@src/theme";
import UserSearchInput from "../ChatScreen/UserSearchInput";

export default function AddFriendScreen() {
  return (
    <View
      style={{
        padding: splitAppTheme.space[6],
      }}>
      <UserSearchInput mode="add" />
    </View>
  );
}
