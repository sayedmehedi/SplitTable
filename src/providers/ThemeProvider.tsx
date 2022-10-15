import React from "react";

const defaultTheme = {
  colors: {
    white: "#FFFFFF",
    black: "#030819",
    background: "#FFFFFF", // app er bg color
    primary: {
      900: "#FF3FCB",
      800: "",
      700: "",
      600: "",
      500: "",
      400: "",
      300: "",
      200: "",
      100: "",
    },
    secondary: {
      900: "#402B8C",
      800: "",
      700: "",
      600: "",
      500: "",
      400: "",
      300: "",
      200: "",
      100: "",
    },
    green: {
      900: "#1DBF73",
      800: "",
      700: "",
      600: "",
      500: "",
      400: "",
      300: "",
      200: "",
      100: "",
    },
    red: {
      900: "#FE2121",
      800: "",
      700: "",
      600: "",
      500: "",
      400: "",
      300: "",
      200: "",
      100: "",
    },
    blue: {
      900: "#00C1FF",
      800: "",
      700: "",
      600: "",
      500: "",
      400: "",
      300: "",
      200: "",
      100: "",
    },
    grey: {
      900: "#8A8D9F",
      800: "#D7D7D7",
      700: "",
      600: "",
      500: "",
      400: "",
      300: "",
      200: "",
      100: "",
    },
    text: {
      900: "",
      800: "",
      700: "",
      600: "",
      500: "",
      400: "",
      300: "",
      200: "",
      100: "",
    },
  },
  linearGradient: {
    loginPrompt: {
      end: {x: 0, y: 0},
      start: {x: 0, y: 1},
      colors: ["#DF3BC0", "#472BBE"],
    },
  },
  spacing: 4,
  borderRadius: 8,
  typography: {
    fontSize: 16,
    fontFamily: {
      Bold: "Sathosi-Bold",
      SemiBold: "Sathosi-Semibold",
      Medium: "Sathosi-Medium",
      Regular: "Sathosi-Regular",
    },
  },
};

const ThemeContext = React.createContext(defaultTheme);

export const useTheme = () => React.useContext(ThemeContext);

export default function ThemeProvider({children}: React.PropsWithChildren) {
  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
}
