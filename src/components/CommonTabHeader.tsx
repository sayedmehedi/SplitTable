import React from "react";
import {splitAppTheme} from "@src/theme";
import Entypo from "react-native-vector-icons/Entypo";
import {RegisteredStyle, TextStyle} from "react-native";
import {BottomTabHeaderProps} from "@react-navigation/bottom-tabs";
import {
  Header,
  getHeaderTitle,
  HeaderBackground,
  HeaderBackButton,
} from "@react-navigation/elements";

const headerBackground = () => (
  <HeaderBackground
    style={{
      elevation: 20,
      backgroundColor: splitAppTheme.colors.white,
      shadowColor: splitAppTheme.colors.primary[400],
    }}
  />
);

const CommonStackHeader = (props: BottomTabHeaderProps) => {
  const {route, layout, options, navigation} = props;

  const title = getHeaderTitle(options, route.name);

  return (
    <Header
      title={title}
      layout={layout}
      headerShadowVisible
      headerLeft={(props: {
        tintColor?: string | undefined;
        pressColor?: string | undefined;
        pressOpacity?: number | undefined;
        labelVisible?: boolean | undefined;
      }) => (
        <HeaderBackButton
          {...props}
          onPress={navigation.goBack}
          canGoBack={navigation.canGoBack()}
          backImage={() => (
            <Entypo
              size={30}
              name={"chevron-thin-left"}
              color={splitAppTheme.colors.black}
            />
          )}
        />
      )}
      headerBackground={headerBackground}
      headerTitleStyle={{
        fontSize: 22,
        fontWeight: "bold",
        color: splitAppTheme.colors.black,
        fontFamily: "SatoshiVariable-Bold",
        ...(typeof options.headerTitleStyle === "object"
          ? (options.headerTitleStyle as any)
          : {}),
      }}
      headerTitleAlign={options.headerTitleAlign ?? "center"}
    />
  );
};

export default CommonStackHeader;
