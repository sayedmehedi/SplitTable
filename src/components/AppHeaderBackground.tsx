import React from "react";
import {HeaderBackground} from "@react-navigation/elements";
import {splitAppTheme} from "@src/theme";

export default function AppHeaderBackground() {
  return (
    <HeaderBackground
      style={{
        elevation: 20,
        backgroundColor: splitAppTheme.colors.white,
        shadowColor: splitAppTheme.colors.primary[400],
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
      }}
    />
  );
}
