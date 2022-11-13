import {DefaultTheme} from "@react-navigation/native";
import borderWidths from "./borders";
import breakpoints from "./breakpoints";
import colors from "./colors";
import radii from "./radius";
import shadows from "./shadows";
import sizes from "./sizes";
import {spacing} from "./space";
import typography from "./typography";
import opacity from "./opacity";

export const splitAppTheme = {
  borderWidths,
  breakpoints,
  colors,
  radii,
  ...typography,
  sizes,
  space: spacing,
  shadows,
  opacity,
};

export const splitAppNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: splitAppTheme.colors.primary[300],
    background: splitAppTheme.colors.white,
  },
};

export const themePropertyMap: any = {
  borderRadius: "radii",
  color: "colors",
  letterSpacing: "letterSpacings",
  lineHeight: "lineHeights",
  fontFamily: "fonts",
  fontSize: "fontSizes",
  fontWeight: "fontWeights",
  size: "sizes",
  space: "space",
  border: "borders",
  shadow: "shadows",
};

// 2. Get the type of the CustomTheme
type CustomThemeType = typeof splitAppTheme;
