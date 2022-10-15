import {extendTheme} from "native-base";

export const splitAppTheme = extendTheme({
  space: {
    "space-2": "29px",
  },
  components: {
    Button: {
      variants: {
        brand: {
          p: "10",
          bg: "brand.500",
        },
      },
    },
  },
});

// 2. Get the type of the CustomTheme
type CustomThemeType = typeof splitAppTheme;

// 3. Extend the internal NativeBase Theme
declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}
