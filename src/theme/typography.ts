const typography = {
  letterSpacings: {
    xs: "-0.05em",
    sm: "-0.025em",
    md: 0,
    lg: "0.025em",
    xl: "0.05em",
    "2xl": "0.1em",
  },
  lineHeights: {
    "2xs": "1em",
    xs: "1.125em",
    sm: "1.25em",
    md: "1.375em",
    lg: "1.5em",
    xl: "1.75em",
    "2xl": "2em",
    "3xl": "2.5em",
    "4xl": "3em",
    "5xl": "4em",
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
    } as const,

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
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
    extraBlack: 950,
  },
  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    body: "Roboto",
    mono: "Roboto",
    heading: "Roboto",

    roboto: "Roboto",
    satoshi: "Sathoshi",
  } as const,
  fontSizes: {
    "2xs": 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
    "6xl": 60,
    "7xl": 72,
    "8xl": 96,
    "9xl": 128,
  } as const,
};

export type ITypography = typeof typography;
export type IFontSize = keyof typeof typography.fontSizes;
export type ILetterSpacing = keyof typeof typography.letterSpacings;
export type ILineHeight = keyof typeof typography.lineHeights;
export type IFontWeight = keyof typeof typography.fontWeights;
// export type IFont = typeof typography.fonts;
export interface IFont {
  heading?: string;
  body?: string;
  mono?: string;
}

export default typography;
