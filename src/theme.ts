import {DefaultTheme} from "@react-navigation/native";
import {ColorModeOptions, extendTheme} from "native-base";

const config: ColorModeOptions = {
  useSystemColorMode: false, // TODO: implement this
  initialColorMode: "light",
  accessibleColors: false,
};

export const splitAppTheme = extendTheme({
  config,
  colors: {
    primary: {
      50: "#ffe2fc",
      100: "#ffb1ec",
      200: "#ff7fdd",
      300: "#ff4dcf",
      400: "#fe1ec1",
      500: "#e507a7",
      600: "#b30082",
      700: "#81005d",
      800: "#4f0039",
      900: "#1e0016",
    },
    secondary: {
      50: "#efeaff",
      100: "#cdc3f0",
      200: "#ac9de2",
      300: "#8b76d5",
      400: "#6a4fc8",
      500: "#5036af",
      600: "#3e2a89",
      700: "#2d1e63",
      800: "#1b113d",
      900: "#0a051a",
    },
    green: {
      50: "#defff0",
      100: "#b7f6d8",
      200: "#8defc1",
      300: "#62e7a9",
      400: "#38e191",
      500: "#1ec778",
      600: "#139b5c",
      700: "#076f42",
      800: "#004326",
      900: "#001808",
    },
    red: {
      50: "#ffe2e2",
      100: "#ffb1b1",
      200: "#ff7f7f",
      300: "#ff4c4c",
      400: "#fe1b1b",
      500: "#e40101",
      600: "#b30000",
      700: "#800000",
      800: "#4f0000",
      900: "#200000",
    },
    blue: {
      50: "#d7fcff",
      100: "#abedff",
      200: "#7ae1ff",
      300: "#48d4ff",
      400: "#1ac7ff",
      500: "#00aee6",
      600: "#0087b4",
      700: "#006182",
      800: "#003b51",
      900: "#001520",
    },
  },
  fontConfig: {
    Roboto: {
      100: {
        normal: "Roboto-Thin",
      },
      300: {
        normal: "Roboto-Light",
      },
      400: {
        normal: "Roboto-Regular",
      },
      500: {
        normal: "Roboto-Medium",
      },
      700: {
        normal: "Roboto-Bold",
      },
      900: {
        normal: "Roboto-Black",
      },
    },

    Sathoshi: {
      300: {
        normal: "Satoshi-Light",
      },
      400: {
        normal: "Satoshi-Regular",
      },
      500: {
        normal: "Satoshi-Medium",
      },
      700: {
        normal: "SatoshiVariable-Bold",
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    body: "Roboto",
    mono: "Roboto",
    heading: "Roboto",

    roboto: "Roboto",
    satoshi: "Sathoshi",
  } as const,
});

// fontSizes: {
//   '2xs': 10,
//   'xs': 12,
//   'sm': 14,
//   'md': 16,
//   'lg': 18,
//   'xl': 20,
//   '2xl': 24,
//   '3xl': 30,
//   '4xl': 36,
//   '5xl': 48,
//   '6xl': 60,
//   '7xl': 72,
//   '8xl': 96,
//   '9xl': 128,
// },

export const splitAppNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: splitAppTheme.colors.white,
    primary: splitAppTheme.colors.primary[300],
  },
};

// 2. Get the type of the CustomTheme
type CustomThemeType = typeof splitAppTheme;

// 3. Extend the internal NativeBase Theme
declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}
