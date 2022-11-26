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
          height: 3,
        },
        shadowOpacity: 0.24,
        shadowRadius: 3.27,
        
      }}
    />
  );
}
