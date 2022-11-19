import * as React from "react";
import {useIsFocused} from "@react-navigation/native";
import {StatusBar, StatusBarProps} from "react-native";

export function FocusAwareStatusBar(props: StatusBarProps) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}
