import React from "react";
import {splitAppTheme} from "@src/theme";
import Entypo from "react-native-vector-icons/Entypo";
import AppHeaderBackground from "./AppHeaderBackground";
import {BottomTabHeaderProps} from "@react-navigation/bottom-tabs";
import {
  Header,
  getHeaderTitle,
  HeaderBackButton,
} from "@react-navigation/elements";
import {Platform} from "react-native";

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
          style={Platform.select({
            ios: {
              paddingLeft: 15,
            },
          })}
          {...props}
          onPress={navigation.goBack}
          canGoBack={navigation.canGoBack()}
          backImage={() => (
            <Entypo
              size={25}
              name={"chevron-thin-left"}
              color={splitAppTheme.colors.black}
            />
          )}
        />
      )}
      headerBackground={AppHeaderBackground}
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
